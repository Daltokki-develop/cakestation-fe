import styled from 'styled-components';

import palette from '../../../styles/palette';

const SelectContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 343px;
  height: 48px;
  background-color: ${palette.grey_100};
  border: 1px solid ${palette.black};
  border-radius: 8px;
`;

const StyledSelect = styled.select`
  width: 100%;
  height: 100%;
  background-color: ${palette.grey_100};
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  letter-spacing: -0.01em;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
`;

const StyledArrowBottom = styled.div`
  position: absolute;
  top: 60%;
  left: 90%;
  width: 0;
  height: 0;
  pointer-events: none;
  border-style: solid;
  border-width: 8px 5px 0 5px;
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
