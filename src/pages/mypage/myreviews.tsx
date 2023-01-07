import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Button from '@/components/common/button';
import ItemCard from '@/components/common/itemcard';
import Section from '@/components/common/section';
import Typography from '@/components/common/typography';
import { Header } from '@/layouts/Header';
import { Meta } from '@/layouts/Meta';
import Navigation from '@/layouts/Navigation';
import { Main } from '@/templates/Main';

const MT16 = styled.div`
  & + & {
    margin-top: 1rem;
  }
`;

const StyledEmptyContainer = styled.div`
  text-align: center;
`;

const StyledEmptyImg = styled.img`
  width: 20rem;
  height: 17.0625rem;
  margin-bottom: 2rem;
`;

const StyledFindBtnContainer = styled.div`
  width: 21.4375rem;
  height: 3.25rem;
  margin: 0 auto;
`;

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 96px - 75px);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MyReviews = () => {
  const [myReviewsList, setMyReviewsList] = useState<Array<any>>();

  const FetchMyReviewsList = () => {
    setMyReviewsList([]);
  };

  useEffect(() => {
    FetchMyReviewsList();
  }, []);

  return (
    <Main
      meta={
        <Meta title="Cakestation Details" description="아이템 상세페이지" />
      }
    >
      <Section padding={'8rem'}>
        <Header style={'text'}>내가 등록한 리뷰</Header>
        <Container>
          {myReviewsList && myReviewsList[0] ? (
            myReviewsList.map((myReview, index) => (
              <MT16 key={index}>
                <ItemCard
                  title={myReview.title}
                  rate={myReview.rate}
                  count={myReview.count}
                  distance={myReview.distance}
                  pictures={myReview.pictures}
                  heart
                />
              </MT16>
            ))
          ) : (
            <StyledEmptyContainer>
              <Typography category={'Bd3'} color={'grey_300'}>
                작성한 리뷰가 없어요!
              </Typography>
              <StyledEmptyImg src={'/assets/images/empty-like-list.svg'} />
              <StyledFindBtnContainer>
                <Link href="/reviews/search">
                  <Button size={'medium'} category={'primary'} disabled={false}>
                    리뷰 작성하러 가기
                  </Button>
                </Link>
              </StyledFindBtnContainer>
            </StyledEmptyContainer>
          )}
        </Container>

        <Navigation type={'default'} my />
      </Section>
    </Main>
  );
};

export default MyReviews;
