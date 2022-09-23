import { useCallback } from 'react';
import styled from 'styled-components';

import palette from '@/styles/palette';

import Typography from './typography';

interface ICheckBoxProps {
  name?: string;
  groupName?: string;
  onChange?: any;
  currentValue?: boolean;
  label?: string;
  disabled?: boolean;
  onFocus?: any;
}

const CheckBoxWrapper = styled.div`
  & + & {
    margin-left: 6px;
  }
`;

const HiddenCheck = styled.input<ICheckBoxProps>`
  visibility: hidden;
  display: none;
  width: 0;
  height: 0;
`;

const StyledCheckBox = styled.label<ICheckBoxProps>`
  background: ${(props) =>
    props.currentValue ? `${palette.cakeLemon_400}` : `${palette.grey_100}`};
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
  const { name, groupName, onChange, currentValue, label, disabled, onFocus } =
    props;
  const handleChange = useCallback(
    (e: any) => {
      const value = e.target.checked ? 1 : 0;
      // console.log(name, value);

      if (onChange) {
        // console.log(value);
        onChange(name, value, label, e);
      }
    },
    [label, name, onChange]
  );

  return (
    <CheckBoxWrapper>
      <HiddenCheck
        type="checkbox"
        value=""
        checked={currentValue || false}
        disabled={disabled}
        id={name}
        name={groupName}
        onChange={handleChange}
        onFocus={onFocus}
      />
      <StyledCheckBox
        currentValue={currentValue}
        htmlFor={name}
        className="custom-control-label"
      >
        <Typography category={'Bd7'}>{label && label}</Typography>
      </StyledCheckBox>
    </CheckBoxWrapper>
  );
};

export default CheckBox;
