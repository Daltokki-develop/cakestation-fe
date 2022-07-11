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

  @media (max-width: 900px) {
    overflow: inherit;
  }
`;

const MainContainer = styled.div`
  background-color: ${palette.grey_100};
  justify-content: center;
  display: flex;
  position: relative;

  @media (max-width: 900px) {
    background-color: ${palette.white};
  }
`;

const BasicSection = styled.div`
  max-width: 28rem;
`;

const CustomSection = styled(BasicSection)`
  background-color: transparent;
  left: 0;
  top: 0;
  position: sticky;

  @media (max-width: 900px) {
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
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  overflow-y: scroll;
  max-height: 100vh;
  top: 0;
  position: sticky;

  @media (max-width: 900px) {
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

      <CustomSection>
        <img src="/assets/images/test-custom-section.png" alt="Cakestation" />
      </CustomSection>
      <MainSection>
        <ContentWrapper>{props.children}</ContentWrapper>
      </MainSection>
    </MainContainer>
  </MainScreen>
);

export { Main };
