import { useRouter } from 'next/router';
import React, { useState } from 'react';

import RadioButton from '@/components/common/radiobutton';
import MapforReview from '@/components/MapforReview';
import { Meta } from '@/layouts/Meta';
import { Review } from '@/layouts/Review';
import { useReviewStore } from '@/store';
import { Main } from '@/templates/Main';

const Distance = () => {
  const router = useRouter();
  const reviews = useReviewStore((state: any) => state.reviews);
  const updateDistance = useReviewStore((state: any) => state.updateDistance);
  const [distance, setDistance] = useState<string>('5분');
  const { id } = router.query;

  const HandleDistance = (e: any) => {
    setDistance(e.target.value);
  };

  const ConsoleDistance = () => {
    console.log(`가게 ID : ${id}\n선택된 소요 시간 : ${distance}`);
    updateDistance({
      nearByStation: '와우~',
      walkingDistance: distance,
    });

    console.log(reviews);
  };

  return (
    <Main meta={<Meta title="Cakestation Review" description="리뷰 맛보기" />}>
      <Review
        progress={'20%'}
        title={'역과의 도보거리'}
        subtitle={'해당 가게와 역 간의 도보거리를 입력해주세요.'}
        nextText={'다음'}
        nextFunc={ConsoleDistance}
        nextLink={`/reviews/write/${id}/addpictures/`}
      >
        <div className="w-100">
          <MapforReview
            latitude={37.5666805}
            longitude={126.9784147}
            positions={{ 위도: '37.5666805', 경도: '126.9784147' }}
            index={1}
          />
        </div>
        <div className="mt-30">
          {['5분', '10분', '15분', '15분 이상'].map((time, index) => (
            <RadioButton
              key={index}
              value={time}
              clicked={distance === time}
              onChange={HandleDistance}
            />
          ))}
        </div>
      </Review>
    </Main>
  );
};

export default Distance;
