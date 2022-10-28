import 'swiper/css';
import 'swiper/css/pagination';

import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Typography from '@/components/common/typography';
import { Meta } from '@/layouts/Meta';
import { Review } from '@/layouts/Review';
import { getSessionReview } from '@/lib/commonFunction';
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
  const currentImageList: string[] = [];
  const { reviewImages } = getSessionReview();

  const onChangeImages = useCallback((e: any) => {
    // 백엔으로 보낼 이미지 폼데이터
    const { files } = e.target;
    Object.values(files).forEach((file) => {
      if (file instanceof Blob) {
        currentImageList.push(URL.createObjectURL(file));
      }
    });

    setImageList(
      (imageList
        ? [...imageList, ...currentImageList]
        : currentImageList
      ).slice(0, 10)
    );
  }, []);

  const HandleNext = () => {
    const reviewData = sessionStorage.getItem('ReviewData')
      ? JSON.parse(sessionStorage.getItem('ReviewData') || '')
      : {};
    reviewData.reviewImages = imageList;
    sessionStorage.setItem('ReviewData', JSON.stringify(reviewData));
  };

  useEffect(() => setImageList(reviewImages ? [reviewImages] : null), []);

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
              ({imageList?.length || 0}/10)
            </Typography>
          </div>
          <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
            {imageList?.map((item: string, index: number) => {
              return (
                <SwiperSlide key={index}>
                  {/* {progress !== 100 && <ProgressBar width={`${progress}%`} />} */}
                  <StyledImage src={item} alt="업로드이미지" />
                </SwiperSlide>
              );
            })}
            {imageList?.length !== 10 && (
              <SwiperSlide>
                <StyledLabel htmlFor={'upload-image'} />
                <input
                  id={'upload-image'}
                  type="file"
                  accept={'image/*'}
                  name="image"
                  multiple
                  hidden
                  onChange={onChangeImages}
                />
              </SwiperSlide>
            )}
          </Swiper>
        </div>
      </Review>
    </Main>
  );
};

export default AddPictures;
