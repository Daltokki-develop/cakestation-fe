import styled from 'styled-components';

import palette from '../../../styles/palette';

const StyledTextArea = styled.textarea`
  resize: none;
  width: calc(100% - 2rem);
  min-height: 9.625rem;
  height: max-content;
  background-color: ${palette.grey_100};
  border: 0.0625rem solid ${palette.black};
  border-radius: 0.5rem;
  font-family: 'Pretendard-Medium';
  font-size: 1rem;
  padding: 1rem;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  ::placeholder {
    font-weight: 500;
    letter-spacing: -0.01em;
    color: ${palette.grey_400};
  }
  :required {
    background-color: ${palette.red_100};
    border: 0.125rem solid ${palette.red_500};
    ::placeholder {
      color: ${palette.grey_500};
    }
  }
  &:focus {
    background-color: ${palette.cakeLemon_100};
    border: 0.125rem solid ${palette.black};
    ::placeholder {
      color: transparent;
    }
  }
`;

function TextArea({
  value,
  placeholder,
  onChange,
}: {
  value?: any;
  placeholder: string;
  onChange: any;
}) {
  return (
    <StyledTextArea
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

export default TextArea;
