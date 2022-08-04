import { useRouter } from 'next/router';
import React from 'react';

import Input from '@/components/common/input/input';
import InputToggle from '@/components/common/input/inputToggle';
import Typography from '@/components/common/typography';
import { Meta } from '@/layouts/Meta';
import { Review } from '@/layouts/Review';
import cakeNum from '@/lib/케이크호수.json';
import { Main } from '@/templates/Main';

const Order = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Main meta={<Meta title="Cakestation Review" description="리뷰 맛보기" />}>
      <Review
        progress={'60%'}
        title={'주문 내용'}
        subtitle={'주문하셨던 케이크의 정보를 입력해주세요.'}
        nextText={'다음'}
        nextFunc={() => {
          console.log(`가게 ID : ${id}\n`);
        }}
        nextLink={`/reviews/write/${id}/satisfaction/`}
      >
        <div className="w-85">
          <div className="mt-75 mb-26 required">
            <div className="mb-8">
              <Typography category={'Bd2'}>케이크의 호수</Typography>
            </div>
            <InputToggle options={cakeNum} />
          </div>
          <div className="mb-20 required">
            <div className="mb-8">
              <Typography category={'Bd2'}>케이크 시트의 종류</Typography>
            </div>
            <Input placeholder={''} onChange={() => {}} />
          </div>
          <div className="mb-20">
            <div className="mb-8">
              <Typography category={'Bd2'}>추가 옵션</Typography>
            </div>
            <Input placeholder={''} onChange={() => {}} />
          </div>
        </div>
      </Review>
    </Main>
  );
};

export default Order;
