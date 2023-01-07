import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import Divider from '@/components/common/divider';
import Section from '@/components/common/section';
import Typography from '@/components/common/typography';
import LoadingContainer from '@/components/loading';
import { Header } from '@/layouts/Header';
import { Meta } from '@/layouts/Meta';
import Navigation from '@/layouts/Navigation';
import { AXIOS_GET, AXIOS_PATCH } from '@/lib/commonFunction';
import { BASE_URL } from '@/lib/ConstantURL';
import { Main } from '@/templates/Main';

const Absolute = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1;
  overflow: hidden;
`;

const ProfileItem = styled.div`
  display: flex;
  align-items: center;
  margin: 24px 0;
  padding: 0 18px;
`;

const LinkItem = styled.div`
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  cursor: pointer;
`;

const ResetButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 6px;
`;

const MyPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [myData, setMyData] = useState({
    randomNumber: 1,
    nickName: null,
    reviewCount: 0,
    reviewImageCount: 0,
    likeCount: 0,
  });

  const FetchMyData = useCallback(async () => {
    try {
      const response = await AXIOS_GET(`${BASE_URL}/api/mypage`, router);
      if (response?.status === 200) {
        const fetchData = response?.data.result;
        setMyData(fetchData);
        setLoading(false);
      }
    } catch (e) {
      console.error(e);
    }
  }, [router]);

  const ResetNickname = async () => {
    try {
      const response = await AXIOS_PATCH(`${BASE_URL}/api/nickname`, router);
      if (response?.status === 200) {
        FetchMyData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    setLoading(true);
    FetchMyData();
  }, [FetchMyData]);

  const { randomNumber, nickName, reviewCount, likeCount } = myData;

  return (
    <Main meta={<Meta title="Cakestation Review" description="마이페이지" />}>
      <Header style={'text'}>마이페이지</Header>
      <Section>
        <div className="w-100 column">
          <ProfileItem>
            <img
              className={'w-74 h-74 mr-18'}
              src={`/assets/images/profile/${randomNumber}.svg`}
              alt={'프로필 사진'}
            />
            <Typography category={'H1'}>
              {nickName || '비어있는 닉네임'}
            </Typography>
            <ResetButton onClick={ResetNickname}>
              <img src={'/assets/images/icons/reset.svg'} alt={'Reset'} />
            </ResetButton>
          </ProfileItem>

          {/* <Divider size={'large'} /> */}
          <Link href="/likes">
            <LinkItem>
              <Typography category={'Bd4'}>좋아요</Typography>
              <div>
                <Typography category={'Bd4'}>{likeCount}</Typography>
                <img
                  className="w-12 h-12 ml-18"
                  src={'/assets/images/icons/right_black.svg'}
                  alt="right"
                />
              </div>
            </LinkItem>
          </Link>

          <Divider size={'large'} />
          <Link href="/mypage/myreviews">
            <LinkItem>
              <Typography category={'Bd4'}>내가 등록한 리뷰</Typography>
              <div>
                <Typography category={'Bd4'}>{reviewCount}</Typography>
                <img
                  className="w-12 h-12 ml-18"
                  src={'/assets/images/icons/right_black.svg'}
                  alt="right"
                />
              </div>
            </LinkItem>
          </Link>

          <Divider size={'large'} />
          <Link href="/mypage/setting">
            <LinkItem>
              <Typography category={'Bd4'}>설정</Typography>
              <img
                className="w-12 h-12 ml-18"
                src={'/assets/images/icons/right_black.svg'}
                alt="right"
              />
            </LinkItem>
          </Link>
        </div>
      </Section>

      {loading ? (
        <Absolute>
          <LoadingContainer
            text="마이페이지 데이터 불러오는 중..."
            loaded={!loading}
          />
        </Absolute>
      ) : null}
      <Navigation type={'default'} my />
    </Main>
  );
};

export default MyPage;
