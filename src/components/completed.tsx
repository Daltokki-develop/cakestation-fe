import styled from 'styled-components';

import Typography from './common/typography';

interface ICompletedProps {
  text: string;
}

const StyledCompleted = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #000000be;
  z-index: 101;

  .inner {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const Completed = (props: ICompletedProps) => {
  return (
    <StyledCompleted>
      <div className="inner">
        <Typography category={'H1'} color={'white'}>
          {props.text}
        </Typography>
        <img
          className="mt-79"
          src={'/assets/images/completed.svg'}
          alt="completed"
        />
      </div>
    </StyledCompleted>
  );
};

export default Completed;
