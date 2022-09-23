import React from 'react';
import styled from 'styled-components';

import palette from '@/styles/palette';

import Typography from './typography';

interface ISimpleCardProps {
  line?: boolean;
  title: string;
  location: string;
  onClick?: () => void;
}

interface IStyledSimpleCardProps {
  line?: boolean;
}

const StyledSimpleCard = styled.div<IStyledSimpleCardProps>`
  width: calc(100% - 2rem);
  padding: 1rem;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  background-color: ${palette.white};
  overflow: hidden;

  cursor: pointer;

  &:hover {
    background-color: ${palette.grey_100};
  }
`;

const SimpleCard = (props: ISimpleCardProps) => {
  return (
    <StyledSimpleCard line={props.line} onClick={props.onClick}>
      <Typography category={'Bd1'} color={'grey_800'}>
        {props.title}
      </Typography>
      <Typography category={'Bd7'} color={'grey_800'}>
        {props.location}
      </Typography>
    </StyledSimpleCard>
  );
};

export default SimpleCard;
