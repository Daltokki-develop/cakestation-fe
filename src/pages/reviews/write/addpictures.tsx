/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import 'swiper/css';
import 'swiper/css/pagination';

import React, { useCallback, useState } from 'react';
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

const FullHeightContainer = styled.div`
  width: 85%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const NumberOfImages = styled.div`
  width: 100%;
  height: 5%;
  text-align: end;
  margin-top: 28px;
`;

const ImageControlContainer = styled.div`
  width: 100%;
  height: 95%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddPictures = () => {
  const [imagePreviewList, setImagePreviewList] = useState<any>([]);
  const [base64List, setBase64List] = useState<any>([]);

  const onChangeImages = useCallback(
    (e: any) => {
      const currentImageList: string[] = [];
      const currentBase64List: string[] = [];

      // 백엔으로 보낼 이미지 폼데이터
      const { files } = e.target;
      Object.values(files).forEach((file) => {
        const reader = new FileReader();

        if (file instanceof Blob) {
          currentImageList.push(URL.createObjectURL(file));

          reader.readAsDataURL(file);
          reader.onloadend = () => {
            const base64data = reader.result as string;
            currentBase64List.push(base64data);

            const concatList = base64List.concat(currentBase64List);
            if (concatList.length > 10) {
              setBase64List(concatList.slice(0, 10));
            } else {
              setBase64List(concatList);
            }
          };
        }
      });

      // console.log(currentImageList, 'currentImageList');
      setImagePreviewList(
        (imagePreviewList
          ? [...imagePreviewList, ...currentImageList]
          : currentImageList
        ).slice(0, 10)
      );
    },
    [base64List, imagePreviewList]
  );

  const HandleNext = () => {
    const reviewData = sessionStorage.getItem('ReviewData')
      ? JSON.parse(sessionStorage.getItem('ReviewData') || '')
      : {};
    sessionStorage.setItem('ReviewData', JSON.stringify(reviewData));
    reviewData.reviewImages = base64List;
    sessionStorage.setItem('ReviewData', JSON.stringify(reviewData));
  };

  // useEffect(
  //   () => setImagePreviewList(reviewImages ? [reviewImages] : null),
  //   [reviewImages]
  // );

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
        <FullHeightContainer>
          <NumberOfImages>
            <Typography category={'Bd2'} color={'cakeLemon_800'}>
              ({imagePreviewList?.length || 0}/10)
            </Typography>
          </NumberOfImages>
          <ImageControlContainer>
            <Swiper
              pagination={true}
              modules={[Pagination]}
              className="mySwiper"
            >
              {imagePreviewList?.map((item: string, index: number) => {
                return (
                  <SwiperSlide key={index}>
                    {/* {progress !== 100 && <ProgressBar width={`${progress}%`} />} */}
                    <StyledImage src={item} alt="업로드이미지" />
                  </SwiperSlide>
                );
              })}
              {imagePreviewList?.length !== 10 && (
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
          </ImageControlContainer>
        </FullHeightContainer>
      </Review>
    </Main>
  );
};

export default AddPictures;
