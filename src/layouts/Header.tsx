import styled, { css } from 'styled-components';

import palette from '@/styles/palette';

type IHeaderProps = {
  styleType: any;
  icon?: string;
  children: any;
};

const STYLES = {
  'logo+icon': css`
    padding: 40px 20px 0 20px;
    display: flex;
    justify-content: space-between;
  `,
  text: css`
    padding-top: 55px;
    justify-content: center;
  `,
  'icon+text': css`
    padding: 55px 8px 0 8px;
    display: flex;
    justify-content: space-between;
  `,
  icon: css`
    padding: 55px 8px 0 8px;
  `,
  bar: css`
    padding-top: 48px;
    justify-content: center;
  `,
};

const StyledHeader = styled.div`
  position: sticky;
  max-width: 100%;
  width: 100%;
  height: 96px;
  background-color: transparent;
  z-index: 100;
`;

const HeaderContent = styled.div<IHeaderProps>`
  position: relative;
  max-width: 100%;
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
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
`;

const Empty = styled.div`
  width: 40px;
  height: 40px;
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
