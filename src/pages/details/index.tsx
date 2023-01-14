import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import Divider from '@/components/common/divider';
import HeartButton from '@/components/common/heartButton';
import Tag from '@/components/common/tag';
import Typography from '@/components/common/typography';
import DetailPage from '@/components/details/DetailPage';
import { Meta } from '@/layouts/Meta';
import Navigation from '@/layouts/Navigation';
import { AXIOS_GET } from '@/lib/commonFunction';
import { BASE_URL } from '@/lib/ConstantURL';
import { Main } from '@/templates/Main';

const Styles = styled.div`
  .icons {
    position: absolute;
    display: flex;
    width: 5.875rem;
    justify-content: space-between;
    right: 1.25rem;
  }

  .tags {
    display: flex;
    margin: 1.0625rem 0;
  }

  .info {
    display: flex;
    flex-direction: column;
    height: 4.6875rem;
    justify-content: space-between;
  }

  .tab {
    margin-top: 0.4375rem;
  }

  .infoRow {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

interface ImageProp {
  photo?: string;
}

const ImageContainer = styled.div<ImageProp>`
  width: 100%;
  height: 14.4375rem;
  background-image: url(${(props) => props.photo});
  background-size: cover;
  background-position: 50% 50%;
`;

const BackButton = styled.button`
  width: 2.625rem;
  height: 2.625rem;
  margin-left: 1.4375rem;
  margin-top: 3.5rem;
  background: none;
  border: none;
  cursor: pointer;
`;

const IconImage = styled.img`
  width: 1.625rem;
  height: 1.625rem;
  cursor: pointer;
`;

const Container = styled.div`
  padding: 1.25rem;
`;

const LeftIcon = styled.img`
  width: 1.25rem;
  height: 1.25rem;
  padding-right: 0.25rem;
`;

const Detail = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [pictureLoading, setPictureLoading] = useState<boolean>(true);
  const [result, setResult] = useState<any>();
  const [pictureResult, setPictureResult] = useState<Array<any>>([]);
  const [like, setLike] = useState(false);
  const [showBottomNav, setShowBottomNav] = useState(false);
  const router = useRouter();

  const FetchStoreInfo = async () => {
    try {
      setLoading(true);
      const response = await AXIOS_GET(
        `${BASE_URL}/api/stores/${router.query.id}`, // router.query.id
        router
      );
      setLoading(false);
      setResult(response?.data.result);
      console.log(response?.data.result);
    } catch (e) {
      setResult('');
    }
  };

  const FetchReviewPictures = async () => {
    try {
      setPictureLoading(true);
      const response = await AXIOS_GET(
        `${BASE_URL}/api/stores/${router.query.id}/reviews/image`, // router.query.id
        router
      );
      setPictureLoading(false);
      setPictureResult(response?.data.result);
      console.log(response?.data.result);
    } catch (e) {
      setPictureResult([]);
    }
  };

  const toggleLike = () => {
    setLike(!like);
  };

  const divideUrlType = (url: string) => {
    let arr = [];
    arr = url.split('/');

    if (url.includes('instagram')) {
      return `@${
        arr[arr[arr.length - 1] === '' ? arr.length - 2 : arr.length - 1]
      }`;
    }

    return `${arr[arr.length - 2]}`;
  };

  const handleScroll = useCallback((e: Event) => {
    if (typeof window !== 'object') return;
    const target = e.target as HTMLDivElement;
    const topIcons = document.getElementsByClassName('icons')[0] as HTMLElement;

    if (target.scrollTop > topIcons.offsetTop) {
      setShowBottomNav(true);
    } else {
      setShowBottomNav(false);
    }
  }, []);

  const backToPrevPage = () => {
    router.back();
  };

  useEffect(() => {
    if (!router.isReady) return;
    // console.log(router.query);

    const mainSectionElement =
      document.getElementsByClassName('main-section')[0];
    mainSectionElement?.addEventListener('scroll', handleScroll);

    FetchStoreInfo();
    FetchReviewPictures();

    // eslint-disable-next-line consistent-return
    return () => {
      mainSectionElement?.removeEventListener('scroll', handleScroll);
    };
  }, [router.isReady]);

  return (
    <Main
      meta={
        <Meta title="Cakestation Details" description="아이템 상세페이지" />
      }
    >
      <Styles>
        {!loading && result && (
          <>
            <ImageContainer
              photo={
                result.thumbnail
                  ? result.thumbnail
                  : '/assets/images/background.png'
              }
            >
              <BackButton onClick={backToPrevPage}>
                <img src={'/assets/images/icons/back.png'} alt={'뒤로가기'} />
              </BackButton>
            </ImageContainer>
            <Container>
              <div className="row">
                <Typography category={'H2'}>{result.name}</Typography>
                <div style={{ width: '0.6875rem' }}></div>
                <Tag
                  size={'small'}
                  icon={true}
                  src={'/assets/images/icons/rate_filled.svg'}
                >
                  {parseFloat(`${result.reviewScore}`).toFixed(1)}
                </Tag>
                <div className="icons">
                  <IconImage src={'/assets/images/icons/call_default.svg'} />
                  <IconImage src={'/assets/images/icons/share.svg'} />
                  <div
                    style={{
                      width: '1.625rem',
                      height: '1.625rem',
                      cursor: 'pointer',
                    }}
                  >
                    <HeartButton like={like} onClick={toggleLike} />
                  </div>
                </div>
              </div>
              <div className="tags">
                <Tag size={'small'} color={'green_500'}>
                  영업중
                </Tag>
                <div style={{ width: '0.375rem' }}></div>
                <Tag size={'small'} color={'blue_500'}>
                  역에서 132m
                </Tag>
                <div style={{ width: '0.375rem' }}></div>
                <Tag size={'small'} color={'blue_500'}>
                  도보 10분
                </Tag>
              </div>
              <div className="info">
                <div className="infoRow">
                  <LeftIcon
                    src={'/assets/images/icons/location_selected.svg'}
                  />
                  <Typography category={'Bd6'}>{result.address}</Typography>
                </div>
                <div className="infoRow">
                  <LeftIcon src={'/assets/images/icons/instagram.svg'} />
                  <a
                    href={result.webpageUrl}
                    target={'_blank'}
                    rel={'noreferrer'}
                  >
                    <Typography category={'Bd6'} color={'grey_700'}>
                      {divideUrlType(result.webpageUrl)}
                    </Typography>
                  </a>
                </div>
                <div className="infoRow">
                  <LeftIcon src={'/assets/images/icons/call_filled.svg'} />
                  <Typography category={'Bd6'}>
                    {result.phoneNumber ? result.phoneNumber : '전화번호 없음'}
                  </Typography>
                </div>
              </div>
            </Container>
            <Divider size={'large'} />
            <div className="detail">
              {!pictureLoading && (
                <DetailPage
                  address={result.address}
                  more={result.mapUrl}
                  pictureCount={pictureResult.length}
                />
              )}
            </div>
          </>
        )}
        {showBottomNav ? <Navigation type={'item'}></Navigation> : null}
      </Styles>
    </Main>
  );
};

export default Detail;
