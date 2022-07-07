import { useEffect } from 'react';
import styled from 'styled-components';

const MapContainer = styled.div`
  aspect-ratio: 320 / 220;
`;

interface MapProps {
  latitude: number;
  longitude: number;
}

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    kakao: any;
  }
}

function Map({ latitude, longitude }: MapProps) {
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
        const imageSrc =
          'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';
        const imageSize = new window.kakao.maps.Size(64, 69);
        const imageOption = { offset: new window.kakao.maps.Point(27, 69) };

        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

        const markerPosition = new window.kakao.maps.LatLng(
          latitude,
          longitude
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });
        marker.setMap(map);
        console.log('window.kakao.maps.load');
      });
      console.log('onLoadKakaoMap');
    };

    // TODO: 배포 시 onLoadKakaoMap이 불려오지 않음
    mapScript.addEventListener('load', onLoadKakaoMap);
    console.log('mapScript.addEventListener("load", onLoadKakaoMap)');

    return () => mapScript.removeEventListener('load', onLoadKakaoMap);
  }, [latitude, longitude]);

  return <MapContainer id="map" />;
}

export default Map;
