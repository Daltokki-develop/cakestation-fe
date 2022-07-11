import styled from 'styled-components';

import Divider from '@/components/common/divider';
import palette from '@/styles/palette';

const StyledNav = styled.div`
  position: sticky;
  max-width: 100%;
  width: 100%;
  height: 83px;
  bottom: 0;
  left: 0;
  background-color: ${palette.white};
  z-index: 100;
`;

// const IconContainer = styled.div``;

const StyledIcon = styled.img`
  width: 40px;
  height: 40px;
`;

function Navigation() {
  return (
    <StyledNav>
      <Divider size={'sm'} />
      <StyledIcon src="/assets/images/icons/home_default.svg" />
      <StyledIcon src="/assets/images/icons/write.svg" />
      <StyledIcon src="/assets/images/icons/heart_empty.svg" />
      <StyledIcon src="/assets/images/icons/user_default.svg" />
    </StyledNav>
  );
}

export default Navigation;
