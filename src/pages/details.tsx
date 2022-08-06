import React from 'react';
import styled from 'styled-components';

import Divider from '@/components/common/divider';
import Tab from '@/components/common/tab';
import Tag from '@/components/common/tag';
import Typography from '@/components/common/typography';
import { Meta } from '@/layouts/Meta';
import palette from '@/styles/palette';
import { Main } from '@/templates/Main';

const menuList = {
  0: <Typography> 내용 1</Typography>,
  1: <Typography> 내용 2</Typography>,
  2: <Typography> 내용 3</Typography>,
  3: <Typography> 내용 4</Typography>,
};

const Styles = styled.div`
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

const ImageContainer = styled.div`
  width: 100%;
  height: 14.4375rem;
  background-color: ${palette.black};
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

const Details = () => (
  <Main
    meta={<Meta title="Cakestation Details" description="아이템 상세페이지" />}
  >
    <Styles>
      <ImageContainer>
        <BackButton>
          <InnerImage src={'/assets/images/icons/left_white.svg'} />
        </BackButton>
      </ImageContainer>
      <Container>
        <div className="row">
          <Typography category={'H2'}>달토끼 케이크</Typography>
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
          <Typography category={'Bd6'}>
            서울 서초구 방배로26길 22 1층
          </Typography>
          <Typography category={'Bd6'}>@dal_cake</Typography>
          <Typography category={'Bd6'}>010-3293-9292</Typography>
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

export default Details;
