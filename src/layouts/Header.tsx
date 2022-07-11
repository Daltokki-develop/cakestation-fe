import styled, { css } from 'styled-components';

import palette from '@/styles/palette';

type IHeaderProps = {
  styleType: any;
  icon?: string;
  children: any;
};

const STYLES = {
  'logo+icon': css`
    padding-top: 40px;
    display: flex;
  `,
  text: css`
    padding-top: 55px;
  `,
  'icon+text': css`
    width: 100%;
    padding-top: 55px;
    display: flex;
    justify-content: space-between;
  `,
  icon: css`
    padding-top: 55px;
  `,
  bar: css`
    padding-top: 48px;
  `,
};

const StyledHeader = styled.div`
  position: fixed;
  max-width: 100%;
  height: 96px;
  background-color: transparent;
  z-index: 100;
  display: flex;
  justify-content: center;
`;

const HeaderContent = styled.div<IHeaderProps>`
  position: relative;
  max-width: 100%;
  width: 100%;
  height: fit-content;
  ${(props) => props.styleType};
  display: flex;
  font-weight: 500;
  font-size: 18px;
  text-align: center;
  align-items: center;
`;

const LogoContainer = styled.div`
  width: 165px;
  height: 40px;
  background: ${palette.cakeLemon_400};
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 45px;
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
`;

const Empty = styled.div`
  width: 40px;
`;

const Header = ({
  style,
  icon,
  children,
}: {
  style: string;
  icon?: string;
  children: any;
}) => {
  const styleType = STYLES[style as keyof typeof STYLES];

  return (
    <>
      <StyledHeader>
        <HeaderContent styleType={styleType}>
          {style === 'logo+icon' && (
            <>
              <Empty />
              <LogoContainer>{children}</LogoContainer>
              <Icon src={`/assets/images/icons/${icon}.svg`} />
            </>
          )}
          {(style === 'text' || style === 'bar') && <>{children}</>}
          {style === 'icon+text' && (
            <>
              <Icon src={`/assets/images/icons/${icon}.svg`} />
              {children}
              <Empty />
            </>
          )}
          {style === 'icon' && (
            <Icon src={`/assets/images/icons/${icon}.svg`} />
          )}
        </HeaderContent>
      </StyledHeader>
    </>
  );
};

export { Header };
