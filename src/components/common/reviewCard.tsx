import styled from 'styled-components';

import palette from '@/styles/palette';

import Typography from './typography';

const Card = styled.div`
  width: 90%;
  height: fit-content;
  margin: 24px auto;
`;

const CardWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding-bottom: 46px;
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

const ReviewImage = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 95%;
  background-color: ${palette.grey_200};
  margin-bottom: 16px;
`;

const ImageNumberChip = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;

  display: flex;
  width: 42px;
  height: 30px;

  justify-content: center;
  align-items: center;

  background-color: ${palette.black};
  border-radius: 16px;
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

function ReviewCard() {
  return (
    <Card>
      <CardWrapper>
        <PostInfo>
          <div>
            <Typography category={'Bd5'} color={'grey_800'}>
              다리세개공룡
            </Typography>
          </div>
          <div>
            <Typography category={'Bd5'} color={'grey_500'}>
              2022.09.15
            </Typography>
          </div>
        </PostInfo>
        <RateInfo>
          <div>
            <Rate
              src={'/assets/images/icons/rate_filled.svg'}
              alt={'메뉴사진'}
            />
            <Rate
              src={'/assets/images/icons/rate_filled.svg'}
              alt={'메뉴사진'}
            />
            <Rate
              src={'/assets/images/icons/rate_filled.svg'}
              alt={'메뉴사진'}
            />
            <Rate
              src={'/assets/images/icons/rate_filled.svg'}
              alt={'메뉴사진'}
            />
          </div>
          <div>
            <Typography category={'Bd5'} color={'grey_800'}>
              4점
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
                케잌 호수 | 시트 종류 | 추가 옵션
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
                “ 직원이 친절해요 ”, “ 예약이 편해요 ”
              </Typography>
            </div>
          </Summary>
        </SummaryInfo>
        <ReviewImage>
          <ImageNumberChip>
            <Typography category={'Bd9'} color={'white'}>
              1 / 2
            </Typography>
          </ImageNumberChip>
        </ReviewImage>
        <Content>
          <div>
            <Typography category={'Bd5'} color={'grey_800'}>
              디자인 구현도
            </Typography>
          </div>
          <Typography category={'Bd5'} color={'grey_800'}>
            주문내용
          </Typography>
        </Content>
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
}

export default ReviewCard;
