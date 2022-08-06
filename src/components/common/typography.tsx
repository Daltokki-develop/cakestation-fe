import styled, { css } from 'styled-components';

import palette from '@/styles/palette';

interface TextProps {
  category: string;
  color: string;
  categoryStyle: any;
}

const CATEGORYS = {
  H1: css`
    font-family: 'Pretendard-Medium';
    font-size: 1.5rem;
  `,
  H2: css`
    font-family: 'Pretendard-SemiBold';
    font-size: 1.25rem;
  `,
  H3: css`
    font-family: 'Pretendard-SemiBold';
    font-size: 1.125rem;
  `,
  H4: css`
    font-family: 'Pretendard-Medium';
    font-size: 1.125rem;
  `,
  H5: css`
    font-family: 'Pretendard-Bold';
    font-size: 1.125rem;
  `,
  Bd1: css`
    font-family: 'Pretendard-Bold';
    font-size: 1rem;
  `,
  Bd2: css`
    font-family: 'Pretendard-Medium';
    font-size: 1rem;
  `,
  Bd3: css`
    font-family: 'Pretendard-Regular';
    font-size: 1rem;
  `,
  Bd4: css`
    font-family: 'Pretendard-SemiBold';
    font-size: 1rem;
  `,
  Bd5: css`
    font-family: 'Pretendard-SemiBold';
    font-size: 0.875rem;
  `,
  Bd6: css`
    font-family: 'Pretendard-Medium';
    font-size: 0.875rem;
  `,
  Bd7: css`
    font-family: 'Pretendard-Regular';
    font-size: 0.875rem;
  `,
  Bd8: css`
    font-family: 'Pretendard-Medium';
    font-size: 0.75rem;
  `,
  Bd9: css`
    font-family: 'Pretendard-Regular';
    font-size: 0.75rem;
  `,
  Bd10: css`
    font-family: 'Pretendard-Regular';
    font-size: 0.625rem;
  `,
};

const StyledText = styled.span<TextProps>`
  ${(props) => props.categoryStyle};
  ${(props) => {
    return css`
      color: ${palette[props.color]};
    `;
  }};
`;

function Typography({
  category,
  color,
  children,
}: {
  category: string;
  color: string;
  children: any;
}) {
  const categoryStyle = CATEGORYS[category as keyof typeof CATEGORYS];
  return (
    <StyledText category={category} categoryStyle={categoryStyle} color={color}>
      {children}
    </StyledText>
  );
}

Typography.defaultProps = {
  category: 'H1',
  color: palette.grey_800,
};

export default Typography;
