import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';

import Button from '@/components/common/button';
import HeartButton from '@/components/common/heartButton';
import palette from '@/styles/palette';

interface TypeProps {
  type: string;
}

interface INavigationProps {
  type: string;
  home?: boolean;
  reviews?: boolean;
  likes?: boolean;
  my?: boolean;
}

interface ITabProps {
  active?: boolean;
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
  justify-content: ${(props) =>
    props.type === 'default' ? 'space-between' : 'center'};
  padding: ${(props) => (props.type === 'default' ? '0 0' : '22px 0')};
`;

const StyledTab = styled.div<ITabProps>`
  width: 25%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-top: ${(props) =>
    props.active
      ? `5px solid ${palette.cakeLemon_500}`
      : `5px solid ${palette.white}`};

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

// const DefaultContainer = styled.div`
//   width: calc(100% - 40px);
//   height: 100%;

//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

const ItemContainer = styled.div`
  width: calc(100% - 40px);
  height: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function Navigation(props: INavigationProps) {
  const [like, setLike] = useState(false);

  const toggleLike = () => {
    setLike(!like);
  };

  const { type, home, reviews, likes, my } = props;

  return (
    <StyledNav>
      <NavigatorContent type={type}>
        {type === 'default' && (
          <>
            <Link href="/">
              <StyledTab active={home}>
                <StyledIcon>
                  <img src="/assets/images/icons/home_default.svg" alt="home" />
                </StyledIcon>
              </StyledTab>
            </Link>
            <Link href="/reviews/search">
              <StyledTab active={reviews}>
                <StyledIcon>
                  <img src="/assets/images/icons/write.svg" alt="review" />
                </StyledIcon>
              </StyledTab>
            </Link>
            <Link href="/likes">
              <StyledTab active={likes}>
                <StyledIcon>
                  <img src="/assets/images/icons/heart_empty.svg" alt="like" />
                </StyledIcon>
              </StyledTab>
            </Link>
            <Link href="/mypage">
              <StyledTab active={my}>
                <StyledIcon>
                  <img src="/assets/images/icons/user_default.svg" alt="my" />
                </StyledIcon>
              </StyledTab>
            </Link>
          </>
        )}
        {type === 'item' && (
          <ItemContainer>
            <Link href="/">
              <div
                style={{ width: '2.5rem', height: '2.5rem', cursor: 'pointer' }}
              >
                <HeartButton like={like} onClick={toggleLike} />
              </div>
            </Link>
            <Link href="/">
              <StyledIcon>
                <img src="/assets/images/icons/share.svg" alt={'Share'} />
              </StyledIcon>
            </Link>
            <Link href="/">
              <StyledIcon>
                <img src="/assets/images/icons/call_default.svg" alt={'Call'} />
              </StyledIcon>
            </Link>
            <Link href="/">
              <ButtonDiv>
                <Button size={'small'} category={'primary'} disabled={false}>
                  주문 문의
                </Button>
              </ButtonDiv>
            </Link>
          </ItemContainer>
        )}
      </NavigatorContent>
    </StyledNav>
  );
}

export default Navigation;
