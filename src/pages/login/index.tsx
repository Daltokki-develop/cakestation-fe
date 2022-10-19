import Link from 'next/link';
import React from 'react';

import Button from '@/components/common/button';
import Section from '@/components/common/section';
import Typography from '@/components/common/typography';
import { Meta } from '@/layouts/Meta';
import { CLIENT_ID, REDIRECT_URI } from '@/lib/ConstantURL';
import { Main } from '@/templates/Main';

const Login = () => {
  return (
    <Main meta={<Meta title="Cakestation Login" description="login" />}>
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
          <Link
            href={`https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`}
            className="mt-48"
          >
            <a>
              <Button size={'medium'} category={'primary'}>
                카카오톡으로 시작하기
              </Button>
            </a>
          </Link>
          {/* <Button size={'medium'} category={'primary'} onClick={handleLogin}> */}
          {/*  카카오톡으로 시작하기 */}
          {/* </Button> */}
        </div>
      </Section>
    </Main>
  );
};

export default Login;
