import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import { Passenger, Response } from '../types';

interface Props {
  isLastItem: boolean;
  onFetchMorePassengers: () => void;
}

const PassengerComponent: React.FC<Props> = ({
  isLastItem,
  onFetchMorePassengers,
  children,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {});
  const isIntersecting = !!entry?.isIntersecting;

  useEffect(() => {
    isLastItem && isIntersecting && onFetchMorePassengers();
  }, [isLastItem, isIntersecting]);

  return (
    <div
      ref={ref}
      style={{ minHeight: '10vh', display: 'flex', border: '1px dashed #000' }}
    >
      {children}
    </div>
  );
};

const ListIntersection = () => {
  const [passengers, setPassengers] = useState<Array<Passenger>>([]);
  const [isLast, setIsLast] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  const getPassengers = async () => {
    const params = { page, size: 30 };

    try {
      const response = await axios.get<Response>(
        'https://api.instantwebtools.net/v1/passenger',
        { params }
      );
      const passengers = response.data.data;
      const isLast = response.data.totalPages === page;

      setPassengers((prev) => [...prev, ...passengers]);
      setIsLast(isLast);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    !isLast && getPassengers();
  }, [page]);

  return (
    <div>
      {passengers.map((passenger, index) => (
        <PassengerComponent
          key={passenger._id}
          isLastItem={passengers.length - 1 === index}
          onFetchMorePassengers={() => setPage((prev) => prev + 1)}
        >
          {passenger.name}
        </PassengerComponent>
      ))}
    </div>
  );
};

export default ListIntersection;
