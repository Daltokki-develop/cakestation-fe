import styled, { css } from 'styled-components';

import palette from '@/styles/palette';

type IHeaderProps = {
  styleType: any;
  icon?: string;
  children: any;
};

const STYLES = {
  'logo+icon': css`
    justify-content: center;
    padding: 40px 28px 0 95px;
    display: flex;
    justify-content: space-between;
  `,
  text: css`
    justify-content: center;
    padding-top: 55px;
  `,
  'icon+text': css`
    justify-content: center;
    padding: 55px 20px 0 20px;
    display: flex;
    justify-content: space-between;
  `,
  icon: css`
    padding: 55px 20px 0 20px;
  `,
  bar: css`
    justify-content: center;
    padding-top: 48px;
  `,
};

const StyledHeader = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 96px;
  background-color: ${palette.white};
`;

const HeaderContent = styled.div<IHeaderProps>`
  position: relative;
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
  width: 24px;
  height: 24px;
  object-fit: cover;
`;

const Empty = styled.div`
  width: 24px;
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
