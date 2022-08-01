import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import Button from '@/components/common/button';
import Section from '@/components/common/section';
import Typography from '@/components/common/typography';
import { Header } from '@/layouts/Header';
import { Meta } from '@/layouts/Meta';
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

const AddPictures = () => {
  const router = useRouter();
  const { id } = router.query;

  const GoNext = () => {
    console.log(`가게 ID : ${id}\n`);
  };

  return (
    <Main meta={<Meta title="Cakestation Review" description="리뷰 맛보기" />}>
      <Header style={'text'}>리뷰 쓰기</Header>
      <Styles>
        <Section>
          <div className="w-85 column">
            <div className="mb-10">
              <Typography category={'H1'}>리뷰 사진</Typography>
            </div>
            <div className="mb-18">
              <Typography category={'Bd2'}>
                케이크 디자인이 잘 보이는 사진을 선택해 주세요.
              </Typography>
            </div>
          </div>
          <div className="fixed b-0 w-100 max-w">
            <Link href={`/reviews/write/${id}/pictures/`}>
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

export default AddPictures;
