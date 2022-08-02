import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';

import Typography from '@/components/common/typography';
import { Meta } from '@/layouts/Meta';
import { Review } from '@/layouts/Review';
import palette from '@/styles/palette';
import { Main } from '@/templates/Main';

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
  const satisfactionArr = [
    '매우 만족해요!',
    '만족해요',
    '보통이에요',
    '별로였어요',
    '최악이에요',
  ];

  const [satisfaction, setSatisfaction] = useState<String>('매우 만족해요!');

  const HandleSatisfaction = (e: any) => {
    setSatisfaction(e.target.innerText);
  };

  const GoNext = () => {
    console.log(`가게 ID : ${id}\n선택된 만족도 : ${satisfaction}`);
  };

  return (
    <Main meta={<Meta title="Cakestation Review" description="리뷰 맛보기" />}>
      <Review
        progress={'80%'}
        title={'디자인 구현도'}
        subtitle={'디자인 구현 만족도를 선택해주세요.'}
        nextText={'다음'}
        nextFunc={GoNext}
        nextLink={`/reviews/write/${id}/general/`}
      >
        <div className="mb-27">
          <TestImage />
        </div>
        <div>
          {satisfactionArr.map((satisfactionElement, index) => (
            <SatisfactionButton
              key={index}
              clicked
              onClick={HandleSatisfaction}
            >
              <Typography category={'Bd3'}>{satisfactionElement}</Typography>
            </SatisfactionButton>
          ))}
        </div>
      </Review>
    </Main>
  );
};

export default Satisfaction;
