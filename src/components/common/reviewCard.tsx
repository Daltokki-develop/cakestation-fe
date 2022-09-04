import React, { useState } from 'react';
import styled from 'styled-components';

import palette from '@/styles/palette';

import Typography from './typography';

const Card = styled.div`
  width: 90%;
  margin: 28px auto;
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 8px;
`;

const WriterInfo = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const RateImage = styled.img`
  width: 14px;
  height: 14px;
`;

const Review = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 14px;
  gap: 6px;
`;

const Pictures = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 21px;
`;

const Picture = styled.img`
  width: 32.5%;
`;

const DetailHeader = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;
`;

const DetailReview = styled.div`
  background-color: ${palette.grey_200};
  margin: 8px 0;
  padding: 15px;

  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const DetailSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

function ReviewCard() {
  const [showDetail, setShowDetail] = useState(false);

  const onClickDetail = () => {
    setShowDetail(!showDetail);
  };

  return (
    <Card>
      <CardInfo>
        <WriterInfo>
          <div>
            <Typography category={'Bd7'} color={'grey_500'}>
              궤도민수
            </Typography>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <RateImage src={'/assets/images/icons/rate_filled.svg'} />
          </div>
          <div>
            <Typography category={'Bd7'} color={'grey_500'}>
              4.5
            </Typography>
          </div>
        </WriterInfo>
        <div>
          <Typography category={'Bd7'} color={'grey_500'}>
            2022.06.28
          </Typography>
        </div>
      </CardInfo>
      <Review>
        <div>
          <Typography category={'Bd1'}>디자인도 예쁜데 맛까지 만족</Typography>
        </div>
        <div>
          <Typography category={'Bd6'}>
            여자친구 사준다고 준비했는데 완전 만족했네여 역시 전설의 달토끼케익!
            재주문의사 백퍼입니다!
          </Typography>
        </div>
      </Review>
      <Pictures>
        <Picture src={'/assets/images/test-cakestore.png'} alt="picture" />
        <Picture src={'/assets/images/test-cakestore.png'} alt="picture" />
        <Picture src={'/assets/images/test-cakestore.png'} alt="picture" />
      </Pictures>
      <div>
        <DetailHeader>
          <Typography category={'Bd6'} color={'grey_500'}>
            상세내용
          </Typography>
          <div
            style={{ display: 'flex', alignItems: 'center' }}
            onClick={onClickDetail}
          >
            <img
              src={
                showDetail
                  ? '/assets/images/icons/triangle_down.png'
                  : '/assets/images/icons/triangle_up.png'
              }
            />
          </div>
        </DetailHeader>
        {showDetail ? (
          <DetailReview>
            <DetailSection>
              <div>
                <Typography category={'Bd5'}>케익종류</Typography>
              </div>
              <div>
                <Typography category={'Bd7'}>
                  3호 초코, 바나나시트, 하트모양
                </Typography>
              </div>
            </DetailSection>
            <DetailSection>
              <div>
                <Typography category={'Bd5'}>디자인 구현도</Typography>
              </div>
              <div>
                <Typography category={'Bd7'}>좋아요</Typography>
              </div>
            </DetailSection>
          </DetailReview>
        ) : null}
      </div>
    </Card>
  );
}

export default ReviewCard;
