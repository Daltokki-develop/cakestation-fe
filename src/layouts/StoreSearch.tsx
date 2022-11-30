import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import styled from 'styled-components';

import Button from '@/components/common/button';
import ItemCard from '@/components/common/itemcard';
import SearchBar from '@/components/common/searchbar';
import Section from '@/components/common/section';
import Typography from '@/components/common/typography';
import NoResult from '@/components/NoResult';
import { Header } from '@/layouts/Header';
import Navigation from '@/layouts/Navigation';
import { AXIOS_GET } from '@/lib/commonFunction';
import { BASE_URL } from '@/lib/ConstantURL';
import palette from '@/styles/palette';

interface IStoreSearchProps {
  title: string;
  sub: string;
}

const LoadingContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${palette.black};
  opacity: 0.5;

  z-index: 105;

  .loading-icon {
    margin-bottom: 4px;
  }
`;

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

const StoreSearch = (props: IStoreSearchProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [searchComplete, setSearchComplete] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');
  const [resultList, setResultList] = useState<Array<any>>([]);
  const router = useRouter();

  const FetchAllResultList = async () => {
    try {
      setLoading(true);
      const response = await AXIOS_GET(`${BASE_URL}/api/stores/all`);
      setLoading(false);
      setResultList(response?.data.result);
    } catch (e) {
      setResultList([]);
    }
  };

  const FetchResultList = async () => {
    try {
      setLoading(true);
      setSearchComplete(true);
      const response = await AXIOS_GET(
        `${BASE_URL}/api/stores/search/name?storeName=${keyword}`
      );
      setLoading(false);
      setResultList(response?.data.result);
    } catch (e) {
      setResultList([]);
    }
  };

  const FetchResultListwithKey = async (e: any) => {
    if (e.key === 'Enter') {
      await FetchResultList();
    }
  };

  const GoReviewWrite = async (storeId: string) => {
    const reviewData = { storeId: '' };
    reviewData.storeId = storeId;
    sessionStorage.setItem('ReviewData', JSON.stringify(reviewData));
    await router.push('/reviews/write/addpictures/');
  };

  const HandleInputChange = useCallback((event: any) => {
    setSearchComplete(false);
    setKeyword(event.target.value);
  }, []);

  useEffect(() => {
    FetchAllResultList();
    // sessionStorage.setItem('ReviewData', JSON.stringify(''));
  }, []);

  return (
    <>
      {loading && (
        <LoadingContainer>
          <div className="loading-icon">
            <ClipLoader color={palette.white} loading={loading} size={30} />
          </div>
          <Typography category="Bd5" color="white">
            가게 목록을 불러오고 있습니다...
          </Typography>
        </LoadingContainer>
      )}
      <Header style={'text'}>{props.title}</Header>
      <Section padding={'11rem'}>
        <div className="w-85">
          {StoreSearchHeader(props)}
          <SearchBar
            placeholder={'가게 이름 검색'}
            onChange={(e: Object) => HandleInputChange(e)}
            onKeyPress={FetchResultListwithKey}
          />
          <div className="column mt-20 text-center">
            {resultList?.length > 0 ? (
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
              searchComplete && <NoResult />
            )}
          </div>
          {keyword && SearchButton(() => FetchResultList())}
        </div>
      </Section>
      <Navigation type={'default'} />
    </>
  );
};

export default StoreSearch;
