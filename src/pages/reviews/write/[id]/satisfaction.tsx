import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';

import RadioButton from '@/components/common/radiobutton';
import { Meta } from '@/layouts/Meta';
import { Review } from '@/layouts/Review';
import satisfactionArr from '@/lib/만족도.json';
import palette from '@/styles/palette';
import { Main } from '@/templates/Main';

const TestImage = styled.div`
  width: 320px;
  height: 14rem;

  /* Blue_200 */

  background-color: ${palette.blue_200};
`;

const Satisfaction = () => {
  const router = useRouter();
  const { id } = router.query;

  const [satisfaction, setSatisfaction] = useState<string>(
    satisfactionArr[0] || ''
  );

  const HandleSatisfaction = (e: any) => {
    setSatisfaction(e.target.value);
  };

  return (
    <Main meta={<Meta title="Cakestation Review" description="리뷰 맛보기" />}>
      <Review
        progress={'80%'}
        title={'디자인 구현도'}
        subtitle={'디자인 구현 만족도를 선택해주세요.'}
        nextText={'다음'}
        nextFunc={() => {
          console.log(`가게 ID : ${id}\n선택된 만족도 : ${satisfaction}`);
        }}
        nextLink={`/reviews/write/${id}/general/`}
      >
        <div className="mb-27">
          <TestImage />
        </div>
        <div>
          {satisfactionArr.map((satisfactionElement, index) => (
            <RadioButton
              key={index}
              value={satisfactionElement}
              clicked={satisfactionElement === satisfaction}
              onChange={HandleSatisfaction}
            />
          ))}
        </div>
      </Review>
    </Main>
  );
};

export default Satisfaction;
