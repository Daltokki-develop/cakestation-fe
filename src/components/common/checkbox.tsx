import { useState } from 'react';
import styled from 'styled-components';

import palette from '@/styles/palette';

import Typography from './typography';

interface ICheckBoxProps {
  value?: string;
  checked?: boolean;
  onChange?: any;
}

const StyledLabel = styled.div`
  display: flex;

  & + & {
    margin-left: 6px;
  }
`;

const HiddenCheck = styled.input<ICheckBoxProps>`
  /* visibility: hidden;
  width: 0;
  height: 0; */
`;

const StyledCheckBox = styled.div<ICheckBoxProps>`
  background: ${(props) =>
    props.checked ? `${palette.cakeLemon_400}` : `${palette.grey_100}`};
  border: 1px solid ${palette.black};
  padding: 10px 12px;
  margin: 3px 0;
  white-space: nowrap;
  border-radius: 16px;

  display: flex;
  justify-content: center;
  align-items: center;

  width: fit-content;
  height: fit-content;

  cursor: pointer;
`;

const CheckBox = (props: ICheckBoxProps) => {
  const [checked, setChecked] = useState(props.checked);
  return (
    <StyledLabel>
      <HiddenCheck
        type="checkbox"
        value={props.value}
        checked={checked}
        onChange={props.onChange}
      />
      <StyledCheckBox
        checked={checked}
        onClick={() => {
          setChecked(!checked);
        }}
      >
        <Typography category={'Bd7'}>{props.value}</Typography>
      </StyledCheckBox>
    </StyledLabel>
  );
};

export default CheckBox;
