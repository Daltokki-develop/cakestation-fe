import 'rc-rate/assets/index.css';

import { useRouter } from 'next/router';
import Rate from 'rc-rate';
import React from 'react';
import styled from 'styled-components';

import TextArea from '@/components/common/input/textArea';
import Typography from '@/components/common/typography';
import { Meta } from '@/layouts/Meta';
import { Review } from '@/layouts/Review';
import tags from '@/lib/총평태그.json';
import palette from '@/styles/palette';
import { Main } from '@/templates/Main';

const StyledRate = styled(Rate)`
  width: 100%;
  margin-bottom: 73px;
  display: flex;
  justify-content: center;
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
  margin: 3px;
  white-space: nowrap;
  border-radius: 16px;

  display: flex;
  justify-content: center;
  align-items: center;

  width: fit-content;

  & + & {
    margin-left: 6px;
  }
`;

const General = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Main meta={<Meta title="Cakestation Review" description="리뷰 맛보기" />}>
      <Review
        progress={'100%'}
        title={'마지막 총평'}
        subtitle={'이 가게는 전반적으로 어땠나요?'}
        nextText={'등록하기'}
        nextFunc={() => {
          console.log(`가게 ID : ${id}\n`);
        }}
        nextLink={`/`}
      >
        <div className="w-85">
          <StyledRate allowHalf />
          <div className="w-100 mb-21 text-center">
            <Typography category={'Bd2'}>
              좋았던 점을 체크해주세요 (중복가능)
            </Typography>
          </div>
          <div className="row contents-center mb-80 flex-wrap">
            {tags.map((tag, index) => (
              <ReviewTag key={index}>
                <Typography category={'Bd7'}>{tag}</Typography>
              </ReviewTag>
            ))}
          </div>
          <div className="w-100 mb-24 text-center">
            <Typography category={'Bd2'}>하고싶은 말을 적어주세요!</Typography>
          </div>
          <TextArea placeholder={''} onChange={() => {}} />
        </div>
      </Review>
    </Main>
  );
};

export default General;
