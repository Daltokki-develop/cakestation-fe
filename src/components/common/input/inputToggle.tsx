import styled from 'styled-components';

import palette from '../../../styles/palette';

const SelectContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 21.4375rem;
  height: 3rem;
  background-color: ${palette.grey_100};
  border: 0.0625rem solid ${palette.black};
  border-radius: 0.5rem;
`;

const StyledSelect = styled.select`
  width: 100%;
  height: 100%;
  background-color: ${palette.grey_100};
  border: none;
  border-radius: 0.5rem;
  font-weight: 700;
  font-size: 1rem;
  text-align: center;
  text-align-last: center;
  -ms-text-align-last: center;
  -moz-text-align-last: center;
  letter-spacing: -0.01em;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
  color: ${palette.black};
`;

const StyledArrowBottom = styled.div`
  position: absolute;
  top: 60%;
  left: 90%;
  width: 0;
  height: 0;
  pointer-events: none;
  border-style: solid;
  border-width: 0.5rem 0.3125rem 0 0.3125rem;
  border-color: #787878 transparent transparent transparent;
`;

const StyledArrowTop = styled(StyledArrowBottom)`
  top: 20%;
  transform: rotate(-180deg);
`;

function InputToggle({ options }: { options: Array<string> }) {
  return (
    <SelectContainer>
      <StyledSelect>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </StyledSelect>
      <StyledArrowTop />
      <StyledArrowBottom />
    </SelectContainer>
  );
}

export default InputToggle;
