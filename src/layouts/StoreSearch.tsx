import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Button from '@/components/common/button';
import ItemCard from '@/components/common/itemcard';
import SearchBar from '@/components/common/searchbar';
import Section from '@/components/common/section';
import Typography from '@/components/common/typography';
import { Header } from '@/layouts/Header';
import Navigation from '@/layouts/Navigation';
import { AXIOS_GET } from '@/lib/commonFunction';
import { BASE_URL } from '@/lib/ConstantURL';

interface IStoreSearchProps {
  title: string;
  sub: string;
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

const NoResult = () => {
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

const FetchAllResultList = async (setResultList: any) => {
  try {
    const response = await AXIOS_GET(`${BASE_URL}/api/stores/all`);
    setResultList(response?.data.result);
  } catch (e) {
    console.error(e);
    setResultList({});
  }
};

const FetchResultList = async (keyword: string, setResultList: any) => {
  try {
    const response = await AXIOS_GET(
      `${BASE_URL}/api/stores/search?keyword=${keyword}`
    );
    setResultList(response?.data.result);
  } catch (e) {
    console.error(e);
    setResultList({});
  }
};

const StoreSearch = (props: IStoreSearchProps) => {
  const [keyword, setKeyword] = useState<string>('');
  const [resultList, setResultList] = useState<Array<any>>([]);
  const router = useRouter();

  const FetchResultListwithKey = async (e: any) => {
    if (e.key === 'Enter') await FetchResultList(keyword, setResultList);
  };

  const GoReviewWrite = async (storeId: string) => {
    const reviewData = { storeId: '' };
    reviewData.storeId = storeId;
    sessionStorage.setItem('ReviewData', JSON.stringify(reviewData));
    await router.push('/reviews/write/addpictures/');
  };

  useEffect(() => {
    FetchAllResultList(setResultList);
    // sessionStorage.setItem('ReviewData', JSON.stringify(''));
  }, []);

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
          <div className="column mt-20 text-center">
            {resultList.length > 0 ? (
              <>
                {resultList.map((result: any, index: React.Key) => {
                  const { storeId, address, name, score, reviewNum } = result;
                  return (
                    <ItemCard
                      key={index}
                      line
                      title={name}
                      rate={score || 0}
                      count={reviewNum || 0}
                      distance={address}
                      pictures={[]}
                      onClick={() => GoReviewWrite(storeId)}
                    />
                  );
                })}
              </>
            ) : (
              NoResult()
            )}
          </div>
          {keyword &&
            SearchButton(() => FetchResultList(keyword, setResultList))}
        </div>
      </Section>
      <Navigation type={'default'} />
    </>
  );
};

export default StoreSearch;
