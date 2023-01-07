import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import React from 'react';
import styled from 'styled-components';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

const BackModal = styled.div`
  position: fixed;
  top: 0;
  width: 28rem;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  /* z-index: 51; */

  display: flex;
  flex-direction: row;
`;

const StyledImage = styled.img`
  width: 70%;
`;

const CloseDiv = styled.div`
  position: fixed;
`;

function PictureModal(props: any) {
  const closeModal = () => {
    props.closeModal();
  };

  return (
    <>
      <BackModal onClick={closeModal}>
        {/* <div>Prev</div>
      <Image src={`/assets/images/test-cakestore.png`} alt="picture" />
      <div>Next</div> */}
        <Swiper
          className="mySwiper"
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          modules={[Navigation]}
        >
          <SwiperSlide>
            <StyledImage
              src={`/assets/images/test-cakestore.png`}
              alt="picture"
            />
          </SwiperSlide>
          <SwiperSlide>
            <StyledImage
              src={`/assets/images/test-cakestore.png`}
              alt="picture"
            />
          </SwiperSlide>
          <SwiperSlide>
            <StyledImage
              src={`/assets/images/test-cakestore.png`}
              alt="picture"
            />
          </SwiperSlide>
          <SwiperSlide>
            <StyledImage
              src={`/assets/images/test-cakestore.png`}
              alt="picture"
            />
          </SwiperSlide>
        </Swiper>
      </BackModal>
      <CloseDiv>
        <img src="/assets/images/icons/close_white.png" />
      </CloseDiv>
    </>
  );
}

export default PictureModal;
