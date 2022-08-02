import 'rc-rate/assets/index.css';

import Link from 'next/link';
import { useRouter } from 'next/router';
import Rate from 'rc-rate';
import React from 'react';
import styled from 'styled-components';

import Button from '@/components/common/button';
import Input from '@/components/common/input/input';
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

const StyledRate = styled(Rate)`
  font-size: 40px;

  .rc-rate-star-half .rc-rate-star-first,
  .rc-rate-star-full .rc-rate-star-second {
    color: #363636 !important;
  }
`;

interface IReviewTagProps {
  clicked?: boolean;
}

const ReviewTag = styled.div<IReviewTagProps>`
  background: ${(props) =>
    props.clicked ? `${palette.cakeLemon_400}` : `${palette.grey_100}`};
  border: 1px solid ${palette.black};
  padding: 10px 12px;
  border-radius: 16px;

  display: flex;
  justify-content: center;
  align-items: center;

  width: fit-content;

  & + & {
    margin-left: 6px;
  }
`;

const Satisfaction = () => {
  const router = useRouter();
  const { id } = router.query;

  const GoNext = () => {
    console.log(`가게 ID : ${id}\n`);
  };

  return (
    <Main meta={<Meta title="Cakestation Review" description="리뷰 맛보기" />}>
      <Header style={'text'}>리뷰 쓰기</Header>
      <ProgressBar width={'100%'} />
      <Styles>
        <Section>
          <div className="w-85 column">
            <div className="mb-10">
              <Typography category={'H1'}>마지막 총평</Typography>
            </div>
            <div className="mb-33">
              <Typography category={'Bd2'}>
                이 가게는 전반적으로 어땠나요?
              </Typography>
            </div>
            <div className="w-100 mb-73 row contents-center">
              <StyledRate allowHalf />
            </div>
            <div className="w-100 mb-24 text-center">
              <Typography category={'Bd2'}>
                좋았던 점을 체크해주세요 (중복가능)
              </Typography>
            </div>
            <div className="mb-83">
              <div className="row contents-center mb-6">
                <ReviewTag clicked>
                  <Typography category={'Bd7'}>직원이 친절해요</Typography>
                </ReviewTag>
                <ReviewTag>
                  <Typography category={'Bd7'}>역과 가까워요</Typography>
                </ReviewTag>
                <ReviewTag>
                  <Typography category={'Bd7'}>가격이 저렴해요</Typography>
                </ReviewTag>
              </div>
              <div className="row contents-center">
                <ReviewTag>
                  <Typography category={'Bd7'}>예약이 편해요</Typography>
                </ReviewTag>
                <ReviewTag>
                  <Typography category={'Bd7'}>케이크가 맛있어요</Typography>
                </ReviewTag>
              </div>
            </div>
            <div className="w-100 mb-24 text-center">
              <Typography category={'Bd2'}>
                하고싶은 말을 적어주세요!
              </Typography>
            </div>
            <Input placeholder={''} onChange={() => {}} />
          </div>

          <div className="fixed b-0 w-100 max-w">
            <Link href={`/`}>
              <a>
                <Button
                  size={'large'}
                  category={'primary'}
                  disabled={false}
                  onClick={GoNext}
                >
                  등록하기
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
