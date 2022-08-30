import Link from 'next/link';
import type { NextRouter } from 'next/router';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import Button from '@/components/common/button';
import ItemCard from '@/components/common/itemcard';
import SearchBar from '@/components/common/searchbar';
import Section from '@/components/common/section';
import Typography from '@/components/common/typography';
import Completed from '@/components/completed';
import { Header } from '@/layouts/Header';
import Navigation from '@/layouts/Navigation';
import results from '@/lib/가게검색결과.json';

interface IStoreSearchProps {
  title: string;
  sub: string;
  isSimple?: boolean;
}

const StoreSearchHeader = (props: IStoreSearchProps) => {
  return (
    <div className="column">
      <div className="mb-10">
        <Typography category={'H1'}>케이크 가게 찾기</Typography>
      </div>
      <div className="mb-18">
        <Typography category={'Bd2'}>{props.sub}</Typography>
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

const NoResult = () => {
  return (
    <Link href={'/reviews/register/'}>
      <a className="mt-20">
        <Typography category={'Bd7'} color={'grey_400'}>
          <u>찾으시는 가게가 없으신가요?</u>
        </Typography>
      </a>
    </Link>
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

const FetchResultList = (
  keyword: string,
  resultList: any[],
  setResultList: (
    arg0: { id: number; title: string; location: string }[]
  ) => void,
  setFirstSearch: (arg0: boolean) => void
) => {
  console.log(`서치 키워드 : ${keyword}\n 서치 결과 : ${resultList}`);
  if (keyword === '달토끼 케이크') setResultList(results);
  else setResultList([]);
  setFirstSearch(true);
};

const HandleCompleted = (
  router: NextRouter,
  setCompleted: (arg0: boolean) => void
) => {
  setCompleted(true);
  const timer = setTimeout(() => {
    router.push('/');
  }, 2000);
  console.log(timer);
};

const GoReviewWrite = (router: NextRouter) => {
  router.push('/reviews/write/1234/addpictures');
};

const ResultList = (
  resultList: any[],
  props: IStoreSearchProps,
  setCompleted: (arg0: boolean) => void,
  firstSearch: boolean
) => {
  const router = useRouter();
  return (
    <div className="column mt-20 text-center">
      {resultList?.length > 0 ? (
        <>
          {resultList.map((result: any, index: React.Key) => (
            <ItemCard
              key={index}
              line={!props.isSimple}
              title={result.title}
              rate={result.rate}
              count={result.count}
              distance={result.distance}
              pictures={result.pictures}
              isSimple={props.isSimple}
              location={result.location}
              onClick={
                props.isSimple
                  ? () => HandleCompleted(router, setCompleted)
                  : () => GoReviewWrite(router)
              }
            />
          ))}
          {firstSearch && !props.isSimple && NoResult()}
        </>
      ) : (
        firstSearch && FirstSearch()
      )}
    </div>
  );
};

const StoreSearch = (props: IStoreSearchProps) => {
  const [keyword, setKeyword] = useState<string>('');
  const [resultList, setResultList] = useState<Array<any>>([]);
  const [firstSearch, setFirstSearch] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);

  const FetchResultListwithKey = (e: any) => {
    if (e.key === 'Enter')
      FetchResultList(keyword, resultList, setResultList, setFirstSearch);
  };

  return (
    <>
      <Header style={'text'}>{props.title}</Header>
      <Section padding={'11rem'}>
        <div className="w-85">
          {StoreSearchHeader(props)}
          <SearchBar
            placeholder={'가게 이름 검색'}
            onChange={(e: any) => setKeyword(e.target.value)}
            onKeyPress={FetchResultListwithKey}
          />
          {ResultList(resultList, props, setCompleted, firstSearch)}
          {keyword &&
            SearchButton(() =>
              FetchResultList(
                keyword,
                resultList,
                setResultList,
                setFirstSearch
              )
            )}
        </div>
      </Section>
      <Navigation type={'default'} />
      {completed && <Completed text={'가게 등록이 완료되었습니다!'} />}
    </>
  );
};

export default StoreSearch;
