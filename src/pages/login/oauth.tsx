import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import Section from '@/components/common/section';
import Typography from '@/components/common/typography';
import { Meta } from '@/layouts/Meta';
import { AXIOS_GET } from '@/lib/commonFunction';
import { BASE_URL } from '@/lib/ConstantURL';
import { Main } from '@/templates/Main';

const Oauth = () => {
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    (async () => {
      if (code) {
        try {
          const response = await AXIOS_GET(
            `${BASE_URL}/api/oauth/kakao?code=${code}`
          );
          console.log(response);
          await router.push('/');
        } catch (e) {
          console.error(e);
        }
      }
    })();
  }, [code]);

  return (
    <Main meta={<Meta title="Cakestation Oauth" description="oauth" />}>
      <Section>
        <div className="w-85">
          <div className="mt-143">
            <Typography category={'H2'}>케이크 가게 찾기의 종착역</Typography>
          </div>
          <div className="mt-3 mb-33">
            <Typography category={'H1'}>CAKESTATION</Typography>
          </div>
          <Typography category={'Bd1'}>
            로그인이 완료되면 메인 페이지로 이동합니다...
          </Typography>
        </div>
      </Section>
    </Main>
  );
};

export default Oauth;
