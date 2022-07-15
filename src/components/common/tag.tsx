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
    height: 2rem;
    font-size: 1rem;
  `,
  medium: css`
    height: 1.875rem;
    font-size: .875rem;
  `,
  small: css`
    height: 1.625rem;
    font-size: .75rem;
  `,
};

const ICONSIZES = {
  large: css`
    height: 2rem;
    font-size: 1rem;
  `,
  medium: css`
    height: 1.875rem;
    font-size: .875rem;
  `,
  small: css`
    height: 1.625rem;
    font-size: .75rem;
  `,
};

const IMAGESIZES = {
  large: css`
    width: 1.25rem;
    height: 1.25rem;
  `,
  medium: css`
    width: 1.125rem;
    height: 1.125rem;
  `,
  small: css`
    width: .875rem;
    height: .875rem;
  `,
};

const StyledTag = styled.div<TagProps>`
  ${(props) => props.sizeStyle};
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding: .375rem;

  background-color: ${palette.white};
  border: .0625rem solid ${palette.black};
  border-radius: .5rem;

  color: ${palette.black};
  letter-spacing: -0.0131rem;
  font-family: 'Pretendard-Regular';
`;

const StyledImage = styled.img<ImageProps>`
  ${(props) => props.imageStyle};
  margin-right: .25rem;
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
