import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';

import Button from '@/components/common/button';
import HeartButton from '@/components/common/heartButton';
import palette from '@/styles/palette';

interface TypeProps {
  type: string;
}

const StyledNav = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  bottom: 0;
  max-width: 28rem;
  width: 100%;
  height: max-content;
  background-color: ${palette.white};
  z-index: 100;
  -moz-box-shadow: 0 0 0.0625rem rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0 0 0.0625rem rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 0.0625rem rgba(0, 0, 0, 0.3);
`;

// TODO : align-items -> center 맞춰줘야 함
const NavigatorContent = styled.div<TypeProps>`
  position: relative;
  max-width: 100%;
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: ${(props) => (props.type === 'default' ? '0' : '1.3125rem')};
`;

const StyledTab = styled.div`
  width: 25%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-top: 5px solid ${palette.white};

  &:hover {
    border-top: 5px solid ${palette.cakeLemon_500};
  }
`;

const StyledIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  cursor: pointer;

  &::hover {
    background-color: ${palette.grey_200};
  }
`;

const ButtonDiv = styled.div`
  width: 11.1875rem;
`;

function Navigation({ type }: { type: string }) {
  const [like, setLike] = useState(false);

  const toggleLike = () => {
    setLike(!like);
  };

  return (
    <StyledNav>
      <NavigatorContent type={type}>
        {type === 'default' && (
          <>
            <Link href="/">
              <StyledTab>
                <StyledIcon>
                  <img src="/assets/images/icons/home_default.svg" alt="home" />
                </StyledIcon>
              </StyledTab>
            </Link>
            <Link href="/reviews/search">
              <StyledTab>
                <StyledIcon>
                  <img src="/assets/images/icons/write.svg" alt="review" />
                </StyledIcon>
              </StyledTab>
            </Link>
            <Link href="/likes">
              <StyledTab>
                <StyledIcon>
                  <img src="/assets/images/icons/heart_empty.svg" alt="like" />
                </StyledIcon>
              </StyledTab>
            </Link>
            <Link href="/mypage">
              <StyledTab>
                <StyledIcon>
                  <img src="/assets/images/icons/user_default.svg" alt="my" />
                </StyledIcon>
              </StyledTab>
            </Link>
          </>
        )}
        {type === 'item' && (
          <>
            <Link href="/">
              <div
                style={{ width: '2.5rem', height: '2.5rem', cursor: 'pointer' }}
              >
                <HeartButton like={like} onClick={toggleLike} />
              </div>
            </Link>
            <Link href="/">
              <StyledIcon>
                <img src="/assets/images/icons/share.svg" />
              </StyledIcon>
            </Link>
            <Link href="/">
              <StyledIcon>
                <img src="/assets/images/icons/call_default.svg" />
              </StyledIcon>
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
