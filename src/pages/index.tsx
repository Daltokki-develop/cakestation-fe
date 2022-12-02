/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import Image from 'next/image';
import Script from 'next/script';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Sheet from 'react-modal-sheet';
import ClipLoader from 'react-spinners/ClipLoader';
import styled from 'styled-components';

import Chip from '@/components/common/chip';
import Divider from '@/components/common/divider';
import ItemCard from '@/components/common/itemcard';
import Typography from '@/components/common/typography';
import NoResult from '@/components/NoResult';
import { Header } from '@/layouts/Header';
import { Meta } from '@/layouts/Meta';
import Navigation from '@/layouts/Navigation';
import {
  AXIOS_GET,
  getSessionSearchHistory,
  setSessionSearchHistory,
} from '@/lib/commonFunction';
import { BASE_URL } from '@/lib/ConstantURL';
import subways from '@/lib/전체지하철역.json';
import palette from '@/styles/palette';
import { Main } from '@/templates/Main';

const Absolute = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1;
  overflow: hidden;
`;

const CustomSheet = styled(Sheet)`
  margin-bottom: 5.1875rem;
  margin-left: calc(50%); //  TODO: 어떻게 맞출까
  max-width: 28rem;

  @media (max-width: 56.25rem) {
    margin: 5.1875rem auto;
  }

  .react-modal-sheet-backdrop {
    background-color: transparent !important;
  }
  .react-modal-sheet-container {
    box-shadow: none !important;
  }
  .react-modal-sheet-header {
    /* custom styles */
  }
  .react-modal-sheet-drag-indicator {
    /* custom styles */
  }
  .react-modal-sheet-content {
    /* custom styles */
  }
`;

const SheetHeader = styled.div`
  height: 95.6px;
  padding: 0 20px;
`;

const SheetTitle = styled.div`
  width: fit-content;
  padding: 4px 0;
  border-bottom: 2px solid ${palette.grey_800};
  margin-bottom: 32px;
`;

const SheetContent = styled.div`
  height: calc(100% - 95.6px);
`;
//   width: max-content;
//   height: max-content;
//   background-color: ${palette.green_500};
//   color: ${palette.white};
//   border-radius: 16px;
// `;

const LoadingContainer = styled.div`
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

const SetMyLocationButton = styled.div`
  position: absolute;
  bottom: 6rem;
  right: 1rem;
  width: 53px;
  height: 53px;
  display: flex;
  justify-content: center;
  align-items: center;

  background: ${palette.white};
  box-shadow: 0 4px 22px rgba(133, 133, 133, 0.34);
  border-radius: 50%;
  z-index: 100;

  cursor: pointer;
`;

const StyledSearchBar = styled.div`
  /* width: 100%; */
  /* height: 3rem; */
  background: ${palette.white};
  border: 0.125rem solid ${palette.black};
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  padding: 0.5rem;

  input {
    margin-left: 0.75rem;
    width: calc(100% - 2.5rem - 0.75rem);
    height: 100%;
    background-color: transparent;
    border: none;
    font-family: 'Pretendard-Regular';
    font-size: 1rem;

    :focus-visible {
      outline: none;
    }
  }
`;

const Toggle = styled.div`
  width: 80px;
  height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-indent: 11px;

  cursor: pointer;
`;

const SearchBackground = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${palette.white};
  z-index: 2;
  padding-top: 7.5rem;
`;

const SearchResultContainer = styled.div`
  width: 100%;
`;

const SearchResultHeader = styled.div`
  height: 54px;
  padding: 0 16px;
  display: flex;
  align-items: center;
`;

const SearchResultContent = styled.div`
  height: calc(100vh - 5.1875rem - 7.5rem - 0.375rem - 54px);
  overflow-y: scroll;
  margin-bottom: 5.1875rem;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const RecentSearchItem = styled.div`
  padding: 15.5px 16px;
  display: flex;
  align-items: center;
  cursor: pointer;

  .list-icon {
    width: 24px;
    height: 24px;
    margin-right: 12px;
  }
`;

// const  = styled.div`
//   width: 70px;
//   height: 32px;
//   background-color: ${palette.black};
//   color: ${palette.white};
//   border-radius: 32px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

let isAlreadyLoaded = false;

const CATEGORY_LIST = [
  {
    label: '지하철역',
    value: 'station',
    params: 'stationName',
  },
  {
    label: '가게',
    value: 'name',
    params: 'storeName',
  },
];

const Index = () => {
  // TODO: any 쓰면 안됨~~ 변경 필요~~

  /* useState */
  // 지도가 로드되었는 지 확인하는 변수
  const [loaded, setLoaded] = useState(isAlreadyLoaded);

  // 지하철역 마커들 찍을 위치 배열
  const [positions, setPositions] = useState<Array<any>>([
    { 위도: '37.5666805', 경도: '126.9784147' },
  ]);

  // 지도의 중심 좌표를 담을 변수
  const [center, setCenter] = useState({
    lat: 33.450701,
    lng: 126.570667,
  });

  // 사용자의 현재 위치 좌표를 담을 변수
  const [now, setNow] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: '',
    isLoading: true,
  });

  const [selected, setSelected] = useState('');

  const [isSheetOpen, setSheetOpen] = useState(false);

  const [searchMode, setSearchMode] = useState(false);

  const [searchComplete, setSearchComplete] = useState(false);

  const [searchHistoryList, setSearchHistoryList] = useState<
    Array<{ category: string; params: string; keyword: string }>
  >([]);

  const [resultList, setResultList] = useState<Array<any>>([]);

  const [category, setCategory] = useState<any>({});

  const [keyword, setKeyword] = useState('');

  const mapRef = useRef();

  const HandleToggle = useCallback(() => {
    if (category === CATEGORY_LIST[0]) {
      setCategory(CATEGORY_LIST[1]);
    } else if (category === CATEGORY_LIST[1]) {
      setCategory(CATEGORY_LIST[0]);
    }
  }, [category]);

  const HandleInputChange = useCallback((event: any) => {
    setSearchComplete(false);
    if (event.target.value) {
      setSearchMode(true);
    } else {
      setSearchMode(false);
    }
    setKeyword(event.target.value);
    setResultList([]);
  }, []);

  const HandleFetchData = useCallback(
    async (_category: any, _keyword: string) => {
      setKeyword(_keyword);
      setSearchComplete(true);

      const { value, params } = _category;
      const response = await AXIOS_GET(
        `${BASE_URL}/api/stores/search/${value}?${params}=${_keyword}`
      );

      setResultList(response?.data.result);
    },
    []
  );

  const HandleSearchHistory = useCallback(() => {
    let searchHistory = getSessionSearchHistory();
    if (searchHistory) {
      const arr = Object.keys(searchHistory).map((item) => parseInt(item, 10));
      const maxNum = Math.max(...arr) + 1;
      searchHistory[
        maxNum
      ] = `${category.value} ||| ${category.params} ||| ${keyword}`;
    } else {
      searchHistory = {
        0: `${category.value} ||| ${category.params} ||| ${keyword}`,
      };
    }

    const _searchHistoryList: any[] = [];
    Object.keys(searchHistory).forEach((index) => {
      const _split = searchHistory[index].split(' ||| ');
      const _value = _split[0];
      const _params = _split[1];
      const _keyword = _split[2];
      if (_keyword) {
        _searchHistoryList.push({
          category: { value: _value, params: _params },
          keyword: _keyword,
        });
      }
    });

    setSearchHistoryList(_searchHistoryList);
    setSessionSearchHistory(searchHistory);
  }, [category.params, category.value, keyword]);

  const HandleInputKeyDown = useCallback(
    (event: any) => {
      if (event.key === 'Enter') {
        HandleFetchData(category, keyword);

        if (keyword) {
          HandleSearchHistory();
        }
      }
    },
    [HandleFetchData, HandleSearchHistory, category, keyword]
  );

  const handleMoveLocation = () => {
    const map = mapRef.current;
    setCenter({
      // @ts-ignore
      lat: map?.getCenter().getLat(),

      // @ts-ignore
      lng: map?.getCenter().getLng(),
    });
  };

  const setCurrentLocation = () => {
    setCenter(now.center);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(
        //   process.env.NEXT_PUBLIC_LINE1_API || ''
        // );
        setPositions(subways);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setNow((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
        },
        (err) => {
          setNow((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setNow((prev) => ({
        ...prev,
        errMsg: 'geolocation을 사용할수 없어요..',
        isLoading: false,
      }));
    }
  }, []);

  useEffect(() => {
    setCenter(now.center);
  }, [now]);

  useEffect(() => {
    HandleSearchHistory();
    setCategory(CATEGORY_LIST[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Main meta={<Meta title="Cakestation Map" description="메인 화면" />}>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false`}
        onLoad={() => {
          kakao.maps.load(() => {
            isAlreadyLoaded = true;
            setLoaded(true);
          });
        }} // 동적으로 로드
      />
      <Header style={'bar'}>
        <StyledSearchBar>
          <Toggle onClick={HandleToggle}>
            <Typography category={'Bd8'}>{category?.label}</Typography>
            <Image
              src={'/assets/images/icons/up.svg'}
              width={10}
              height={6}
              alt={'arrow'}
            />
          </Toggle>
          <input
            value={keyword}
            placeholder="지하철역, 가게이름 검색"
            onChange={HandleInputChange}
            onKeyDown={HandleInputKeyDown}
          />
        </StyledSearchBar>
      </Header>
      <Absolute>
        {searchMode && (
          <SearchBackground>
            <SearchResultContainer>
              {searchComplete && (
                <>
                  <SearchResultHeader>
                    <Typography category="Bd2" color="cakeLavender_800">
                      &apos;{keyword}&apos;&nbsp;
                    </Typography>
                    <Typography category="Bd2">검색 결과</Typography>
                  </SearchResultHeader>
                  <Divider size={'large'} />
                  <SearchResultContent>
                    {resultList.length > 0 ? (
                      <>
                        {resultList.map((result: any, index: React.Key) => {
                          const { address, name, score, reviewNum } = result; // storeId,
                          return (
                            <ItemCard
                              key={index}
                              title={name}
                              rate={score || 0}
                              count={reviewNum || 0}
                              distance={address}
                              pictures={[]}
                              // onClick={() => GoReviewWrite(storeId)}
                            />
                          );
                        })}
                      </>
                    ) : (
                      <NoResult />
                    )}
                  </SearchResultContent>
                </>
              )}
            </SearchResultContainer>
            {!searchComplete && (
              <SearchResultContainer>
                <SearchResultHeader>
                  <Typography category="Bd2">최근 검색어</Typography>
                </SearchResultHeader>
                <Divider size={'large'} />
                <SearchResultContent>
                  {searchHistoryList?.map((item, index) => {
                    return (
                      <RecentSearchItem
                        key={index}
                        onClick={() =>
                          HandleFetchData(item.category, item.keyword)
                        }
                      >
                        <div className="list-icon">
                          <Image
                            // @ts-ignore
                            src={`/assets/images/icons/${item.category.value}.svg`}
                            width={24}
                            height={24}
                            // @ts-ignore
                            alt={item.category.value}
                          />
                        </div>
                        <Typography category="Bd2">{item.keyword}</Typography>
                      </RecentSearchItem>
                    );
                  })}
                </SearchResultContent>
              </SearchResultContainer>
            )}
            {/* <div className="empty-container" /> */}
          </SearchBackground>
        )}
        {loaded ? (
          <Map // 지도를 표시할 Container
            center={center}
            style={{
              // 지도의 크기
              width: '100%',
              height: '100vh',
            }}
            // @ts-ignore
            ref={mapRef}
            level={5} // 지도의 확대 레벨
            isPanto
            onDragEnd={handleMoveLocation}
          >
            {positions.map((position, index) => (
              <MapMarker
                key={index}
                position={{ lat: position.위도, lng: position.경도 }} // 마커를 표시할 위치
                image={{
                  src: '/assets/images/icons/station_pin.svg', // 마커이미지의 주소입니다
                  size: {
                    width: 50,
                    height: 31.4,
                  }, // 마커이미지의 크기입니다
                }}
                title={position.역명} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                onClick={async () => {
                  setSheetOpen(true);
                  setCenter({
                    lat: position.위도,
                    lng: position.경도,
                  });
                  setSelected(position.역명);
                  try {
                    const response = await AXIOS_GET(
                      `${BASE_URL}/api/stores/search/station?stationName=${position.역명}`
                    );
                    setResultList(response?.data.result);
                  } catch (e) {
                    setResultList([]);
                  }
                }}
              />
            ))}
            <MapMarker
              position={now.center} // 마커를 표시할 위치
              image={{
                src: '/assets/images/icons/spot2.svg', // 마커이미지의 주소입니다
                size: {
                  width: 27,
                  height: 36,
                }, // 마커이미지의 크기입니다
              }}
              title={'현재 위치'} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            />
            {!searchMode && (
              <SetMyLocationButton onClick={setCurrentLocation}>
                <img src={'/assets/images/icons/spot.svg'} alt={'spot'} />
              </SetMyLocationButton>
            )}
          </Map>
        ) : (
          <LoadingContainer>
            <div className="loading-icon">
              <ClipLoader color={palette.white} loading={!loaded} size={30} />
            </div>
            <Typography category="Bd5" color="white">
              지도를 불러오고 있습니다...
            </Typography>
          </LoadingContainer>
        )}
      </Absolute>
      <CustomSheet isOpen={isSheetOpen} onClose={() => setSheetOpen(false)}>
        <CustomSheet.Container>
          <CustomSheet.Header />
          <CustomSheet.Content>
            <SheetHeader>
              <SheetTitle>
                <span className="mr-6">
                  <Typography category="H4" color="black">
                    선택한 역
                  </Typography>
                </span>
                <Typography category="H4" color="cakeLavender_700">
                  {selected}
                </Typography>
              </SheetTitle>
              {/* <div>
                <StationTag>
                  <Typography category="Bd9">2호선</Typography>
                </StationTag>
                <StationTag>
                  <Typography category="Bd9">8호선</Typography>
                </StationTag>
              </div> */}
              <div className="flex items-center contents-space-between">
                <Typography category="H3">이 근처 케이크집 리뷰</Typography>
                <Chip options={['최신순', '인기순']} />
              </div>
            </SheetHeader>
            <SheetContent>
              {resultList.length > 0 ? (
                resultList.map((result: any, index: React.Key) => {
                  const { address, name, score, reviewNum } = result; // storeId,
                  return (
                    <ItemCard
                      key={index}
                      title={name}
                      rate={score || 0}
                      count={reviewNum || 0}
                      distance={address}
                      pictures={[]}
                      // onClick={() => GoReviewWrite(storeId)}
                    />
                  );
                })
              ) : (
                <NoResult />
              )}
            </SheetContent>
          </CustomSheet.Content>
        </CustomSheet.Container>

        <CustomSheet.Backdrop />
      </CustomSheet>

      <Navigation type={'default'} />
      {/* <Navigation type={'item'} /> */}
    </Main>
  );
};

export default Index;
