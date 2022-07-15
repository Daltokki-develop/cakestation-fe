import styled from 'styled-components';

import palette from '../../../styles/palette';

const StyledInput = styled.input`
  width: 21.4375rem;
  height: 3rem;
  background-color: ${palette.grey_100};
  border: .0625rem solid ${palette.black};
  border-radius: .5rem;
  padding: .625rem;
  font-family: 'Pretendard-Medium';
  font-size: 1rem;

  ::placeholder {
    font-weight: 500;
    letter-spacing: -0.01em;
    color: ${palette.grey_400};
  }
  :required {
    background-color: ${palette.red_100};
    border: .125rem solid ${palette.red_500};
    ::placeholder {
      color: ${palette.grey_500};
    }
  }
  &:focus {
    background-color: ${palette.cakeLemon_100};
    border: .125rem solid ${palette.black};
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
