import React, { useState } from 'react';
import styled from 'styled-components';

import Button from '@/components/common/button';
import ItemCard from '@/components/common/itemcard';
import SearchBar from '@/components/common/searchbar';
import Section from '@/components/common/section';
import Typography from '@/components/common/typography';
import { Header } from '@/layouts/Header';
import { Meta } from '@/layouts/Meta';
import Navigation from '@/layouts/Navigation';
import results from '@/lib/가게검색결과.json';
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

  .max-w {
    max-width: 22.9071rem;
  }

  .mt-20 {
    margin-top: 1.25rem;
  }
`;

const MT16 = styled.div`
  & + & {
    margin-top: 1rem;
  }
`;

const ReviewsSearch = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [resultList, setResultList] = useState<Array<any>>();
  const [firstSearch, setFirstSearch] = useState<boolean>(false);

  const FetchResultList = () => {
    console.log(`서치 키워드 : ${keyword}\n 서치 결과 : ${resultList}`);
    if (keyword === '달토끼 케이크') setResultList(results);
    else setResultList([]);
    setFirstSearch(true);
  };

  const FetchResultListwithKey = (e: any) => {
    if (e.key === 'Enter') FetchResultList();
  };

  return (
    <Main meta={<Meta title="Cakestation Review" description="리뷰 맛보기" />}>
      <Header style={'text'}>리뷰 쓰기</Header>
      <Styles>
        <Section padding={'11rem'}>
          <div className="w-85">
            <div className="column">
              <div className="mb-10">
                <Typography category={'H1'}>케이크 가게 찾기</Typography>
              </div>
              <div className="mb-18">
                <Typography category={'Bd2'}>케이크 가게 찾기</Typography>
              </div>
            </div>
            <SearchBar
              placeholder={'가게 이름 검색'}
              onChange={(e: any) => setKeyword(e.target.value)}
              onKeyPress={FetchResultListwithKey}
            />
            <div className="column mt-20">
              {resultList && resultList[0]
                ? resultList.map((result, index) => (
                    <MT16 key={index}>
                      <ItemCard
                        line
                        title={result.title}
                        rate={result.rate}
                        count={result.count}
                        pictures={result.pictures}
                      />
                    </MT16>
                  ))
                : firstSearch && (
                    <Typography category={'Bd7'} color={'grey_500'}>
                      검색 결과가 없습니다.
                    </Typography>
                  )}
            </div>
            {keyword && (
              <div className="w-100 fixed b-108 max-w">
                <Button
                  size={'medium'}
                  category={'primary'}
                  disabled={false}
                  onClick={FetchResultList}
                >
                  찾기
                </Button>
              </div>
            )}
          </div>
        </Section>
      </Styles>
      <Navigation type={'default'} />
    </Main>
  );
};

export default ReviewsSearch;
