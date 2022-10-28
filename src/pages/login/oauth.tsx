import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import Section from '@/components/common/section';
import Typography from '@/components/common/typography';
import { Meta } from '@/layouts/Meta';
import { AXIOS_GET } from '@/lib/commonFunction';
import { BASE_URL } from '@/lib/ConstantURL';
import { Main } from '@/templates/Main';

const OauthImageSection = styled.div`
  position: relative;
  width: 312px;
  height: 312px;
  margin-bottom: 54px;

  img {
    position: absolute;
  }

  .shine {
    width: 311px;
    height: 229px;
    top: 42px;
    left: 0;
  }

  .cake {
    width: 110px;
    height: 124px;
    left: 101px;
    top: 116px;

    animation: moveCake 1.5s linear infinite;

    @keyframes moveCake {
      0% {
        top: 91px;
      }
      50% {
        top: 121px;
      }
      100% {
        top: 91px;
      }
    }
  }

  .prop {
    width: 254.8px;
    height: 87.1px;
    left: 31.2px;
    top: 224.9px;
  }
`;

const Oauth = () => {
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    (async () => {
      if (code) {
        try {
          const response = await AXIOS_GET(
            `${BASE_URL}/api/oauth?code=${code}`
          );
          if (response) {
            const UserData = { accessToken: '' };
            UserData.accessToken = response.data.result;
            sessionStorage.setItem('UserData', JSON.stringify(UserData));
            await router.push('/');
          }
        } catch (e) {
          // console.error(e);
        }
      }
    })();
  }, [code]);

  return (
    <Main meta={<Meta title="Cakestation Oauth" description="oauth" />}>
      <Section>
        <div className="w-100 h-100 flex column contents-center items-center">
          <OauthImageSection>
            <img
              src={'/assets/images/oauth/shine.svg'}
              alt="shine"
              className={'shine'}
            />
            <img
              src={'/assets/images/oauth/prop.svg'}
              alt="prop"
              className={'prop'}
            />
            <img
              src={'/assets/images/oauth/cake.svg'}
              alt="cake"
              className={'cake'}
            />
          </OauthImageSection>
          <Typography category={'H5'}>
            카카오 로그인 페이지로 전환중...
          </Typography>
        </div>
      </Section>
    </Main>
  );
};

export default Oauth;
