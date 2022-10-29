import styled from 'styled-components';

import palette from '@/styles/palette';

import Typography from '../common/typography';

const SelectContainer = styled.div`
  width: 4.375rem;
  height: 1.875rem;
  background-color: ${palette.black};
  border-radius: 2rem;
  color: ${palette.white};
`;

const StyledSelect = styled.select`
  width: 100%;
  height: 100%;
  background-color: ${palette.black};
  color: ${palette.white};
  border-radius: 2rem;
  text-align: center;
  text-align-last: center;
  -ms-text-align-last: center;
  -moz-text-align-last: center;
  letter-spacing: -0.01em;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
`;

const StyledArrowBottom = styled.div`
  position: absolute;
  top: 63%;
  left: 92%;
  width: 0;
  height: 0;
  pointer-events: none;
  border-style: solid;
  border-width: 0.5rem 0.3125rem 0 0.3125rem;
  border-color: #787878 transparent transparent transparent;
`;

const StyledArrowTop = styled(StyledArrowBottom)`
  top: 23%;
  transform: rotate(-180deg);
`;

function ArrangeChip() {
  return (
    <SelectContainer>
      <StyledSelect>
        <option key={'최신순'}>
          <Typography category={'Bd8'}>최신순</Typography>
        </option>
        <option key={'인기순'}>
          <Typography category={'Bd8'}>인기순</Typography>
        </option>
      </StyledSelect>
      <StyledArrowTop />
      <StyledArrowBottom />
    </SelectContainer>
  );
}

export default ArrangeChip;
