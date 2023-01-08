import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';

import Button from '@/components/common/button';
import ReviewCard from '@/components/common/reviewCard';
import Section from '@/components/common/section';
import Typography from '@/components/common/typography';
import { Header } from '@/layouts/Header';
import { Meta } from '@/layouts/Meta';
import Navigation from '@/layouts/Navigation';
import { AXIOS_GET } from '@/lib/commonFunction';
import { BASE_URL } from '@/lib/ConstantURL';
import palette from '@/styles/palette';
import { Main } from '@/templates/Main';

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
  height: fit-content;
  min-height: calc(100vh - 96px - 75px);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .loading-icon {
    margin-bottom: 4px;
  }
`;

const CountText = styled.div`
  width: calc(100% - 20px - 20px);
  margin: 12px 20px;
`;

const MyReviews = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [myReviewsList, setMyReviewsList] = useState<Array<any>>();
  const router = useRouter();

  const FetchMyReviewsList = async () => {
    try {
      setLoading(true);
      const response = await AXIOS_GET(
        `${BASE_URL}/api/users/2/reviews`,
        router
      );
      setLoading(false);
      setMyReviewsList(response?.data.result);
    } catch (error) {
      setMyReviewsList([]);
    }
  };

  useEffect(() => {
    FetchMyReviewsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          {loading ? (
            <div>
              <div className="loading-icon">
                <ClipLoader
                  color={palette.white}
                  loading={!loading}
                  size={30}
                />
              </div>
              <Typography category="Bd5" color="white">
                내가 등록한 리뷰 불러오는 중...
              </Typography>
            </div>
          ) : (
            <>
              {myReviewsList && myReviewsList.length > 0 ? (
                <>
                  <CountText>
                    <Typography category={'Bd1'} color={'black'}>
                      전체{' '}
                    </Typography>
                    <Typography category={'Bd1'} color={'cakeLavender_600'}>
                      {myReviewsList.length}
                    </Typography>
                  </CountText>

                  {myReviewsList.map((result: any, index: React.Key) => {
                    const {
                      username,
                      cakeNumber,
                      score,
                      sheetType,
                      requestOption,
                      reviewImages,
                      tags,
                      content,
                      createdDateTime,
                    } = result;

                    return (
                      <ReviewCard
                        key={index}
                        username={username}
                        cakeNumber={cakeNumber}
                        score={score}
                        sheetType={sheetType}
                        requestOption={requestOption}
                        reviewImages={reviewImages}
                        tags={tags}
                        content={content}
                        createdDateTime={createdDateTime}
                      />
                    );
                  })}
                </>
              ) : (
                <StyledEmptyContainer>
                  <Typography category={'Bd3'} color={'grey_300'}>
                    작성한 리뷰가 없어요!
                  </Typography>
                  <StyledEmptyImg src={'/assets/images/empty-like-list.svg'} />
                  <StyledFindBtnContainer>
                    <Link href="/reviews/search">
                      <Button
                        size={'medium'}
                        category={'primary'}
                        disabled={false}
                      >
                        리뷰 작성하러 가기
                      </Button>
                    </Link>
                  </StyledFindBtnContainer>
                </StyledEmptyContainer>
              )}
            </>
          )}
        </Container>

        <Navigation type={'default'} my />
      </Section>
    </Main>
  );
};

export default MyReviews;
