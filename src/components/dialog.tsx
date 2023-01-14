import styled from 'styled-components';

import palette from '@/styles/palette';

import Typography from './common/typography';

interface IDialogContainerProps {
  contentText: string;
  buttonText: string;
  cancelFunc: () => void;
  confirmFunc: () => void;
}

const StyledDialogBackground = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  z-index: 105;
`;

const StyledDialogBackColor = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: ${palette.black};
  opacity: 0.4;

  z-index: 105;
`;

const StyledDialogContainer = styled.div`
  width: 70%;
  min-height: 12rem;
  height: fit-content;
  background-color: ${palette.white};
  border-radius: 1rem;

  display: flex;
  flex-direction: column;

  justify-content: space-between;
  align-items: center;

  padding: 1.8rem 1.5rem;

  z-index: 106;
`;

const CancelButton = styled.div`
  /* position: absolute; */
  width: 100%;
  height: fit-content;

  display: flex;
  justify-content: flex-end;

  img {
    width: 2.3rem;
    height: 2.3rem;
  }
`;

const StyledDialogButton = styled.div`
  width: 100%;
  height: 3.5rem;
  background-color: ${palette.cakeLavender_600};
  border-radius: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 106;

  cursor: pointer;
`;

const DialogContainer = (props: IDialogContainerProps) => {
  return (
    <StyledDialogBackground>
      <StyledDialogBackColor />
      <StyledDialogContainer>
        <CancelButton onClick={props.cancelFunc}>
          <img src={'/assets/images/icons/close.svg'} alt={'Close'} />
        </CancelButton>
        <Typography category="H5" color="black">
          {props.contentText}
        </Typography>
        <StyledDialogButton onClick={props.confirmFunc}>
          <Typography category="Bd3" color="white">
            {props.buttonText}
          </Typography>
        </StyledDialogButton>
      </StyledDialogContainer>
    </StyledDialogBackground>
  );
};

export default DialogContainer;
