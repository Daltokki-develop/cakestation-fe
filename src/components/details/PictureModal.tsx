import 'swiper/css';
import 'swiper/css/navigation';

import React from 'react';
import styled from 'styled-components';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

const BackModal = styled.div`
  position: fixed;
  top: 0;
  width: 28rem;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;

  display: flex;
  flex-direction: row;
`;

const ImageControlContainer = styled.div`
  width: 100%;
  height: 95%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.img`
  width: 350px;
  height: 700px;
  object-fit: contain;
`;

const CloseDiv = styled.div`
  position: fixed;
  top: 0;
  max-width: 28rem;
  width: 100%;
  height: 7rem;

  display: flex;
  justify-content: end;
  align-items: end;
`;

const CloseImage = styled.img`
  width: 20px;
  height: 20px;
  padding-right: 30px;
  cursor: pointer;
`;

function PictureModal(props: any) {
  const closeModal = () => {
    props.closeModal();
  };

  return (
    <>
      <BackModal>
        <ImageControlContainer>
          <Swiper
            className="mySwiper"
            spaceBetween={50}
            slidesPerView={1}
            initialSlide={props.tempIndex}
            navigation
            modules={[Navigation]}
          >
            {props.pictureList.map((result: any, index: number) => {
              const { imageUrl /* reviewId */ } = result;
              return (
                <SwiperSlide key={index}>
                  <StyledImage src={imageUrl} alt="bigReviewImage" />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </ImageControlContainer>
      </BackModal>
      <CloseDiv>
        <CloseImage
          src="/assets/images/icons/close_white.png"
          onClick={closeModal}
        />
      </CloseDiv>
    </>
  );
}

export default PictureModal;
