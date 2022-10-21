import React, { useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Sheet from 'react-modal-sheet';
import styled from 'styled-components';

import SearchBar from '@/components/common/searchbar';
import { Header } from '@/layouts/Header';
import { Meta } from '@/layouts/Meta';
import Navigation from '@/layouts/Navigation';
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
  margin: 0px auto;
  max-width: 28rem;
  margin-bottom: 5.1875rem;

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

const Index = () => {
  // TODO: any 쓰면 안됨~~ 변경 필요~~

  // const [data, setData] = useState<Array<any>>([
  //   { 위도: '37.5666805', 경도: '126.9784147' },
  // ]);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [isMarkerOpen, setIsMarkerOpen] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // const response = await axios.get(
  //       //   process.env.NEXT_PUBLIC_LINE1_API || ''
  //       // );
  //       setData(subways);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <Main meta={<Meta title="Cakestation Map" description="지도 맛보기" />}>
      <Header style={'bar'}>
        <SearchBar
          placeholder="가게와 가까운 지하철 역 검색"
          onChange={() => {}}
        />
      </Header>
      <Absolute>
        <Map // 지도를 표시할 Container
          center={{
            // 지도의 중심좌표
            lat: 33.450701,
            lng: 126.570667,
          }}
          style={{
            // 지도의 크기
            width: '100%',
            height: '100vh',
          }}
          level={3} // 지도의 확대 레벨
        >
          <MapMarker // 인포윈도우를 생성하고 지도에 표시합니다
            position={{
              // 인포윈도우가 표시될 위치입니다
              lat: 33.450701,
              lng: 126.570667,
            }}
            clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
            onClick={() => setSheetOpen(true)}
          >
            {/* MapMarker의 자식을 넣어줌으로 해당 자식이 InfoWindow로 만들어지게 합니다 */}
            {/* 인포윈도우에 표출될 내용으로 HTML 문자열이나 React Component가 가능합니다 */}
            {isMarkerOpen && (
              <div style={{ minWidth: '150px' }}>
                <img
                  alt="close"
                  width="14"
                  height="13"
                  src="https://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif"
                  style={{
                    position: 'absolute',
                    right: '5px',
                    top: '5px',
                    cursor: 'pointer',
                  }}
                  onClick={() => setIsMarkerOpen(false)}
                />
                <div style={{ padding: '5px', color: '#000' }}>
                  Hello World!
                </div>
              </div>
            )}
          </MapMarker>
        </Map>
      </Absolute>
      <button onClick={() => setSheetOpen(true)}>Open sheet</button>

      <CustomSheet isOpen={isSheetOpen} onClose={() => setSheetOpen(false)}>
        <CustomSheet.Container>
          <CustomSheet.Header />
          <CustomSheet.Content>
            {/* Your CustomSheet content goes here */}
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
