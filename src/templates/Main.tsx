import type { ReactNode } from 'react';
import React from 'react';
import styled from 'styled-components';

import palette from '@/styles/palette';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const MainScreen = styled.div`
  overflow: hidden;
  min-width: 100%;
  max-height: 100vh;
  margin-left: auto;
  margin-right: auto;

  /* body 기본 css */
  font-family: 'Pretendard-Medium';
  color: ${palette.grey_700};

  @media (max-width: 56.25rem) {
    overflow: inherit;
  }
`;

const MainContainer = styled.div`
  justify-content: center;
  display: flex;
  position: relative;

  @media (max-width: 56.25rem) {
    background-color: ${palette.white};
  }
`;

const BasicSection = styled.div`
  max-width: 28rem;
`;

const BackgroundSection = styled.div`
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  position: absolute;

  img {
    position: absolute;
    height: 5.435546875%; // 5556/1024
    left: 81px;
    bottom: 48.763671875%; //49934/1024

    @media (max-width: 56.25rem) {
      display: none;
    }
  }

  .typography-container {
    /* position: absolute;
    width: max-content;
    height: max-content;
    left: 81px;
*/
    position: absolute;
    width: 299px;
    height: 96px;
    left: 81px;
    bottom: 36.671875%; // 37552/1024

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 28.7619px;
    line-height: 148%;

    letter-spacing: -0.01em;

    color: ${palette.black};

    span {
      font-size: 32px;
      font-weight: bold;
    }

    @media (max-width: 56.25rem) {
      display: none;
    }
  }

  /* .typography-1 {
    bottom: 41%; // 37552/1024
  }

  .typography-2 {
    bottom: 36.671875%; // 37552/1024
  } */

  .black-container {
    position: absolute;
    width: 100%;
    height: 1.3671875%;
    bottom: calc(20.41015625% + 7.2265625%);

    background: ${palette.black};
  }

  .cakeLavender-container {
    position: absolute;
    width: 100%;
    height: 7.2265625%;
    bottom: 20.41015625%;

    background: ${palette.cakeLavender_500};
  }

  .cakeLemon-container {
    position: absolute;
    width: 100%;
    height: 20.41015625%; // 209/1024*100
    bottom: 0;

    background: ${palette.cakeLemon_500};
  }
`;

const CustomSection = styled(BasicSection)`
  width: 100%;
  max-width: 512px;
  height: 100%;
  background-color: transparent;
  left: 0;
  top: 0;
  position: sticky;

  @media (max-width: 56.25rem) {
    display: none;
  }

  img {
    object-fit: contain;
    height: 100vh;
    max-width: 100%;
    vertical-align: middle;
  }
`;

const MainSection = styled(BasicSection)`
  background-color: ${palette.white};
  width: 100%;
  box-shadow: 0 1.25rem 1.5625rem -0.3125rem rgba(0, 0, 0, 0.1),
    0 0.625rem 0.625rem -0.3125rem rgba(0, 0, 0, 0.04);
  overflow-y: auto;
  max-height: 100vh;
  top: 0;
  position: sticky;

  @media (max-width: 56.25rem) {
    box-shadow: none;
    overflow-y: inherit;
  }
`;

const ContentWrapper = styled.div`
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-content: center;
`;

const Main = (props: IMainProps) => (
  <MainScreen>
    <MainContainer className="w-full px-1 text-gray-700 antialiased">
      {props.meta}
      <BackgroundSection>
        <img src="/assets/images/background-logo.svg" alt="logo" />
        {/* <div className="typography-container typography-1">
          <Typography category={'H1'}>케이크 가게 찾기의 종착역,</Typography>
        </div>
        <div className="typography-container typography-2">
          <Typography category={'H1'}>
            <strong>CAKE STATION</strong>
          </Typography>
        </div> */}
        <div className="typography-container">
          케이크 가게 찾기의 종착역, <br />
          <span>CAKE STATION</span>
        </div>
        <div className="black-container" />
        <div className="cakeLavender-container" />
        <div className="cakeLemon-container" />
      </BackgroundSection>
      <CustomSection></CustomSection>
      <MainSection className="main-section">
        <ContentWrapper>{props.children}</ContentWrapper>
      </MainSection>
    </MainContainer>
  </MainScreen>
);

export { Main };
