import styled from 'styled-components';

import palette from '../../../styles/palette';

const StyledInput = styled.input`
  width: 100%;
  height: 3rem;
  background-color: ${palette.grey_100};
  border: 0.0625rem solid ${palette.black};
  border-radius: 0.5rem;
  font-family: 'Pretendard-Medium';
  font-size: 1rem;
  text-indent: 1rem;

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

function Input({
  placeholder,
  onChange,
  textarea,
  currentValue,
}: {
  currentValue?: any;
  placeholder: string;
  onChange: any;
  textarea?: boolean;
}) {
  return textarea ? (
    <StyledTextArea
      value={currentValue || ''}
      placeholder={placeholder}
      onChange={onChange}
    />
  ) : (
    <StyledInput
      value={currentValue || ''}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

export default Input;
