import { useRouter } from 'next/router';
import React, { useState } from 'react';

import Button from '@/components/common/button';
import SearchBar from '@/components/common/searchbar';
import Section from '@/components/common/section';
import SimpleCard from '@/components/common/simplecard';
import Typography from '@/components/common/typography';
import Completed from '@/components/completed';
import { Header } from '@/layouts/Header';
import { Meta } from '@/layouts/Meta';
import Navigation from '@/layouts/Navigation';
import results from '@/lib/미등록가게검색결과.json';
import { Main } from '@/templates/Main';

const ReviewSearchHeader = () => {
  return (
    <div className="column">
      <div className="mb-10">
        <Typography category={'H1'}>케이크 가게 찾기</Typography>
      </div>
      <div className="mb-18">
        <Typography category={'Bd2'}>
          등록하고 싶은 가게를 선택해주세요.
        </Typography>
      </div>
    </div>
  );
};

const FirstSearch = () => {
  return (
    <div className="column items-center">
      <img
        src="/assets/images/icons/no_result.svg"
        alt="NO RESULT"
        width={200}
        className="mt-20 mb-33"
      />
      <Typography category={'Bd7'} color={'grey_400'}>
        앗!
        <br />
        검색 결과가 없습니다.
      </Typography>
    </div>
  );
};

const SearchButton = (FetchResultList: (() => void) | undefined) => {
  return (
    <div className="w-100 fixed b-108 max-w-28">
      <div className="w-85">
        <Button
          size={'medium'}
          category={'primary'}
          disabled={false}
          onClick={FetchResultList}
        >
          찾기
        </Button>
      </div>
    </div>
  );
};

const ResultList = (
  resultList: any[],
  HandleCompleted: (() => void) | undefined,
  firstSearch: boolean
) => {
  return (
    <div className="column mt-20 text-center">
      {resultList?.length > 0
        ? resultList.map((result, index) => (
            <SimpleCard
              key={index}
              line
              title={result.title}
              location={result.location}
              onClick={HandleCompleted}
            />
          ))
        : firstSearch && FirstSearch()}
    </div>
  );
};

const RegisterShop = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [resultList, setResultList] = useState<Array<any>>([]);
  const [firstSearch, setFirstSearch] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const router = useRouter();

  const FetchResultList = () => {
    console.log(`서치 키워드 : ${keyword}\n 서치 결과 : ${resultList}`);
    if (keyword === '달토끼 케이크') setResultList(results);
    else setResultList([]);
    setFirstSearch(true);
  };

  const HandleCompleted = () => {
    setCompleted(true);
    const timer = setTimeout(() => {
      router.push('/');
    }, 2000);
    console.log(timer);
  };

  const FetchResultListwithKey = (e: any) => {
    if (e.key === 'Enter') FetchResultList();
  };

  return (
    <Main meta={<Meta title="Cakestation Review" description="리뷰 맛보기" />}>
      <Header style={'text'}>가게 등록</Header>
      <Section padding={'11rem'}>
        <div className="w-85">
          {ReviewSearchHeader()}
          <SearchBar
            placeholder={'가게 이름 검색'}
            onChange={(e: any) => setKeyword(e.target.value)}
            onKeyPress={FetchResultListwithKey}
          />
          {ResultList(resultList, HandleCompleted, firstSearch)}
          {keyword && SearchButton(FetchResultList)}
        </div>
      </Section>
      <Navigation type={'default'} />
      {completed && <Completed text={'가게 등록이 완료되었습니다!'} />}
    </Main>
  );
};

export default RegisterShop;
