import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';

import Map from '@/components/Map';
import { Meta } from '@/layouts/Meta';
import palette from '@/styles/palette';
import { Main } from '@/templates/Main';

const StyledButton = styled.button`
  border: none;
  cursor: pointer;
  padding: 0.3rem 0.5rem;
  & + & {
    margin-left: 0.3rem;
  }
  &:focus {
    background-color: ${palette.blue_300};
  }
`;

const SubwayName = [
  '1호선',
  '2호선',
  '3호선',
  '4호선',
  '5호선',
  '6호선',
  '7호선',
  '8호선',
  '9호선',
  '공항철도',
  '우이신설선',
  '경춘선',
  '경강선',
  '경의중앙선',
  '용인경전철',
  '신분당',
  '인천1호선',
  '인천2호선',
  '수인분당선',
  '의정부경전철',
];

const MapView = () => {
  // TODO: any 쓰면 안됨~~ 변경 필요~~
  const [data, setData] = useState<Array<any>>([
    { 위도: '37.5666805', 경도: '126.9784147' },
  ]);
  const [subwayNum, setSubwayNum] = useState<number>(1);
  const url = [
    process.env.NEXT_PUBLIC_LINE1_API,
    process.env.NEXT_PUBLIC_LINE2_API,
    process.env.NEXT_PUBLIC_LINE3_API,
    process.env.NEXT_PUBLIC_LINE4_API,
    process.env.NEXT_PUBLIC_LINE5_API,
    process.env.NEXT_PUBLIC_LINE6_API,
    process.env.NEXT_PUBLIC_LINE7_API,
    process.env.NEXT_PUBLIC_LINE8_API,
    process.env.NEXT_PUBLIC_LINE9_API,
    process.env.NEXT_PUBLIC_LINE10_API, // 공항철도
    process.env.NEXT_PUBLIC_LINE11_API, // 우이신설
    process.env.NEXT_PUBLIC_LINE12_API, // 경춘선
    process.env.NEXT_PUBLIC_LINE13_API, // 경강선
    process.env.NEXT_PUBLIC_LINE14_API, // 경의중앙
    process.env.NEXT_PUBLIC_LINE15_API, // 용인경전철
    process.env.NEXT_PUBLIC_LINE16_API, // 신분당
    process.env.NEXT_PUBLIC_LINE17_API, // 인천1호선
    process.env.NEXT_PUBLIC_LINE18_API, // 인천2호선
    process.env.NEXT_PUBLIC_LINE19_API, // 수인분당선
    process.env.NEXT_PUBLIC_LINE20_API, // 의정부경전철
  ];

  const onClick = async (num: number) => {
    try {
      const response = await axios.get(url[num] || '');
      setData(response.data.data);
      console.log(num, data);
      setSubwayNum(num + 1);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Main meta={<Meta title="Cakestation Map" description="지도 맛보기" />}>
      <div>
        {Array.from(Array(20), (_, index) => (
          <StyledButton
            key={index}
            type="button"
            onClick={() => onClick(index)}
          >
            {/* {index + 1}호선 */}
            {SubwayName[index]}
          </StyledButton>
        ))}
      </div>
      <div>
        <Map
          latitude={data[0] && data[0]['위도']}
          longitude={data[0] && data[0]['경도']}
          positions={data}
          index={subwayNum}
        />
      </div>
      {data &&
        data.map((d, index) => (
          <div key={index}>
            <div>
              역이름 : {d['역명']}
              <br />
              경도 : {d['경도']}
              <br />
              위도 : {d['위도']}
            </div>
            <hr />
          </div>
        ))}
    </Main>
  );
};

export default MapView;
