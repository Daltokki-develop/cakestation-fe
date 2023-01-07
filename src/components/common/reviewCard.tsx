import 'swiper/css';

import dayjs from 'dayjs';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';

import palette from '@/styles/palette';

import Typography from './typography';

interface IReviewCardProps {
  username?: string;
  cakeNumber?: number;
  score?: number;
  sheetType?: string;
  requestOption?: string;
  reviewImages?: string[];
  tags?: string[];
  content?: string;
  createdDateTime?: string;
}

const Card = styled.div`
  width: 90%;
  height: fit-content;
  margin: 24px auto;
`;

const CardWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding-bottom: 72px;
`;

const PostInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 15px;
`;

const RateInfo = styled.div`
  display: flex;
  padding-bottom: 12px;
  gap: 6px;
`;

const Rate = styled.img`
  width: 22px;
  height: 22px;
`;

const SummaryInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 16px;
`;

const Summary = styled.div`
  display: flex;
`;

const SummaryTitle = styled.div`
  width: 20%;
`;

const ReviewImage = styled.img`
  position: relative;
  width: 400px;
  height: 400px;
  object-fit: cover;
  margin-bottom: 16px;
`;

const ImageNumberChip = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;

  display: flex;
  width: 52px;
  height: 30px;

  justify-content: center;
  align-items: center;

  background-color: ${palette.black};
  border-radius: 16px;
  z-index: 30;
`;

const Content = styled.div`
  min-height: 80px;
  padding-bottom: 16px;
`;

const EditBox = styled.div`
  position: absolute;
  right: 0;

  display: flex;
  gap: 7px;
`;

const ReviewCard = (props: IReviewCardProps) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const setRateImage = (score: any) => {
    const arr = [];
    const integer = score / 1;
    const decimal = score - integer;

    for (let i = 0; i < integer; i += 1) {
      arr.push(
        <Rate
          key={`${i} integer`}
          src={'/assets/images/icons/rate_filled.svg'}
          alt={'별점'}
        />
      );
    }

    if (decimal !== 0) {
      arr.push(
        <Rate
          key={'half'}
          src={'/assets/images/icons/rate_half-filled.svg'}
          alt={'별점'}
        />
      );
    }

    if (arr.length < 5) {
      for (let i = arr.length; i < 5; i += 1) {
        arr.push(
          <Rate
            key={`${i} empty`}
            src={'/assets/images/icons/rate_empty.svg'}
            alt={'별점'}
          />
        );
      }
    }

    return arr;
  };

  const tagConverter = (tag: string) => {
    switch (tag) {
      case 'KIND':
        return '“ 직원이 친절해요 “';
      case 'CLOSE':
        return '“ 역과 가까워요 “';
      case 'GOOD_RESERVATION':
        return '“ 예약이 편해요 “';
      case 'CHEAP':
        return '“ 가격이 저렴해요 “';
      case 'DELICIOUS':
        return '“ 케잌이 맛있어요 “';
      default:
        return '한줄평 없음';
    }
  };

  const setTag = (tags: any[]) => {
    const arr = [];

    for (let i = 0; i < tags.length; i += 1) {
      arr.push(tagConverter(tags[i]));

      if (i !== tags.length - 1) {
        arr.push(', ');
      }
    }

    return arr;
  };

  return (
    <Card>
      <CardWrapper>
        <PostInfo>
          <div>
            <Typography category={'Bd5'} color={'grey_800'}>
              {props.username}
            </Typography>
          </div>
          <div>
            <Typography category={'Bd5'} color={'grey_500'}>
              {dayjs(props.createdDateTime).format('YYYY.MM.DD')}
            </Typography>
          </div>
        </PostInfo>
        <RateInfo>
          <div>{setRateImage(props.score)}</div>
          <div>
            <Typography category={'Bd5'} color={'grey_800'}>
              {`${props.score}점`}
            </Typography>
          </div>
        </RateInfo>
        <SummaryInfo>
          <Summary>
            <SummaryTitle>
              <Typography category={'Bd5'} color={'grey_400'}>
                주문내용
              </Typography>
            </SummaryTitle>
            <div>
              <Typography category={'Bd5'} color={'grey_500'}>
                {`${props.cakeNumber ? `${props.cakeNumber}호` : '1호'} | ${
                  props.sheetType ? `${props.sheetType} 시트` : '플레인 시트'
                } | ${
                  props.requestOption
                    ? `${props.requestOption} 옵션`
                    : '추가 옵션 없음'
                }`}
              </Typography>
            </div>
          </Summary>
          <Summary>
            <SummaryTitle>
              <Typography category={'Bd5'} color={'grey_400'}>
                한줄평
              </Typography>
            </SummaryTitle>
            <div>
              <Typography category={'Bd5'} color={'grey_500'}>
                {props.tags && props.tags.length > 0 && setTag(props.tags)}
              </Typography>
            </div>
          </Summary>
        </SummaryInfo>
        {props.reviewImages && props.reviewImages.length > 0 && (
          <>
            <Swiper
              className="reviewImageSwiper"
              spaceBetween={50}
              slidesPerView={1}
              onSlideChange={(swiper) => setSlideIndex(swiper.activeIndex)}
            >
              {props.reviewImages.map((image: any, index: React.Key) => {
                return (
                  <SwiperSlide key={index}>
                    <ReviewImage src={image} alt="picture" />
                  </SwiperSlide>
                );
              })}
              <ImageNumberChip>
                <Typography category={'Bd9'} color={'white'}>
                  {`${slideIndex + 1} / ${props.reviewImages.length}`}
                </Typography>
              </ImageNumberChip>
            </Swiper>
          </>
        )}
        {props.content && (
          <Content>
            <Typography category={'Bd5'} color={'grey_800'}>
              {props.content}
            </Typography>
          </Content>
        )}
        <EditBox>
          <div>
            <Typography category={'Bd5'} color={'red_500'}>
              삭제하기
            </Typography>
          </div>
          <div>
            <Typography category={'Bd5'} color={'grey_500'}>
              편집하기
            </Typography>
          </div>
        </EditBox>
      </CardWrapper>
    </Card>
  );
};

export default ReviewCard;
