import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';

import Divider from '@/components/common/divider';
import HeartButton from '@/components/common/heartButton';
import Tab from '@/components/common/tab';
import Tag from '@/components/common/tag';
import Typography from '@/components/common/typography';
import TotalDetail from '@/components/details/TotalDetail';
import { Meta } from '@/layouts/Meta';
import results from '@/lib/가게상세페이지.json';
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

const defaultResult = {
  id: -1,
  name: '',
  score: '0.0',
  address: '',
  tel: '',
  photo: '',
  url: '',
  url_name: '',
  more: '',
};

const Detail = () => {
  const router = useRouter();
  const result = results[Number(router.query.id)] || defaultResult;

  const menuList = {
    0: <TotalDetail address={result.address} more={result.more} />,
    1: <Typography> 내용 2</Typography>,
    2: <Typography> 내용 3</Typography>,
    3: <Typography> 내용 4</Typography>,
  };

  const [like, setLike] = useState(false);

  const toggleLike = () => {
    setLike(!like);
  };

  return (
    <Main
      meta={
        <Meta title="Cakestation Details" description="아이템 상세페이지" />
      }
    >
      <Styles>
        <ImageContainer photo={result.photo}>
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
              {result.score}
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
              <LeftIcon src={'/assets/images/icons/location_selected.svg'} />
              <Typography category={'Bd6'}>{result.address}</Typography>
            </div>
            <div className="row">
              <LeftIcon src={'/assets/images/icons/instagram.svg'} />
              <a href={result?.url} target={'_blank'} rel={'noreferrer'}>
                <Typography category={'Bd6'} color={'grey_700'}>
                  {result.url_name}
                </Typography>
              </a>
            </div>
            <div className="row">
              <LeftIcon src={'/assets/images/icons/call_filled.svg'} />
              <Typography category={'Bd6'}>{result.tel}</Typography>
            </div>
          </div>
        </Container>
        <Divider size={'large'} />
        <div className="tab">
          <Tab
            titles={['전체', '메뉴', '사진', '리뷰']}
            counts={[0, 0, 23, 23]}
            icons={['', '', '', '']}
            contents={menuList}
          />
        </div>
      </Styles>
    </Main>
  );
};

export default Detail;
