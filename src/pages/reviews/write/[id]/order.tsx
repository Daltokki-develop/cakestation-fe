import { useRouter } from 'next/router';
import React from 'react';

import Input from '@/components/common/input/input';
import InputToggle from '@/components/common/input/inputToggle';
import Typography from '@/components/common/typography';
import { Meta } from '@/layouts/Meta';
import { Review } from '@/layouts/Review';
import { Main } from '@/templates/Main';

const Order = () => {
  const router = useRouter();
  const { id } = router.query;

  const GoNext = () => {
    console.log(`가게 ID : ${id}\n`);
  };

  return (
    <Main meta={<Meta title="Cakestation Review" description="리뷰 맛보기" />}>
      <Review
        progress={'60%'}
        title={'주문 내용'}
        subtitle={'주문하셨던 케이크의 정보를 입력해주세요.'}
        nextText={'다음'}
        nextFunc={GoNext}
        nextLink={`/reviews/write/${id}/satisfaction/`}
      >
        <div className="w-85">
          <div className="mb-26">
            <div className="mb-8">
              <Typography category={'Bd2'}>케이크의 호수</Typography>
            </div>
            <InputToggle
              options={[
                '1호',
                '2호',
                '3호',
                '4호',
                '5호',
                '6호',
                '7호',
                '8호',
                '9호',
              ]}
            />
          </div>
          <div className="mb-20">
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
