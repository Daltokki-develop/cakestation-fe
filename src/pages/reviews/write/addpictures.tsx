import 'swiper/css';
import 'swiper/css/pagination';

import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Meta } from '@/layouts/Meta';
import { Review } from '@/layouts/Review';
import { Main } from '@/templates/Main';

const StyledImage = styled.img`
  width: 292px;
  height: 292px;
  border-radius: 10px;
  object-fit: cover;
`;

const AddPictures = () => {
  const [imageList, setImageList] = useState<any>([]);

  const onChangeImages = useCallback((e: any) => {
    const currentImageList: string | string[] = [];
    Object.values(e.target.files).forEach((file) => {
      if (file instanceof Blob) {
        currentImageList.push(URL.createObjectURL(file));
      }
    });
    // @ts-ignore
    setImageList([...imageList, currentImageList]);
    // console.log('# fileList : ', fileList);
    // console.log('# currentImageList : ', currentImageList);
  }, []);

  const imageInput = useRef(null);

  return (
    <Main meta={<Meta title="Cakestation Review" description="리뷰 맛보기" />}>
      <Review
        progress={'25%'}
        title={'리뷰 사진'}
        subtitle={'케이크 디자인이 잘 보이는 사진을 선택해 주세요.'}
        nextText={'다음'}
        nextFunc={() => {}}
        nextLink={`/reviews/write/order/`}
      >
        <div className="w-85">
          <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
            {imageList[0]?.map((item: string, index: number) => {
              console.log('item', item);
              return (
                <SwiperSlide key={index}>
                  {/* {progress !== 100 && <ProgressBar width={`${progress}%`} />} */}
                  <StyledImage src={item} alt="업로드이미지" />
                </SwiperSlide>
              );
            })}
            <SwiperSlide>
              <input
                type="file"
                accept={'image/*'}
                name="image"
                multiple
                // hidden
                ref={imageInput}
                onChange={onChangeImages}
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </Review>
    </Main>
  );
};

export default AddPictures;
