import React from 'react';

import Button from '@/components/common/button';
import Section from '@/components/common/section';
import Typography from '@/components/common/typography';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Login = () => {
  const handleLogin = () => {};

  return (
    <Main
      meta={<Meta title="Cakestation Login" description="로그인 페이지이다" />}
    >
      <Section>
        <div className="w-85">
          <div className="mt-143">
            <Typography category={'H2'}>케이크 가게 찾기의 종착역</Typography>
          </div>
          <div className="mt-3">
            <Typography category={'H1'}>CAKESTATION</Typography>
          </div>
          <div className="mt-48">
            <img src="/assets/images/landing-logo.gif" alt="landing-logo" />
          </div>
          <div className="mt-48">
            <Button
              size={'medium'}
              category={'primary'}
              disabled={false}
              onClick={() => handleLogin}
            >
              카카오톡으로 시작하기
            </Button>
          </div>
        </div>
      </Section>
    </Main>
  );
};

export default Login;
