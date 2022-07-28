import styled, { css } from 'styled-components';

import palette from '../../styles/palette';

interface DividerProps {
  size: string;
  sizeStyle: any;
}

const SIZES = {
  small: css`
    height: 0.125rem;
  `,
  medium: css`
    height: 0.25rem;
  `,
  large: css`
    height: 0.375rem;
  `,
};

const StyledDivider = styled.hr<DividerProps>`
  ${(props) => props.sizeStyle};
  background-color: ${palette.grey_200};
  width: 100%;
  border: none;
`;

function Divider({ size }: { size: string }) {
  const sizeStyle = SIZES[size as keyof typeof SIZES];

  return <StyledDivider size={size} sizeStyle={sizeStyle} />;
}

export default Divider;
