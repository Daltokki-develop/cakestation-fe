import type { ReactNode } from 'react';
import React from 'react';
import styled from 'styled-components';

import palette from '@/styles/palette';
import { AppConfig } from '@/utils/AppConfig';

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
`;

const Main = (props: IMainProps) => (
  <MainScreen>
    <MainContainer className="w-full px-1 text-gray-700 antialiased">
      {props.meta}

      <CustomSection>
        <img src="/assets/images/test-custom-section.png" alt="Cakestation" />
      </CustomSection>
      <MainSection>
        <ContentWrapper>
          {props.children}
          <div className="border-t border-gray-300 py-8 text-center text-sm">
            © Copyright {new Date().getFullYear()} {AppConfig.title}. Powered
            with{' '}
            <span role="img" aria-label="Love">
              ♥
            </span>{' '}
            by <a href="https://github.com/Daltokki-develop">Daltokki</a>
            {/*
             * PLEASE READ THIS SECTION
             * We'll really appreciate if you could have a link to our website
             * The link doesn't need to appear on every pages, one link on one page is enough.
             * Thank you for your support it'll mean a lot for us.
             */}
          </div>
        </ContentWrapper>
      </MainSection>
    </MainContainer>
  </MainScreen>
);

export { Main };
