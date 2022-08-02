import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';

import Button from '@/components/common/button';
import ProgressBar from '@/components/common/progressbar';
import Section from '@/components/common/section';
import Typography from '@/components/common/typography';
import { Header } from '@/layouts/Header';
import { Meta } from '@/layouts/Meta';
import palette from '@/styles/palette';
import { Main } from '@/templates/Main';

const Styles = styled.div`
  .max-w {
    max-width: 28rem;
  }
`;

const TestImage = styled.div`
  width: 320px;
  height: 14rem;

  /* Blue_200 */

  background-color: ${palette.blue_200};
`;

interface ISatisfactionButtonProps {
  clicked?: boolean;
}

const SatisfactionButton = styled.div<ISatisfactionButtonProps>`
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

const Satisfaction = () => {
  const router = useRouter();
  const { id } = router.query;

  const [satisfaction, setSatisfaction] = useState<String>('매우 만족해요!');

  const HandleSatisfaction = (e: any) => {
    setSatisfaction(e.target.innerText);
  };

  const GoNext = () => {
    console.log(`가게 ID : ${id}\n선택된 만족도 : ${satisfaction}`);
  };

  return (
    <Main meta={<Meta title="Cakestation Review" description="리뷰 맛보기" />}>
      <Header style={'text'}>리뷰 쓰기</Header>
      <ProgressBar width={'80%'} />
      <Styles>
        <Section>
          <div className="w-85 column">
            <div className="mb-10">
              <Typography category={'H1'}>디자인 구현도</Typography>
            </div>
            <div className="mb-16">
              <Typography category={'Bd2'}>
                디자인 구현 만족도를 선택해주세요.
              </Typography>
            </div>
          </div>
          <div className="mb-27">
            <TestImage />
          </div>
          <div>
            <SatisfactionButton clicked onClick={HandleSatisfaction}>
              <Typography category={'Bd3'}>매우 만족해요!</Typography>
            </SatisfactionButton>
            <SatisfactionButton onClick={HandleSatisfaction}>
              <Typography category={'Bd3'}>만족해요</Typography>
            </SatisfactionButton>
            <SatisfactionButton onClick={HandleSatisfaction}>
              <Typography category={'Bd3'}>보통이에요</Typography>
            </SatisfactionButton>
            <SatisfactionButton onClick={HandleSatisfaction}>
              <Typography category={'Bd3'}>별로였어요</Typography>
            </SatisfactionButton>
            <SatisfactionButton onClick={HandleSatisfaction}>
              <Typography category={'Bd3'}>최악이에요</Typography>
            </SatisfactionButton>
          </div>

          <div className="fixed b-0 w-100 max-w">
            <Link href={`/reviews/write/${id}/general/`}>
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

export default Satisfaction;
