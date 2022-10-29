import React from 'react';
import styled from 'styled-components';

const BackModal = styled.div`
  position: fixed;
  top: 0;
  width: 28rem;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 51;

  display: flex;
  flex-direction: row;
`;

const Image = styled.img`
  width: 70%;
`;

function PictureModal(props: any) {
  const closeModal = () => {
    props.closeModal();
  };

  return (
    <BackModal onClick={closeModal}>
      <div>Prev</div>
      <Image src={`/assets/images/test-cakestore.png`} alt="picture" />
      <div>Next</div>
    </BackModal>
  );
}

export default PictureModal;
