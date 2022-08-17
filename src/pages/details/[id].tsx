import { useRouter } from 'next/router';
import styled from 'styled-components';

import Divider from '@/components/common/divider';
import Tab from '@/components/common/tab';
import Tag from '@/components/common/tag';
import Typography from '@/components/common/typography';
import TotalDetail from '@/components/details/TotalDetail';
import { Meta } from '@/layouts/Meta';
import Navigation from '@/layouts/Navigation';
import results from '@/lib/가게상세페이지.json';
import { Main } from '@/templates/Main';

const Styles = styled.div`
  .pb-80 {
    padding-bottom: 5rem;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  .icons {
    position: absolute;
    display: flex;
    width: 3.9375rem;
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
  width: 1.25rem;
  height: 1.25rem;
  margin-left: 1.4375rem;
  margin-top: 3.5rem;
  background: none;
  border: none;
`;

const InnerImage = styled.img`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  padding: 1.25rem;
`;

const IconButton = styled.button`
  width: 1.625rem;
  height: 1.625rem;
  background: none;
  border: none;
`;

const LeftIcon = styled.img`
  width: 1.25rem;
  height: 1.25rem;
  padding-right: 0.25rem;
`;

const RightIcon = styled.button`
  width: 1.25rem;
  height: 1.25rem;
  margin-left: 0.25rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const defaultResult = {
  id: -1,
  name: '',
  address: '',
  tel: '',
  photo: '',
  url: '',
  url_name: '',
  more: '',
};

const Detail = () => {
  // useRouter 사용하여 라우팅 기능 사용하기
  const router = useRouter();
  const result = results[Number(router.query.id)] || defaultResult;

  const menuList = {
    0: <TotalDetail address={result.address} more={result.more} />,
    1: <Typography> 내용 2</Typography>,
    2: <Typography> 내용 3</Typography>,
    3: <Typography> 내용 4</Typography>,
  };

  // router.query로 uri 매개변수 id 받아오기
  return (
    <Main
      meta={
        <Meta title="Cakestation Details" description="아이템 상세페이지" />
      }
    >
      <Styles>
        <div className="pb-80">
          <ImageContainer photo={result.photo}>
            <BackButton>
              <InnerImage src={'/assets/images/icons/left_white.svg'} />
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
                4.0
              </Tag>
              <div className="icons">
                <IconButton>
                  <InnerImage src={'/assets/images/icons/share.svg'} />
                </IconButton>
                <IconButton>
                  <InnerImage src={'/assets/images/icons/heart_empty.svg'} />
                </IconButton>
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
                <RightIcon>
                  <img src={'/assets/images/icons/copy.svg'} />
                </RightIcon>
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
          <Navigation type={'item'} />
        </div>
      </Styles>
    </Main>
  );
};

export default Detail;
