import styled, { css } from 'styled-components';

import palette from '../../styles/palette';

interface TagProps {
  size: string;
  icon: boolean;
  src: string;
  sizeStyle: any;
}

interface ImageProps {
  imageStyle: any;
}

const SIZES = {
  large: css`
    height: 32px;
    font-size: 16px;
  `,
  medium: css`
    height: 30px;
    font-size: 14px;
  `,
  small: css`
    height: 26px;
    font-size: 12px;
  `,
};

const ICONSIZES = {
  large: css`
    height: 32px;
    font-size: 16px;
  `,
  medium: css`
    height: 30px;
    font-size: 14px;
  `,
  small: css`
    height: 26px;
    font-size: 12px;
  `,
};

const IMAGESIZES = {
  large: css`
    width: 20px;
    height: 20px;
  `,
  medium: css`
    width: 18px;
    height: 18px;
  `,
  small: css`
    width: 14px;
    height: 14px;
  `,
};

const StyledTag = styled.div<TagProps>`
  ${(props) => props.sizeStyle};
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding: 6px;

  background-color: ${palette.white};
  border: 1px solid ${palette.black};
  border-radius: 8px;

  color: ${palette.black};
  letter-spacing: -0.21px;
  font-family: 'Pretendard-Regular';
`;

const StyledImage = styled.img<ImageProps>`
  ${(props) => props.imageStyle};
  margin-right: 4px;
`;

function Tag({
  size,
  icon,
  src,
  children,
}: {
  size: string;
  icon: boolean;
  src: string;
  children: any;
}) {
  const sizeStyle = icon
    ? ICONSIZES[size as keyof typeof ICONSIZES]
    : SIZES[size as keyof typeof SIZES];
  const imageSize = IMAGESIZES[size as keyof typeof IMAGESIZES];

  return (
    <StyledTag size={size} icon={icon} src={src} sizeStyle={sizeStyle}>
      {icon && <StyledImage src={src} imageStyle={imageSize} />}
      {children}
    </StyledTag>
  );
}

Tag.defaultProps = {
  icon: false,
  src: '',
};

export default Tag;
