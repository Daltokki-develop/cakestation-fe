import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import Button from '@/components/common/button';
import Section from '@/components/common/section';
import Typography from '@/components/common/typography';
import { Meta } from '@/layouts/Meta';
import { KAKAO_URL } from '@/lib/ConstantURL';
import { Main } from '@/templates/Main';

const FullHeightContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Login = () => {
  return (
    <Main meta={<Meta title="Cakestation Login" description="login" />}>
      <Section>
        <div className="w-85">
          <FullHeightContainer>
            <div>
              <Typography category={'H2'}>케이크 가게 찾기의 종착역</Typography>
            </div>
            <div className="mt-6">
              <Typography category={'H1'}>
                <strong>CAKE STATION</strong>
              </Typography>
            </div>
            <div className="mt-48">
              <img src="/assets/images/landing-logo.gif" alt="landing-logo" />
            </div>
            <div className="mt-48">
              <Link href={KAKAO_URL} className="mt-48">
                <a>
                  <Button size={'medium'} category={'primary'}>
                    <img
                      className="mr-7_5 w-21 h-19_3"
                      src="/assets/images/icons/kakao.svg"
                      alt="kakaoTalk"
                    />
                    <Typography category={'Bd5'}>
                      카카오톡으로 시작하기
                    </Typography>
                  </Button>
                </a>
              </Link>
            </div>
          </FullHeightContainer>
        </div>
      </Section>
    </Main>
  );
};

export default Login;
