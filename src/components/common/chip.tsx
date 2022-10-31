import { useCallback, useState } from 'react';
import styled from 'styled-components';

import palette from '@/styles/palette';

import Typography from './typography';

interface IChipProps {
  value?: string;
  options: Array<string>;
  onChange?: any;
}

const StyledLabel = styled.label`
  display: flex;

  & + & {
    margin-top: 0.5rem;
  }
`;

const HiddenSelect = styled.select<IChipProps>`
  visibility: hidden;
`;

const StyledChip = styled.div`
  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 6px;

  width: 70px;
  height: 32px;

  background: ${palette.black};
  color: ${palette.white};
  border-radius: 32px;

  cursor: pointer;
`;

const StyledChipOpen = styled.div`
  width: 70px;
  height: 80px;

  background: ${palette.black};
  color: ${palette.white};
  border-radius: 13px;

  cursor: pointer;
`;

const Chip = (props: IChipProps) => {
  const [open, setOpen] = useState(false);

  const HandleOpen = useCallback(() => {
    setOpen(!open);
    console.log('핸들 오픈!');
  }, [open]);

  return (
    <StyledLabel onClick={HandleOpen}>
      <HiddenSelect
        value={props.value}
        options={props.options}
        onChange={props.onChange}
      />
      {!open ? (
        <StyledChip>
          <Typography category={'Bd8'}>{props.value}</Typography>
          <img src={'/assets/images/icons/chip_arrow.svg'} alt={'arrow'} />
        </StyledChip>
      ) : (
        <StyledChipOpen>
          {props.options.map((option, index) => (
            <option key={index}>{option}</option>
          ))}
        </StyledChipOpen>
      )}
    </StyledLabel>
  );
};

export default Chip;
