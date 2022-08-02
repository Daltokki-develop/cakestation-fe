import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';

import Typography from '@/components/common/typography';
import MapforReview from '@/components/MapforReview';
import { Meta } from '@/layouts/Meta';
import { Review } from '@/layouts/Review';
import palette from '@/styles/palette';
import { Main } from '@/templates/Main';

interface IDistanceButtonProps {
  clicked?: boolean;
}

const DistanceButton = styled.div<IDistanceButtonProps>`
  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 224px;
  height: 35px;

  /* Black */

  background: ${(props) =>
    props.clicked ? `${palette.black}` : `${palette.grey_200}`};
  color: ${(props) =>
    props.clicked ? `${palette.white}` : `${palette.black}`};
  border-radius: 16px;

  cursor: pointer;

  & + & {
    margin-top: 10px;
  }
`;

const Distance = () => {
  const router = useRouter();
  const [distance, setDistance] = useState<String>('5분');
  const { id } = router.query;

  const HandleDistance = (e: any) => {
    setDistance(e.target.innerText);
  };

  const GoNext = () => {
    console.log(`가게 ID : ${id}\n선택된 소요 시간 : ${distance}`);
  };

  return (
    <Main meta={<Meta title="Cakestation Review" description="리뷰 맛보기" />}>
      <Review
        progress={'20%'}
        title={'역과의 도보거리'}
        subtitle={'해당 가게와 역 간의 도보거리를 입력해주세요.'}
        nextText={'다음'}
        nextFunc={GoNext}
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
          <DistanceButton clicked onClick={HandleDistance}>
            <Typography category={'Bd3'}>5분</Typography>
          </DistanceButton>
          <DistanceButton onClick={HandleDistance}>
            <Typography category={'Bd3'}>10분</Typography>
          </DistanceButton>
          <DistanceButton onClick={HandleDistance}>
            <Typography category={'Bd3'}>15분</Typography>
          </DistanceButton>
          <DistanceButton onClick={HandleDistance}>
            <Typography category={'Bd3'}>15분 이상</Typography>
          </DistanceButton>
        </div>
      </Review>
    </Main>
  );
};

export default Distance;
