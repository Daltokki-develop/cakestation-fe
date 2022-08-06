import React from 'react';
import styled from 'styled-components';

import palette from '@/styles/palette';

interface IProgressBarProps {
  width: string;
}

const StyledProgressBar = styled.div<IProgressBarProps>`
  width: 100%;
  height: 3px;
  background-color: ${palette.grey_200};

  margin-bottom: 22px;

  display: flex;

  .progress {
    width: ${(props) => props.width};
    background-color: ${palette.cakeLavender_600};
    height: 100%;
  }
`;

const ProgressBar = (props: IProgressBarProps) => {
  return (
    <StyledProgressBar width={props.width}>
      <div className="progress" />
    </StyledProgressBar>
  );
};

export default ProgressBar;
