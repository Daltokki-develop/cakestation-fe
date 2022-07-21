import React, { useEffect } from 'react';
import styled from 'styled-components';

import SearchBar from '@/components/common/searchbar';
import BottomSheet from '@/layouts/bottomSheet/BottomSheet';
import { Header } from '@/layouts/Header';
import { Meta } from '@/layouts/Meta';
import Navigation from '@/layouts/Navigation';
import { Main } from '@/templates/Main';

const MapContainer = styled.div`
  /* aspect-ratio: 4 / 3; */
  width: 100%;
  height: 100vh;
`;

const Absolute = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1;
`;

const Index = () => {
  // TODO: any 쓰면 안됨~~ 변경 필요~~

  /*
  const [data, setData] = useState<Array<any>>([
    { 위도: '37.5666805', 경도: '126.9784147' },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(
        //   process.env.NEXT_PUBLIC_LINE1_API || ''
        // );
        setData(subways);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);
  */

  useEffect(() => {
    const mapScript = document.createElement('script');

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        };
        const map = new window.kakao.maps.Map(container, options);

        // 커스텀 마커 표시
        // const imageSrc = '/assets/images/icons/LocationPicker.svg';
        // const imageSize = new window.kakao.maps.Size(40, 40);
        // const imageOption = { offset: new window.kakao.maps.Point(16, 32) };

        // 현재 위치도 커스텀 마커가 따로 있나?
        // const markerImage = new window.kakao.maps.MarkerImage(
        //   imageSrc,
        //   imageSize,
        //   imageOption
        // );

        function displayMarker(locPosition: number, message: string) {
          // 마커를 생성
          const marker = new window.kakao.maps.Marker({
            map,
            position: locPosition,
            // image: markerImage,
          });

          const iwContent = message; // 인포윈도우에 표시할 내용
          const iwRemoveable = true;

          // 인포윈도우를 생성
          const infowindow = new window.kakao.maps.InfoWindow({
            content: iwContent,
            removable: iwRemoveable,
          });

          // 인포윈도우를 마커위에 표시
          infowindow.open(map, marker);

          // 지도 중심좌표를 접속위치로 변경
          map.setCenter(locPosition);
        }

        if (navigator.geolocation) {
          // GeoLocation을 이용해서 접속 위치를 얻어오기
          navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const locPosition = new window.kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성
            const message = '<div style="padding:5px;">🍰현재위치</div>';

            // 마커와 인포윈도우를 표시
            displayMarker(locPosition, message);
          });
        } else {
          // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정

          const locPosition = new window.kakao.maps.LatLng(
            33.450701,
            126.570667
          );
          const message = 'geolocation을 사용할수 없어요..';

          displayMarker(locPosition, message);
        }
      });
    };
    mapScript.addEventListener('load', onLoadKakaoMap);

    return () => mapScript.removeEventListener('load', onLoadKakaoMap);
  }, []);

  return (
    <Main meta={<Meta title="Cakestation Map" description="지도 맛보기" />}>
      <Header style={'bar'}>
        <SearchBar placeholder="가게와 가까운 지하철 역 검색" />
      </Header>
      <Absolute>
        <MapContainer id="map" />
        {/* <Map
          latitude={data[0] && data[0]['위도']}
          longitude={data[0] && data[0]['경도']}
          positions={data}
          index={1}
        /> */}
      </Absolute>
      <BottomSheet />
      <Navigation type={'default'} />
      {/* <Navigation type={'item'} /> */}
    </Main>
  );
};

export default Index;
