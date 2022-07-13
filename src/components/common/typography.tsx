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
    font-size: 24px;
  `,
  H2: css`
    font-family: 'Pretendard-SemiBold';
    font-size: 20px;
  `,
  H3: css`
    font-family: 'Pretendard-SemiBold';
    font-size: 18px;
  `,
  H4: css`
    font-family: 'Pretendard-Medium';
    font-size: 18px;
  `,
  H5: css`
    font-family: 'Pretendard-Bold';
    font-size: 18px;
  `,
  Bd1: css`
    font-family: 'Pretendard-Bold';
    font-size: 16px;
  `,
  Bd2: css`
    font-family: 'Pretendard-Medium';
    font-size: 16px;
  `,
  Bd3: css`
    font-family: 'Pretendard-Regular';
    font-size: 16px;
  `,
  Bd4: css`
    font-family: 'Pretendard-SemiBold';
    font-size: 16px;
  `,
  Bd5: css`
    font-family: 'Pretendard-SemiBold';
    font-size: 14px;
  `,
  Bd6: css`
    font-family: 'Pretendard-Medium';
    font-size: 14px;
  `,
  Bd7: css`
    font-family: 'Pretendard-Regular';
    font-size: 14px;
  `,
  Bd8: css`
    font-family: 'Pretendard-Medium';
    font-size: 12px;
  `,
  Bd9: css`
    font-family: 'Pretendard-Regular';
    font-size: 12px;
  `,
  Bd10: css`
    font-family: 'Pretendard-Regular';
    font-size: 10px;
  `,
};

const StyledText = styled.text<TextProps>`
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
