import Script from 'next/script';
import React, { useEffect, useRef, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Sheet from 'react-modal-sheet';
import styled from 'styled-components';

import ItemCard from '@/components/common/itemcard';
import SearchBar from '@/components/common/searchbar';
import Typography from '@/components/common/typography';
import { Header } from '@/layouts/Header';
import { Meta } from '@/layouts/Meta';
import Navigation from '@/layouts/Navigation';
import { AXIOS_GET } from '@/lib/commonFunction';
import { BASE_URL } from '@/lib/ConstantURL';
import subways from '@/lib/전체지하철역.json';
import palette from '@/styles/palette';
import { Main } from '@/templates/Main';

// const MapContainer = styled.div`
//   /* aspect-ratio: 4 / 3; */
//   width: 100%;
//   height: 100vh;
// `;

const Absolute = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1;
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
  padding: 0 20px;
`;

const SheetTitle = styled.div`
  width: fit-content;
  padding: 4px 0;
  border-bottom: 2px solid ${palette.grey_800};
  margin-bottom: 32px;
`;

const SheetContent = styled.div`
  /* padding: 0 20px; */
`;

// const StationTag = styled.div`
//   padding: 8px 10px;
//   width: max-content;
//   height: max-content;
//   background-color: ${palette.green_500};
//   color: ${palette.white};
//   border-radius: 16px;
// `;

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

const Chip = styled.div`
  width: 70px;
  height: 32px;
  background-color: ${palette.black};
  color: ${palette.white};
  border-radius: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

let isAlreadyLoaded = false;

const Index = () => {
  // TODO: any 쓰면 안됨~~ 변경 필요~~

  const [loaded, setLoaded] = useState(isAlreadyLoaded);
  const [positions, setPositions] = useState<Array<any>>([
    { 위도: '37.5666805', 경도: '126.9784147' },
  ]);
  const [center, setCenter] = useState({
    lat: 33.450701,
    lng: 126.570667,
  });
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

  const [resultList, setResultList] = useState<Array<any>>([]);

  const mapRef = useRef();

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

  return (
    <Main meta={<Meta title="Cakestation Map" description="지도 맛보기" />}>
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
        <SearchBar
          placeholder="가게와 가까운 지하철 역 검색"
          onChange={() => {}}
        />
      </Header>
      <Absolute>
        {loaded && (
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
                    console.error(e);
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
            {/* <MapMarker // 인포윈도우를 생성하고 지도에 표시합니다
            position={{
              // 인포윈도우가 표시될 위치입니다
              lat: 33.450701,
              lng: 126.570667,
            }}
            clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
            onClick={() => setSheetOpen(true)}
          > */}
            {/* MapMarker의 자식을 넣어줌으로 해당 자식이 InfoWindow로 만들어지게 합니다 */}
            {/* 인포윈도우에 표출될 내용으로 HTML 문자열이나 React Component가 가능합니다 */}
          </Map>
        )}
      </Absolute>
      지도 로딩중...
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
                <Chip>
                  <Typography category="Bd8">최신순</Typography>
                  <img
                    className="ml-6"
                    src="/assets/images/icons/chip_arrow.svg"
                    alt="arrow"
                  />
                </Chip>
              </div>
            </SheetHeader>
            <SheetContent>
              <div>
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
              </div>
            </SheetContent>
          </CustomSheet.Content>
        </CustomSheet.Container>

        <CustomSheet.Backdrop />
      </CustomSheet>
      <SetMyLocationButton onClick={setCurrentLocation}>
        <img src={'/assets/images/icons/spot.svg'} alt={'spot'} />
      </SetMyLocationButton>
      <Navigation type={'default'} />
      {/* <Navigation type={'item'} /> */}
    </Main>
  );
};

export default Index;
