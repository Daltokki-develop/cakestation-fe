import React from 'react';
import styled from 'styled-components';

import Button from '../common/button';
import Divider from '../common/divider';
import Typography from '../common/typography';
import MapforDetails from './MapforDetails';

const StyledTitle = styled.div`
  padding-top: 24px;
  padding-bottom: 20px;
  padding-left: 20px;
`;

const StyledSubTitle = styled.div`
  padding-bottom: 20px;
  padding-left: 20px;
`;

const MapContainer = styled.div`
  position: relative;
  margin: 0 auto;
  width: 90%;
  height: 200px;
  background-color: black;
`;

const StyledText = styled.div`
  padding-top: 16px;
  padding-bottom: 24px;
  padding-left: 16px;
`;

const ButtonArea = styled.div`
  position: absolute;
  z-index: 10;
  bottom: 0.875rem;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  width: 10.8125rem;
  margin: 0 auto;
`;

const TotalDetail = ({ address, more }: { address: string; more: string }) => {
  const HandleMapButton = () => {
    window.open(more);
  };

  return (
    <>
      <>
        <StyledTitle>
          <Typography category={'H2'} color={'black'}>
            오시는 길
          </Typography>
        </StyledTitle>
        <MapContainer>
          <MapforDetails searchAddress={address} />
          <ButtonArea>
            <ButtonWrapper>
              <Button
                size={'small'}
                category={'primary'}
                disabled={false}
                onClick={HandleMapButton}
              >
                카카오맵에서 위치 열기
              </Button>
            </ButtonWrapper>
          </ButtonArea>
        </MapContainer>
        <StyledText>
          <Typography category={'Bd6'} color={'grey_700'}>
            {address}
          </Typography>
        </StyledText>
        <Divider size={'large'} />
      </>
      <>
        <StyledTitle>
          <Typography category={'H2'} color={'black'}>
            메뉴
          </Typography>
        </StyledTitle>
        <StyledSubTitle>
          <Typography category={'Bd1'} color={'black'}>
            케이크 사이즈
          </Typography>
        </StyledSubTitle>
        <img src={'/assets/images/test-cakesize.png'} />
        <Divider size={'large'} />
      </>
    </>
  );
};

export default TotalDetail;
