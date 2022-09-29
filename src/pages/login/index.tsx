import Link from 'next/link';
import React from 'react';

import Button from '@/components/common/button';
import Section from '@/components/common/section';
import Typography from '@/components/common/typography';
import { Meta } from '@/layouts/Meta';
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
          <Link href={`http://3.35.207.202:8080/api/login`} className="mt-48">
            <a>
              <Button size={'medium'} category={'primary'}>
                카카오톡으로 시작하기
              </Button>
            </a>
          </Link>
        </div>
      </Section>
    </Main>
  );
};

export default Login;
