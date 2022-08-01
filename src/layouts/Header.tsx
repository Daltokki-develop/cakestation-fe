import styled, { css } from 'styled-components';

import palette from '@/styles/palette';

type IHeaderProps = {
  styleType: any;
  icon?: string;
  children: any;
};

const STYLES = {
  'logo+icon': css`
    padding: 2.5rem 1.25rem 0 1.25rem;
    display: flex;
    justify-content: space-between;
  `,
  text: css`
    padding-top: 3.4375rem;
    justify-content: center;
  `,
  'icon+text': css`
    padding: 3.4375rem 0.5rem 0 0.5rem;
    display: flex;
    justify-content: space-between;
  `,
  icon: css`
    padding: 3.4375rem 0.5rem 0 0.5rem;
  `,
  bar: css`
    padding-top: 3rem;
    justify-content: center;
  `,
};

const StyledHeader = styled.div`
  position: sticky;
  max-width: 100%;
  width: 100%;
  height: 6rem;
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
  font-size: 1.125rem;
  text-align: center;
  align-items: center;
`;

const LogoContainer = styled.div`
  width: 10.3125rem;
  height: 2.5rem;
  background: ${palette.cakeLemon_400};
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  object-fit: cover;
`;

const Empty = styled.div`
  width: 2.5rem;
  height: 2.5rem;
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
          {style === 'text' && <>{children}</>}
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
          {style === 'bar' && <div className="w-85">{children}</div>}
        </HeaderContent>
      </StyledHeader>
    </>
  );
};

export { Header };
