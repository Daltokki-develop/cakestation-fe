import Link from 'next/link';
import React from 'react';

import Button from '@/components/common/button';
import Section from '@/components/common/section';
import Typography from '@/components/common/typography';
import { Meta } from '@/layouts/Meta';
import { KAKAO_URL } from '@/lib/ConstantURL';
import { Main } from '@/templates/Main';

const Login = () => {
  return (
    <Main meta={<Meta title="Cakestation Login" description="login" />}>
      <Section>
        <div className="w-85">
          <div className="mt-143">
            <Typography category={'H2'}>케이크 가게 찾기의 종착역</Typography>
          </div>
          <div className="mt-6">
            <Typography category={'H1'}>CAKE STATION</Typography>
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
        </div>
      </Section>
    </Main>
  );
};

export default Login;
