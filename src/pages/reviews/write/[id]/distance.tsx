import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';

import Button from '@/components/common/button';
import Section from '@/components/common/section';
import Typography from '@/components/common/typography';
import MapforReview from '@/components/MapforReview';
import { Header } from '@/layouts/Header';
import { Meta } from '@/layouts/Meta';
import palette from '@/styles/palette';
import { Main } from '@/templates/Main';

const Styles = styled.div`
  .w-100 {
    width: 100%;
  }

  .w-85 {
    width: 85%;
  }

  .column {
    display: flex;
    flex-direction: column;
  }

  .mb-10 {
    margin-bottom: 0.625rem;
  }

  .mb-18 {
    margin-bottom: 1.125rem;
  }

  .fixed {
    position: fixed;
  }

  .b-108 {
    bottom: 6.75rem;
  }

  .b-0 {
    bottom: 0;
  }

  .max-w {
    max-width: 28rem;
  }

  .mt-20 {
    margin-top: 1.25rem;
  }

  .mt-30 {
    margin-top: 30px;
  }
`;

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
      <Header style={'text'}>리뷰 쓰기</Header>
      <Styles>
        <Section>
          <div className="w-85 column">
            <div className="mb-10">
              <Typography category={'H1'}>역과의 도보거리</Typography>
            </div>
            <div className="mb-18">
              <Typography category={'Bd2'}>
                해당 가게와 역 간의 도보거리를 입력해주세요.
              </Typography>
            </div>
          </div>
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
          <div className="fixed b-0 w-100 max-w">
            <Link href={`/reviews/write/${id}/addpictures/`}>
              <a>
                <Button
                  size={'large'}
                  category={'primary'}
                  disabled={false}
                  onClick={GoNext}
                >
                  다음
                </Button>
              </a>
            </Link>
          </div>
        </Section>
      </Styles>
    </Main>
  );
};

export default Distance;
