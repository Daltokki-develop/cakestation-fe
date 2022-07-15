import styled, { css } from 'styled-components';

import palette from '../../styles/palette';

interface DividerProps {
  size: string;
  sizeStyle: any;
}

const SIZES = {
  sm: css`
    height: .125rem;
  `,
  md: css`
    height: .25rem;
  `,
  lg: css`
    height: .375rem;
  `,
};

const StyledDivider = styled.hr<DividerProps>`
  ${(props) => props.sizeStyle};
  background-color: ${palette.grey_200};
  width: 100%;
`;

function Divider({ size }: { size: string }) {
  const sizeStyle = SIZES[size as keyof typeof SIZES];

  return <StyledDivider size={size} sizeStyle={sizeStyle} />;
}

export default Divider;
