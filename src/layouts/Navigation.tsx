import Link from 'next/link';
import styled from 'styled-components';

import Button from '@/components/common/button';
import palette from '@/styles/palette';

interface TypeProps {
  type: string;
}

const StyledNav = styled.div`
  position: fixed;
  bottom: 0;
  max-width: 100%;
  width: 28rem;
  height: 83px;
  background-color: ${palette.white};
  z-index: 100;
  box-shadow: 0px -0.5px 0px rgba(0, 0, 0, 0.3);
`;

// TODO : align-items -> center 맞춰줘야 함
const NavigatorContent = styled.div<TypeProps>`
  position: relative;
  max-width: 100%;
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding-top: ${(props) => (props.type === 'default' ? '7px' : '21px')};
`;

const StyledIcon = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const ButtonDiv = styled.div`
  width: 179px;
`;

function Navigation({ type }: { type: string }) {
  return (
    <StyledNav>
      <NavigatorContent type={type}>
        {type === 'default' && (
          <>
            <Link href="/">
              <StyledIcon src="/assets/images/icons/home_default.svg" />
            </Link>
            <Link href="/">
              <StyledIcon src="/assets/images/icons/write.svg" />
            </Link>
            <Link href="/">
              <StyledIcon src="/assets/images/icons/heart_empty.svg" />
            </Link>
            <Link href="/">
              <StyledIcon src="/assets/images/icons/user_default.svg" />
            </Link>
          </>
        )}
        {type === 'item' && (
          <>
            <Link href="/">
              <StyledIcon src="/assets/images/icons/heart_color-filled.svg" />
            </Link>
            <Link href="/">
              <StyledIcon src="/assets/images/icons/share.svg" />
            </Link>
            <Link href="/">
              <StyledIcon src="/assets/images/icons/call_default.svg" />
            </Link>
            <Link href="/">
              <ButtonDiv>
                <Button size={'small'} category={'primary'} disabled={false}>
                  주문 문의
                </Button>
              </ButtonDiv>
            </Link>
          </>
        )}
      </NavigatorContent>
    </StyledNav>
  );
}

export default Navigation;
