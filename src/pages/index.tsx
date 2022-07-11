import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import SearchBar from '@/components/common/searchbar';
import Map from '@/components/Map';
import { Header } from '@/layouts/Header';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

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
  const [data, setData] = useState<Array<any>>([
    { 위도: '37.5666805', 경도: '126.9784147' },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_LINE1_API || ''
        );
        setData(response.data.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <Main meta={<Meta title="Cakestation Map" description="지도 맛보기" />}>
      <Header style={'bar'}>
        <SearchBar placeholder="가게와 가까운 지하철 역 검색" />
      </Header>
      <Absolute>
        <Map
          latitude={data[0] && data[0]['위도']}
          longitude={data[0] && data[0]['경도']}
          positions={data}
          index={1}
        />
      </Absolute>
    </Main>
  );
};

export default Index;
