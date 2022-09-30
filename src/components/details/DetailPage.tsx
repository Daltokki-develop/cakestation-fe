import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import palette from '@/styles/palette';

import Button from '../common/button';
import Divider from '../common/divider';
import ReviewCard from '../common/reviewCard';
import Tag from '../common/tag';
import Typography from '../common/typography';
import MapforDetails from './MapforDetails';

const Tab = styled.div`
  width: 100%;
  height: 3rem;
  background-color: ${palette.white};

  position: sticky;
  top: 0;
  z-index: 50;
`;

const TabTitles = styled.ul`
  display: flex;
  list-style: none;
  justify-content: space-around;
  align-items: center;
  background-color: ${palette.white};
`;

const StyledNumber = styled.span`
  line-height: 1.25rem;
  margin-left: 0.25rem;
`;

const TitleList = styled.li`
  display: flex;
  align-content: center;
  padding: 13px 0px;
  cursor: pointer;

  &.active {
    border-bottom: 4px solid ${palette.cakeLavender_700};
  }
`;

const ContentList = styled.li`
  height: fit-content;
`;

const StyledTitle = styled.div`
  padding-top: 24px;
  padding-bottom: 20px;
  padding-left: 20px;

  display: flex;
`;

const StyledSubTitle = styled.div`
  padding: 24px 0;
  padding-left: 20px;
`;

const MapContainer = styled.div`
  position: relative;
  margin: 0 auto;
  width: 90%;
  height: 200px;
  background-color: black;
`;

const StyledText = styled.div`
  padding-top: 16px;
  padding-bottom: 24px;
  padding-left: 16px;
`;

const ButtonArea = styled.div`
  position: absolute;
  z-index: 10;
  bottom: 0.875rem;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  width: 10.8125rem;
  margin: 0 auto;
`;

const CakeSizeList = styled.div`
  width: 90%;
  height: 68px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CakeSelectGuide = styled.div`
  width: 90%;
  padding-bottom: 85%;
  background-color: ${palette.grey_200};
  margin: 0 auto;
  margin-bottom: 16px;
`;

const CakeFlavorList = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 16px;
`;

const MoreIcon = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 23px;
  text-align: center;
  margin: auto;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Pictures = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Picture = styled.img`
  width: 32.5%;
`;

const ReviewBoard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 24px;
  margin: 0 auto;

  width: 327px;
  height: 132px;

  background-color: ${palette.cakeLavender_100};
  border-radius: 16px;
`;

const ReviewBoardTitle = styled.div`
  width: 56px;
  height: 26px;
  background-color: ${palette.cakeLavender_400};
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

function DetailPage({ address, more }: { address: string; more: string }) {
  const [activeId, setActiveId] = useState(0);
  const TAB_HEIGHT = 49.2;

  function setContentsHeight() {
    if (typeof window !== 'object') return;
    const contentHeights = [0, 0, 0, 0];

    const elementAll = document.getElementsByClassName(
      'store-all'
    )[0] as HTMLElement | null;
    if (elementAll) {
      contentHeights[0] = elementAll.offsetTop - TAB_HEIGHT;
    }

    const elementMenu = document.getElementsByClassName(
      'store-menu'
    )[0] as HTMLElement | null;
    if (elementMenu) {
      contentHeights[1] = elementMenu.offsetTop - TAB_HEIGHT;
    }

    const elementPicture = document.getElementsByClassName(
      'store-picture'
    )[0] as HTMLElement | null;
    if (elementPicture) {
      contentHeights[2] = elementPicture.offsetTop - TAB_HEIGHT;
    }

    const elementReview = document.getElementsByClassName(
      'store-review'
    )[0] as HTMLElement | null;
    if (elementReview) {
      contentHeights[3] = elementReview.offsetTop - TAB_HEIGHT;
    }

    // eslint-disable-next-line consistent-return
    return contentHeights;
  }

  const moveToTarget = (idx: number) => {
    if (typeof window !== 'object') return;
    const mainSectionElement =
      document.getElementsByClassName('main-section')[0];
    const targetHeight = setContentsHeight();

    if (mainSectionElement && targetHeight) {
      mainSectionElement.scrollTo({
        top: targetHeight[idx],
        behavior: 'auto',
      });
    }
    setActiveId(idx);
  };

  const HandleMapButton = () => {
    window.open(more);
  };

  const handleScroll = useCallback((e: Event) => {
    const target = e.target as HTMLDivElement;
    // console.log(target.scrollTop);
    const contentHeights = setContentsHeight();
    contentHeights?.map(function (value, index) {
      if (target.scrollTop + 1 > value) {
        return setActiveId(index);
      }
      return null;
    });
  }, []);

  useEffect(() => {
    const mainSectionElement =
      document.getElementsByClassName('main-section')[0];

    mainSectionElement?.addEventListener('scroll', handleScroll);
    return () => {
      mainSectionElement?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <Tab className="fixedTitle">
        <TabTitles className="tab-contents">
          <TitleList
            className={`${activeId === 0 ? 'all active' : 'all'}`}
            onClick={() => moveToTarget(0)}
          >
            <Typography
              category={'Bd1'}
              color={`${activeId === 0 ? 'cakeLavender_700' : 'black'}`}
            >
              전체
            </Typography>
          </TitleList>
          <TitleList
            className={`${activeId === 1 ? 'menu active' : 'menu'}`}
            onClick={() => moveToTarget(1)}
          >
            <Typography
              category={'Bd1'}
              color={`${activeId === 1 ? 'cakeLavender_700' : 'black'}`}
            >
              메뉴
            </Typography>
          </TitleList>
          <TitleList
            className={`${activeId === 2 ? 'picture active' : 'picture'}`}
            onClick={() => moveToTarget(2)}
          >
            <Typography
              category={'Bd1'}
              color={`${activeId === 2 ? 'cakeLavender_700' : 'black'}`}
            >
              사진
            </Typography>
            <Typography category={'Bd8'} color={'grey_500'}>
              <StyledNumber>23</StyledNumber>
            </Typography>
          </TitleList>
          <TitleList
            className={`${activeId === 3 ? 'review active' : 'review'}`}
            onClick={() => moveToTarget(3)}
          >
            <Typography
              category={'Bd1'}
              color={`${activeId === 3 ? 'cakeLavender_700' : 'black'}`}
            >
              리뷰
            </Typography>
            <Typography category={'Bd8'} color={'grey_500'}>
              <StyledNumber>23</StyledNumber>
            </Typography>
          </TitleList>
        </TabTitles>
        <Divider size={'small'} />
      </Tab>
      <ul className="tab-contents">
        <ContentList className="store-all">
          <StyledTitle>
            <Typography category={'H2'} color={'black'}>
              오시는 길
            </Typography>
          </StyledTitle>
          <MapContainer>
            <MapforDetails searchAddress={address} />
            <ButtonArea>
              <ButtonWrapper>
                <Button
                  size={'small'}
                  category={'primary'}
                  disabled={false}
                  onClick={HandleMapButton}
                >
                  카카오맵에서 위치 열기
                </Button>
              </ButtonWrapper>
            </ButtonArea>
          </MapContainer>
          <StyledText>
            <Typography category={'Bd6'} color={'grey_700'}>
              {address}
            </Typography>
          </StyledText>
        </ContentList>
        <Divider size={'large'} />
        <ContentList className="store-menu">
          <StyledTitle>
            <Typography category={'H2'} color={'black'}>
              케이크 호수 및 가격
            </Typography>
          </StyledTitle>
          <div>
            <CakeSizeList>
              <div>
                <Typography category={'Bd1'} color={'cakeLavender_800'}>
                  케이크호수
                </Typography>
              </div>
              <div>
                <Typography category={'Bd1'} color={'grey_800'}>
                  32000~
                </Typography>
              </div>
            </CakeSizeList>
            <CakeSizeList>
              <div>
                <Typography category={'Bd1'} color={'cakeLavender_800'}>
                  1호
                </Typography>
              </div>
              <div>
                <Typography category={'Bd1'} color={'grey_800'}>
                  32000~
                </Typography>
              </div>
            </CakeSizeList>
            <CakeSizeList>
              <div>
                <Typography category={'Bd1'} color={'cakeLavender_800'}>
                  2호
                </Typography>
              </div>
              <div>
                <Typography category={'Bd1'} color={'grey_800'}>
                  32000~
                </Typography>
              </div>
            </CakeSizeList>
          </div>
          <StyledSubTitle>
            <Typography category={'H3'} color={'black'}>
              케이크 선택 가이드
            </Typography>
          </StyledSubTitle>
          <CakeSelectGuide />
          <StyledSubTitle>
            <Typography category={'H3'} color={'black'}>
              케이크 맛
            </Typography>
          </StyledSubTitle>
          <CakeFlavorList>
            <Tag size={'large'} color={'black'}>
              바닐라 빵 + 크림치즈 생크림
            </Tag>
            <Tag size={'large'} color={'black'}>
              초코빵 + 오레오 크림
            </Tag>
            <Tag size={'large'} color={'black'}>
              얼그레이 빵 + 일반 생크림
            </Tag>
            <Tag size={'large'} color={'black'}>
              얼그레이 빵
            </Tag>
          </CakeFlavorList>
        </ContentList>
        <Divider size={'large'} />
        <ContentList className="store-picture">
          <StyledTitle>
            <Typography category={'H2'} color={'black'}>
              리뷰사진
            </Typography>
            <MoreIcon>
              <img
                src={'/assets/images/icons/right_black.svg'}
                alt={'더보기'}
              />
            </MoreIcon>
          </StyledTitle>
          <Pictures>
            <Picture src={`/assets/images/test-cakestore.png`} alt="picture" />
            <Picture src={`/assets/images/test-cakestore.png`} alt="picture" />
            <Picture src={`/assets/images/test-cakestore.png`} alt="picture" />
          </Pictures>
        </ContentList>
        <Divider size={'large'} />
        <ContentList className="store-review">
          <StyledTitle>
            <Typography category={'H2'} color={'black'}>
              리뷰
            </Typography>
          </StyledTitle>
          <ReviewBoard>
            <div
              className="column"
              style={{ alignItems: 'center', gap: '8px' }}
            >
              <ReviewBoardTitle>
                <Typography category={'Bd9'}>별점평균</Typography>
              </ReviewBoardTitle>
              <img
                src="/assets/images/icons/rate_filled.svg"
                alt="rate"
                style={{ width: '20px', height: '20px' }}
              />
              <div>
                <Typography category={'Bd1'}>4.5</Typography>
              </div>
            </div>
            <div></div>
          </ReviewBoard>
          <div>최신순</div>
          <Divider size={'small'} />
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
        </ContentList>
      </ul>
    </div>
  );
}

export default DetailPage;
