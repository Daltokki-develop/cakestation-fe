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
  H6: css`
    font-family: 'Pretendard-Bold';
    font-size: 18px;
  `,
  H7: css`
    font-family: 'Pretendard-Regular';
    font-size: 16px;
  `,
  S1: css`
    font-family: 'Pretendard-Bold';
    font-size: 16px;
  `,
  S2: css`
    font-family: 'Pretendard-Semibold';
    font-size: 16px;
  `,
  S3: css`
    font-family: 'Pretendard-Medium';
    font-size: 16px;
  `,
  S4: css`
    font-family: 'Pretendard-Medium';
    font-size: 16px;
  `,
};

const StyledText = styled.text<TextProps>`
  ${(props) => props.categoryStyle};
  color: ${(props) => props.color};
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
