import styled, { css } from 'styled-components';

import palette from '../../styles/palette';

interface ButtonProps {
  size: string;
  category: string;
  disabled?: boolean;
  sizeStyle: any;
}

const SIZES = {
  full: css`
    width: 375px;
    height: 60px;
    font-size: 16px;
    border-radius: 0;
  `,
  medium: css`
    width: 343px;
    height: 52px;
    font-size: 14px;
    border-radius: 32px;
  `,
  small: css`
    width: 343px;
    height: 40px;
    font-size: 12px;
    border-radius: 32px;
  `,
};

const StyledButton = styled.div<ButtonProps>`
  ${(props) => props.sizeStyle};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.category === 'primary'
      ? palette.cakeLemon_400
      : palette.cakeLavender_500};
  border: ${(props) =>
    props.disabled ? 'none' : `2px solid ${palette.grey_800}`};
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
}: {
  size: string;
  category: string;
  disabled: boolean;
  children: any;
}) {
  const sizeStyle = SIZES[size as keyof typeof SIZES];

  return (
    <StyledButton
      size={size}
      category={category}
      disabled={disabled}
      sizeStyle={sizeStyle}
    >
      {children}
    </StyledButton>
  );
}

export default Button;