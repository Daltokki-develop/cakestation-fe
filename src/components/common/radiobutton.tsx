import styled from 'styled-components';

import palette from '@/styles/palette';

interface IDistanceButtonProps {
  clicked?: boolean;
}

const RadioButton = styled.div<IDistanceButtonProps>`
  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 224px;
  height: 35px;

  /* Black */

  background: ${(props) =>
    props.clicked ? `${palette.black}` : `${palette.grey_200}`};
  color: ${(props) =>
    props.clicked ? `${palette.white}` : `${palette.black}`};
  border-radius: 16px;

  cursor: pointer;

  & + & {
    margin-top: 10px;
  }
`;

export default RadioButton;
