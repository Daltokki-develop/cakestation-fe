import { useEffect } from 'react';
import styled from 'styled-components';

const MapContainer = styled.div`
  /* aspect-ratio: 4 / 3; */
  width: 100%;
  height: 100vh;
`;

interface MapProps {
  latitude: number;
  longitude: number;
  // TODO: any 쓰. 지. 마.
  positions: any;
  index: number;
}

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    kakao: any;
  }
}

function Map({ latitude, longitude, positions }: MapProps) {
  useEffect(() => {
    const mapScript = document.createElement('script');

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
        };
        const map = new window.kakao.maps.Map(container, options);

        const PlacePinSize = new window.kakao.maps.Size(35, 35);
        const NowPinSize = new window.kakao.maps.Size(45, 45);
        const imageOption = { offset: new window.kakao.maps.Point(16, 32) };

        // cake 가게 위치 마커 표시하기
        function createCakeMarkers() {
          const imageSrc2 = '/assets/images/icons/pin.svg';

          const markerImage2 = new window.kakao.maps.MarkerImage(
            imageSrc2,
            PlacePinSize,
            imageOption
          );

          for (let i = 0; i < positions.length; i += 1) {
            const marker = new window.kakao.maps.Marker({
              map,
              position: new window.kakao.maps.LatLng(
                positions[i]['위도'],
                positions[i]['경도']
              ),
              title: positions[i]['역명'],
              image: markerImage2,
            });
            marker.setMap(map);
          }
        }

        createCakeMarkers();

        // 사용자 현재 위치 마커 표시하기
        function displayPresentMarker(locPosition: number, message: string) {
          const imageSrc = '/assets/images/icons/spot2.svg';

          const markerImage = new window.kakao.maps.MarkerImage(
            imageSrc,
            NowPinSize,
            imageOption
          );

          const marker = new window.kakao.maps.Marker({
            map,
            position: locPosition,
            image: markerImage,
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
            displayPresentMarker(locPosition, message);
          });
        } else {
          // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정

          const locPosition = new window.kakao.maps.LatLng(
            33.450701,
            126.570667
          );
          const message = 'geolocation을 사용할수 없어요..';

          displayPresentMarker(locPosition, message);
        }
      });
    };
    mapScript.addEventListener('load', onLoadKakaoMap);

    return () => mapScript.removeEventListener('load', onLoadKakaoMap);
  }, [latitude, longitude, positions]);

  return <MapContainer id="map" />;
}

export default Map;
