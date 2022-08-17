import React from 'react';
import styled from 'styled-components';

const Heart = styled.img`
  width: 100%;
  height: 100%;
`;

function HeartButton({ like, onClick }: { like: boolean; onClick: any }) {
  return (
    <Heart
      src={
        like
          ? '/assets/images/icons/heart_color-filled.svg'
          : '/assets/images/icons/heart_empty.svg'
      }
      onClick={onClick}
    />
  );
}

export default HeartButton;
