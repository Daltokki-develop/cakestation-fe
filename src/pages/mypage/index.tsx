import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Divider from '@/components/common/divider';
import Section from '@/components/common/section';
import Typography from '@/components/common/typography';
import { Header } from '@/layouts/Header';
import { Meta } from '@/layouts/Meta';
import Navigation from '@/layouts/Navigation';
import { AXIOS_GET } from '@/lib/commonFunction';
import { BASE_URL } from '@/lib/ConstantURL';
import palette from '@/styles/palette';
import { Main } from '@/templates/Main';

const VerticalBar = styled.div`
  width: 2px;
  height: 55.5px;
  background-color: ${palette.grey_300};
`;

const MyPage = () => {
  const [myData, setMyData] = useState({
    nickName: null,
    reviewCount: 0,
    reviewImageCount: 0,
    likeCount: 0,
  });

  const FetchMyData = async () => {
    try {
      const response = await AXIOS_GET(`${BASE_URL}/api/mypage`);
      if (response?.status === 200) {
        const fetchData = response?.data.result;
        setMyData(fetchData);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    FetchMyData();
  }, []);

  return (
    <Main meta={<Meta title="Cakestation Review" description="마이페이지" />}>
      <Header style={'text'}>마이페이지</Header>
      <Section>
        <div className="w-100 column">
          <div className="flex items-center mt-16 pl-18">
            <img
              className={'w-74 h-74 mr-18'}
              src={'/assets/images/profile/0.svg'}
              alt={'프로필 사진'}
            />
            <Typography category={'H1'}>
              {myData.nickName || '비어있는 닉네임'}
            </Typography>
          </div>
          <div className="mt-34 pl-18 pr-18 column">
            <Typography category={'Bd4'}>활동</Typography>
            <div className="flex contents-space-between mt-5 mb-22 pl-86 pr-86">
              <div className="column">
                <img
                  className="w-40 h-40"
                  src={'/assets/images/icons/rate_mypage.svg'}
                  alt="rate"
                />
                <Typography category={'Bd5'} color={'grey_500'}>
                  리뷰 {myData.reviewCount}
                </Typography>
              </div>
              <VerticalBar />
              <div className="column">
                <img
                  className="w-40 h-40"
                  src={'/assets/images/icons/photo_mypage.svg'}
                  alt="photo"
                />
                <Typography category={'Bd5'} color={'grey_500'}>
                  사진 {myData.reviewImageCount}
                </Typography>
              </div>
            </div>
          </div>
          <Divider size={'large'} />
          <div className="h-68 flex items-center contents-space-between pl-18 pr-18">
            <Typography category={'Bd4'}>좋아요</Typography>
            <div>
              <Typography category={'Bd4'}>{myData.likeCount}</Typography>
              <img
                className="w-12 h-12 ml-18"
                src={'/assets/images/icons/right_black.svg'}
                alt="right"
              />
            </div>
          </div>
          <Divider size={'large'} />
          <div className="h-68 flex items-center contents-space-between pl-18 pr-18">
            <Typography category={'Bd4'}>내가 등록한 리뷰</Typography>
            <div>
              <Typography category={'Bd4'}>{myData.reviewCount}</Typography>
              <img
                className="w-12 h-12 ml-18"
                src={'/assets/images/icons/right_black.svg'}
                alt="right"
              />
            </div>
          </div>
          <Divider size={'large'} />
          <div className="h-68 flex items-center contents-space-between pl-18 pr-18">
            <Typography category={'Bd4'}>설정</Typography>
            <img
              className="w-12 h-12 ml-18"
              src={'/assets/images/icons/right_black.svg'}
              alt="right"
            />
          </div>
        </div>
      </Section>

      <Navigation type={'default'} />
    </Main>
  );
};

export default MyPage;
