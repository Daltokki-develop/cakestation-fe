import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import RadioButton from '@/components/common/radiobutton';
import { Meta } from '@/layouts/Meta';
import { Review } from '@/layouts/Review';
import { getSessionReview } from '@/lib/commonFunction';
import satisfactionArr from '@/lib/만족도.json';
import { Main } from '@/templates/Main';

const DesignImplementationImage = styled.img`
  width: 240px;
  height: 240px;
`;

const DesignImplementation = () => {
  return (
    <div className="mb-33">
      <DesignImplementationImage
        src="/assets/images/design-implementation.svg"
        alt="Design Implementation"
      />
    </div>
  );
};

const satisfactionArray = (satisfaction: string, HandleSatisfaction: any) => {
  return (
    <div>
      {Object.keys(satisfactionArr).map((satisfactionElement, index) => (
        <RadioButton
          key={index}
          value={satisfactionElement}
          clicked={satisfactionElement === satisfaction}
          onChange={HandleSatisfaction}
        />
      ))}
    </div>
  );
};

const Satisfaction = () => {
  const [satisfaction, setSatisfaction] = useState<string>(
    Object.keys(satisfactionArr)[0] || ''
  );
  const { designSatisfaction } = getSessionReview();

  const HandleSatisfaction = (e: any) => {
    setSatisfaction(e.target.value);
  };

  const HandleNext = () => {
    const reviewData = JSON.parse(sessionStorage.getItem('ReviewData') || '');
    reviewData.designSatisfaction = satisfactionArr[satisfaction];
    sessionStorage.setItem('ReviewData', JSON.stringify(reviewData));
  };

  useEffect(() => {
    const satisfactionHistory =
      Object.keys(satisfactionArr).find(
        (key) => satisfactionArr[key] === designSatisfaction
      ) ||
      Object.keys(satisfactionArr)[0] ||
      '';
    setSatisfaction(satisfactionHistory);
  }, [designSatisfaction]);

  return (
    <Main meta={<Meta title="Cakestation Review" description="리뷰 맛보기" />}>
      <Review
        progress={'75%'}
        title={'디자인 구현도'}
        subtitle={'디자인 구현 만족도를 선택해주세요.'}
        nextText={'다음'}
        nextFunc={HandleNext}
        nextLink={`/reviews/write/general/`}
      >
        {DesignImplementation()}
        {satisfactionArray(satisfaction, HandleSatisfaction)}
      </Review>
    </Main>
  );
};

export default Satisfaction;
