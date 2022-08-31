import { useEffect, useState } from 'react';
import styled from 'styled-components';

import palette from '@/styles/palette';

import Typography from './typography';

interface ICheckBoxProps {
  value?: string;
  checked?: boolean;
  onChange?: any;
  checkedItems?: any;
}

const HiddenCheck = styled.input<ICheckBoxProps>`
  visibility: hidden;
  width: 0;
  height: 0;
`;

const StyledCheckBox = styled.label<ICheckBoxProps>`
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

  & + & {
    margin-left: 6px;
  }
`;

const CheckBox = (props: ICheckBoxProps) => {
  const [checked, setChecked] = useState(props.checked);
  const handleCheck = ({ target }: { target: any }) => {
    props.onChange(target.checked, target.value);
    setChecked(target.checked);
  };

  useEffect(() => {
    if (props.checkedItems.includes(props.value)) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [props.checkedItems]);
  return (
    <StyledCheckBox checked={checked}>
      <HiddenCheck
        type="checkbox"
        value={props.value}
        checked={checked}
        onChange={({ e }: { e: any }) => handleCheck(e)}
      />
      <Typography category={'Bd7'}>{props.value}</Typography>
    </StyledCheckBox>
  );
};

export default CheckBox;
