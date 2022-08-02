import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import Button from '@/components/common/button';
import Input from '@/components/common/input/input';
import InputToggle from '@/components/common/input/inputToggle';
import ProgressBar from '@/components/common/progressbar';
import Section from '@/components/common/section';
import Typography from '@/components/common/typography';
import { Header } from '@/layouts/Header';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Styles = styled.div`
  .max-w {
    max-width: 28rem;
  }
`;

const Order = () => {
  const router = useRouter();
  const { id } = router.query;

  const GoNext = () => {
    console.log(`가게 ID : ${id}\n`);
  };

  return (
    <Main meta={<Meta title="Cakestation Review" description="리뷰 맛보기" />}>
      <Header style={'text'}>리뷰 쓰기</Header>
      <ProgressBar width={'60%'} />
      <Styles>
        <Section>
          <div className="w-85 column">
            <div className="mb-10">
              <Typography category={'H1'}>주문 내용</Typography>
            </div>
            <div className="mb-75">
              <Typography category={'Bd2'}>
                주문하셨던 케이크의 정보를 입력해주세요.
              </Typography>
            </div>
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

          <div className="fixed b-0 w-100 max-w">
            <Link href={`/reviews/write/${id}/satisfaction/`}>
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

export default Order;
