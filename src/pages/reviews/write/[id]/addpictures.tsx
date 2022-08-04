import 'swiper/css';
import 'swiper/css/pagination';

import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import ProgressBar from '@/components/common/progressbar';
import Typography from '@/components/common/typography';
import { UploadButton } from '@/components/uploadbutton';
import { Meta } from '@/layouts/Meta';
import { Review } from '@/layouts/Review';
import { Main } from '@/templates/Main';

const StyledImage = styled.img`
  width: 292px;
  height: 292px;
  object-fit: cover;
`;

const AddPictures = () => {
  const router = useRouter();
  const { id } = router.query;

  const [thumb, setThumb] = useState<string[]>([]);
  const [progress, setProgress] = useState<number>(0);

  const onChange = useCallback(
    async (formData: FormData) => {
      const config = {
        headers: { 'content-type': 'multipart/form-data' },
        onUploadProgress: (event: { loaded: number; total: number }) => {
          setProgress(Math.round((event.loaded * 100) / event.total));
        },
      };
      axios.post<any>('/api/imageupload', formData, config).then((res) => {
        setThumb([...thumb, ...res.data]);
      });
    },
    [thumb]
  );

  return (
    <Main meta={<Meta title="Cakestation Review" description="리뷰 맛보기" />}>
      <Review
        progress={'40%'}
        title={'리뷰 사진'}
        subtitle={'케이크 디자인이 잘 보이는 사진을 선택해 주세요.'}
        nextText={'다음'}
        nextFunc={() => {
          console.log(`가게 ID : ${id}\n`);
        }}
        nextLink={`/reviews/write/${id}/order/`}
      >
        <div className="w-85">
          <div className="w-100 text-end mb-60">
            <Typography category={'Bd2'} color={'cakeLemon_800'}>
              (1/10)
            </Typography>
          </div>
          <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
            {thumb.map((item: string, index: number) => {
              console.log('item', item);
              return (
                <SwiperSlide key={index}>
                  {progress !== 100 && <ProgressBar width={`${progress}%`} />}
                  <StyledImage src={`/uploads/${item}`} alt="업로드이미지" />
                </SwiperSlide>
              );
            })}
            <SwiperSlide>
              <UploadButton
                allowMultipleFiles={true}
                uploadFileName="file"
                onChange={onChange}
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </Review>
    </Main>
  );
};

export default AddPictures;
