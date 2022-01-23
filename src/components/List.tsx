import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled/macro';
import { Passenger, Response } from '../types';
import { throttle } from 'throttle-debounce';

const Item = styled.li`
  font-size: 24px;
`;

const ItemList = styled.ul`
  overflow: hidden scroll;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
`;

const List = () => {
  const listRef = useRef<HTMLUListElement>(null);
  const currentPageRef = useRef<number>(0);
  const [passengers, setPassengers] = useState<Array<Passenger>>([]);
  const [isLast, setIsLast] = useState<boolean>(false);
  const [isScrollBottom, setIsScrollBottom] = useState<boolean>(false);

  const getPassengers = async (init?: boolean) => {
    const params = { page: currentPageRef.current, size: 50 };

    try {
      const response = await axios.get<Response>(
        'https://api.instantwebtools.net/v1/passenger',
        { params }
      );
      const passengers = response.data.data;
      const isLast = response.data.totalPages === currentPageRef.current;

      init
        ? setPassengers(passengers)
        : setPassengers((prev) => [...prev, ...passengers]);
      setIsLast(isLast);
    } catch (e) {
      console.error(e);
    }
  };

  const handleScroll = throttle(1000, () => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, offsetHeight } = listRef.current;
      const offset = 50;

      setIsScrollBottom(scrollHeight - offsetHeight - scrollTop < offset);
    }
  });

  useEffect(() => {
    if (isScrollBottom) {
      currentPageRef.current += 1;

      !isLast && getPassengers();
    }
  }, [isScrollBottom, isLast]);

  useEffect(() => {
    getPassengers(true);
  }, []);

  return (
    <ItemList ref={listRef} className='list' onScroll={handleScroll}>
      {passengers.map((passenger) => (
        <Item className='item' key={passenger._id}>
          {passenger.name}
        </Item>
      ))}
    </ItemList>
  );
};

export default List;
