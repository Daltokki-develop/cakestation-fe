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
// import results from '@/lib/가게상세페이지.json';
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

// const defaultResult = {
//   id: -1,
//   name: '',
//   score: '0.0',
//   address: '',
//   tel: '',
//   photo: '',
//   url: '',
//   url_name: '',
//   more: '',
// };

const Detail = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [result, setResult] = useState<any>();
  const [like, setLike] = useState(false);
  const [showBottomNav, setShowBottomNav] = useState(false);
  const router = useRouter();
  // const staticResult = results[Number(router.query.id)] || defaultResult;

  const FetchStoreInfo = async () => {
    try {
      setLoading(true);
      const response = await AXIOS_GET(`${BASE_URL}/api/stores/${1}`, router);
      setLoading(false);
      setResult(response?.data.result);
      console.log(response?.data.result);
    } catch (e) {
      setResult('');
    }
  };

  const toggleLike = () => {
    setLike(!like);
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

  useEffect(() => {
    FetchStoreInfo();
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
    <Main
      meta={
        <Meta title="Cakestation Details" description="아이템 상세페이지" />
      }
    >
      <Styles>
        {!loading && result && (
          <>
            <ImageContainer photo={result.thumbnail}>
              <BackButton>
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
                <div className="row">
                  <LeftIcon
                    src={'/assets/images/icons/location_selected.svg'}
                  />
                  <Typography category={'Bd6'}>{result.address}</Typography>
                </div>
                <div className="row">
                  <LeftIcon src={'/assets/images/icons/instagram.svg'} />
                  <a
                    href={result.webpageUrl}
                    target={'_blank'}
                    rel={'noreferrer'}
                  >
                    <Typography category={'Bd6'} color={'grey_700'}>
                      {result.webpageUrl}
                    </Typography>
                  </a>
                </div>
                <div className="row">
                  <LeftIcon src={'/assets/images/icons/call_filled.svg'} />
                  <Typography category={'Bd6'}>{result.phoneNumber}</Typography>
                </div>
              </div>
            </Container>
            <Divider size={'large'} />
            <div className="detail">
              <DetailPage address={result.address} more={result.mapUrl} />
            </div>
          </>
        )}
        {showBottomNav ? <Navigation type={'item'}></Navigation> : null}
      </Styles>
    </Main>
  );
};

export default Detail;
