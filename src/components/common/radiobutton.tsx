import styled from 'styled-components';

import palette from '@/styles/palette';

import Typography from './typography';

interface IRadioButtonProps {
  value?: string;
  clicked?: boolean;
  onChange?: any;
}

const StyledLabel = styled.label`
  display: flex;

  & + & {
    margin-top: 0.5rem;
  }
`;

const HiddenRadio = styled.input<IRadioButtonProps>`
  visibility: hidden;
`;

const StyledRadioButton = styled.div<IRadioButtonProps>`
  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 14rem;
  height: 35px;

  /* Black */

  background: ${(props) =>
    props.clicked ? `${palette.black}` : `${palette.grey_200}`};
  color: ${(props) =>
    props.clicked ? `${palette.white}` : `${palette.black}`};
  border-radius: 16px;

  cursor: pointer;
`;

const RadioButton = (props: IRadioButtonProps) => {
  return (
    <StyledLabel>
      <HiddenRadio
        type="radio"
        value={props.value}
        checked={props.clicked}
        onChange={props.onChange}
      />
      <StyledRadioButton clicked={props.clicked}>
        <Typography category={'Bd3'}>{props.value}</Typography>
      </StyledRadioButton>
    </StyledLabel>
  );
};

export default RadioButton;
