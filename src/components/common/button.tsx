import styled, { css } from 'styled-components';

import palette from '../../styles/palette';

interface ButtonProps {
  size: string;
  category: string;
  disabled?: boolean;
  sizeStyle: any;
  onClick?: any;
}

const SIZES = {
  full: css`
    height: 3.75rem;
    font-size: 1rem;
    border-radius: 0;
  `,
  medium: css`
    height: 3.25rem;
    font-size: .875rem;
    border-radius: 2rem;
  `,
  small: css`
    height: 2.5rem;
    font-size: .75rem;
    border-radius: 2rem;
  `,
};

const StyledButton = styled.div<ButtonProps>`
  ${(props) => props.sizeStyle};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${(props) =>
    props.category === 'primary'
      ? palette.cakeLemon_400
      : palette.cakeLavender_500};
  border: ${(props) =>
    props.disabled ? 'none' : `.125rem solid ${palette.grey_800}`};
  color: ${palette.black};
  font-weight: 500;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

  ${(props) =>
    props.disabled &&
    css`
      background-color: ${palette.grey_200};
      color: ${palette.grey_500};
    `}

  &:hover {
    background-color: ${(props) =>
      props.category === 'primary'
        ? palette.cakeLemon_500
        : palette.cakeLavender_600};

    ${(props) =>
      props.disabled &&
      css`
        background-color: ${palette.grey_200};
      `}
  }
`;

function Button({
  size,
  category,
  disabled,
  children,
  onClick,
}: {
  size: string;
  category: string;
  disabled: boolean;
  onClick?: () => void;
  children: any;
}) {
  const sizeStyle = SIZES[size as keyof typeof SIZES];

  return (
    <StyledButton
      size={size}
      category={category}
      disabled={disabled}
      sizeStyle={sizeStyle}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
}

export default Button;
