import ClipLoader from 'react-spinners/ClipLoader';
import styled from 'styled-components';

import palette from '@/styles/palette';

import Typography from './common/typography';

interface ILoadingContainerProps {
  text: string;
  loaded: boolean;
}

const StyledLoadingContainer = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${palette.black};
  opacity: 0.5;

  z-index: 105;

  .loading-icon {
    margin-bottom: 4px;
  }
`;

const LoadingContainer = (props: ILoadingContainerProps) => {
  return (
    <StyledLoadingContainer>
      <div className="loading-icon">
        <ClipLoader color={palette.white} loading={!props.loaded} size={30} />
      </div>
      <Typography category="Bd5" color="white">
        {props.text}
      </Typography>
    </StyledLoadingContainer>
  );
};

export default LoadingContainer;
