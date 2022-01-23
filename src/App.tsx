import React, { useState } from 'react';
// import styled from '@emotion/styled/macro';
// import Modal from './components/Modal';
import List from './components/List';
import ListIntersection from './components/ListIntersection';
// import PaginationPage from './components/Pagination';
// import Carousel from './components/Carousel';
// import SkeletonPage from './components/Skeleton';

// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   height: 100vh;
// `;

// const Button = styled.button`
//   width: 280px;
//   height: 60px;
//   border-radius: 12px;
//   color: #fff;
//   background-color: #3d6afe;
//   margin: 0;
//   border: none;
//   font-size: 24px;
//   &:active {
//     opacity: 0.8;
//   }
// `;

// const ModalBody = styled.div`
//   border-radius: 8px;
//   box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
//   background-color: #fff;
//   max-height: calc(100vh - 16px);
//   overflow: hidden auto;
//   position: relative;
//   padding-block: 12px;
//   padding-inline: 24px;
// `;

function App() {
  // const [isOpen, setIsOpen] = useState<boolean>(false);
  // const handleModalOpen = () => setIsOpen(true);
  // const handleModalClose = () => setIsOpen(false);

  return (
    // <Container>
    //   <Button onClick={handleModalOpen}>OPEN</Button>
    //   <Modal isOpen={isOpen} onClose={handleModalClose}>
    //     <ModalBody>
    //       <h2>Title</h2>
    //       <p>Description</p>
    //     </ModalBody>
    //   </Modal>
    // </Container>
    <>
      {/* <List /> */}
      <ListIntersection />
    </>
  );
}

export default App;
