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

function Map({ latitude, longitude, positions, index }: MapProps) {
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

        // 커스텀 마커 표시
        const imageSrc = `/assets/images/subway/line${index}.svg`;
        const imageSize = new window.kakao.maps.Size(32, 32);
        const imageOption = { offset: new window.kakao.maps.Point(16, 32) };

        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
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
            image: markerImage,
          });
          marker.setMap(map);
        }
      });
    };
    mapScript.addEventListener('load', onLoadKakaoMap);

    return () => mapScript.removeEventListener('load', onLoadKakaoMap);
  }, [latitude, longitude, positions]);

  return <MapContainer id="map" />;
}

export default Map;
