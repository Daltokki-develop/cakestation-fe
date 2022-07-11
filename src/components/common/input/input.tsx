import styled from 'styled-components';

import palette from '../../../styles/palette';

const StyledInput = styled.input`
  width: 343px;
  height: 48px;
  background-color: ${palette.grey_100};
  border: 1px solid ${palette.black};
  border-radius: 8px;
  padding: 10px;
  font-family: 'Pretendard-Medium';
  font-size: 16px;

  ::placeholder {
    font-weight: 500;
    letter-spacing: -0.01em;
    color: ${palette.grey_400};
  }
  :required {
    background-color: ${palette.red_100};
    border: 2px solid ${palette.red_500};
    ::placeholder {
      color: ${palette.grey_500};
    }
  }
  &:focus {
    background-color: ${palette.cakeLemon_100};
    border: 2px solid ${palette.black};
    ::placeholder {
      color: transparent;
    }
  }
`;

function Input({
  value,
  placeholder,
  onChange,
}: {
  value?: any;
  placeholder: string;
  onChange: any;
}) {
  return (
    <StyledInput value={value} placeholder={placeholder} onChange={onChange} />
  );
}

export default Input;
