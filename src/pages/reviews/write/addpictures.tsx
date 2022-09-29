import 'swiper/css';
import 'swiper/css/pagination';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Typography from '@/components/common/typography';
import { Meta } from '@/layouts/Meta';
import { Review } from '@/layouts/Review';
import { Main } from '@/templates/Main';

const StyledImage = styled.img`
  width: 292px;
  height: 292px;
  border-radius: 10px;
  object-fit: cover;
`;

const StyledLabel = styled.label`
  width: 292px;
  height: 292px;
  background-image: url('/assets/images/upload.png');
  background-size: cover;
  cursor: pointer;
`;

const AddPictures = () => {
  const [imageList, setImageList] = useState<any>([]);
  const [fileList, setFileList] = useState<any>([]);
  const imageInput = useRef(null);

  const onChangeImages = useCallback((e: any) => {
    const currentImageList: string | string[] = [];
    Object.values(e.target.files).forEach((file) => {
      if (file instanceof Blob) {
        currentImageList.push(URL.createObjectURL(file));
      }
    });
    // @ts-ignore
    setImageList([...imageList, currentImageList]);
    setFileList(e.target.files);
    // console.log('# fileList : ', fileList);
    // console.log('# currentImageList : ', currentImageList);
  }, []);

  const HandleNext = () => {
    sessionStorage.setItem(
      'ReviewData',
      JSON.stringify({
        reviewImages: fileList,
      })
    );
  };

  useEffect(
    () => console.log('fileList', fileList, 'imageList', imageList),
    [fileList, imageList]
  );

  return (
    <Main meta={<Meta title="Cakestation Review" description="리뷰 맛보기" />}>
      <Review
        progress={'25%'}
        title={'리뷰 사진'}
        subtitle={'케이크 디자인이 잘 보이는 사진을 선택해 주세요.'}
        nextText={'다음'}
        nextFunc={HandleNext}
        nextLink={`/reviews/write/order/`}
      >
        <div className="w-85">
          <div className={'w-100 text-end mb-60'}>
            <Typography category={'Bd2'} color={'cakeLemon_800'}>
              ({fileList.length}/10)
            </Typography>
          </div>
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
              <StyledLabel htmlFor={'upload-image'} />
              <input
                id={'upload-image'}
                type="file"
                accept={'image/*'}
                name="image"
                multiple
                hidden
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
