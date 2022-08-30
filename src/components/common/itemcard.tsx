import React from 'react';
import styled from 'styled-components';

import palette from '@/styles/palette';

import Typography from './typography';

interface IItemCardProps {
  line?: boolean;
  title: string;
  icon?: string;
  rate?: string;
  count?: number;
  distance?: string;
  pictures?: string[];
  heart?: boolean;
  // simplecard
  isSimple?: boolean;
  location?: string;
  onClick?: () => void;
}

interface IStyledItemCardProps {
  line?: boolean;
  isSimple?: boolean;
}

const StyledItemCard = styled.div<IStyledItemCardProps>`
  width: ${(props) => (props.isSimple ? 'calc(100% - 2rem)' : '100%')};
  border: ${(props) =>
    props.line ? `.0625rem solid ${palette.black}` : 'none'};
  border-radius: ${(props) => (props.line ? '1rem' : 0)};
  padding: ${(props) => (props.isSimple ? '1rem' : '1.5rem 0 0')};

  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isSimple ? 'flex-start' : 'normal')};

  background-color: ${palette.white};
  overflow: hidden;

  cursor: pointer;

  &:hover {
    background-color: ${palette.grey_100};
  }

  & + & {
    margin-top: 10px;
  }
`;

const ItemCardHeader = styled.div`
  width: calc(100% - 2.5rem);
  padding: 0 1.25rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.9375rem;
`;

const ItemCardTitle = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemCardDesc = styled.div`
  margin-top: 0.375rem;
  display: flex;
  align-items: center;
`;

const RateImage = styled.img`
  width: 1.0625rem;
  height: 1.0625rem;
  margin-right: 0.125rem;
`;

const RateText = styled.span`
  margin-right: 0.125rem;
`;

const CountText = styled.span`
  margin-right: 0.8125rem;
`;

const HeartImage = styled.img`
  width: 2.5rem;
  height: 2.5rem;
`;

const Pictures = styled.div`
  width: 100%;
  display: flex;
`;

const Picture = styled.img`
  width: 25%;
`;

const EmptyPicture = styled.div`
  width: 25%;
  background-color: ${palette.grey_200};
`;

const AddEmptyPicture = (props: IItemCardProps) => {
  const pictureArray = [];
  const picSize = props.pictures?.length || 0;
  for (let index = 0; index < 4 - picSize; index += 1)
    pictureArray.push(<EmptyPicture key={index} />);
  return pictureArray;
};

const ItemCard = (props: IItemCardProps) => {
  return (
    <StyledItemCard
      isSimple={props.isSimple}
      line={props.line}
      onClick={props.onClick}
    >
      {props.isSimple ? (
        <>
          <Typography category={'Bd1'} color={'grey_800'}>
            {props.title}
          </Typography>
          <Typography category={'Bd7'} color={'grey_800'}>
            {props.location}
          </Typography>
        </>
      ) : (
        <>
          <ItemCardHeader>
            <ItemCardTitle>
              <Typography category={'Bd1'} color={'grey_800'}>
                {props.title}
              </Typography>
              <ItemCardDesc>
                <RateImage
                  src="/assets/images/icons/rate_filled.svg"
                  alt="rate"
                />

                <RateText>
                  <Typography category={'Bd7'} color={'grey_800'}>
                    {props.rate}
                  </Typography>
                </RateText>
                <CountText>
                  <Typography category={'Bd7'} color={'grey_400'}>
                    ({props.count})
                  </Typography>
                </CountText>
                {props.distance && (
                  <span>
                    <Typography category={'Bd6'} color={'blue_500'}>
                      {props.distance}
                    </Typography>
                  </span>
                )}
              </ItemCardDesc>
            </ItemCardTitle>
            {props.heart && (
              <div>
                <HeartImage
                  src="/assets/images/icons/heart_color-filled.svg"
                  alt="heart"
                />
              </div>
            )}
          </ItemCardHeader>
          <Pictures>
            {props.pictures?.map((picture, index) => {
              return (
                <Picture
                  key={index}
                  src={`/assets/images/${picture}`}
                  alt="picture"
                />
              );
            })}
            {AddEmptyPicture(props)}
          </Pictures>
        </>
      )}
    </StyledItemCard>
  );
};

export default ItemCard;
