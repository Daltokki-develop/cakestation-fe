import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import palette from '@/styles/palette';

import Typography from './typography';

interface IChipProps {
  currentValue?: string;
  options: Array<string>;
  onChange?: any;
}

const StyledLabel = styled.div`
  display: flex;
  position: relative;
  width: 70px;
  height: 32px;
  z-index: 2;

  & + & {
    margin-top: 0.5rem;
  }
`;

const HiddenSelect = styled.select<IChipProps>`
  visibility: hidden;
`;

const StyledChip = styled.div`
  /* Auto layout */
  position: absolute;
  display: flex;
  width: 70px;

  background: ${palette.black};
  color: ${palette.white};

  cursor: pointer;

  img {
    margin-left: 6px;
  }
`;

const StyledChipClosed = styled(StyledChip)`
  flex-direction: row;
  align-items: center;

  text-indent: 11px;

  height: 30px;
  border-radius: 32px;

  &:hover {
    background: #000000;
  }
`;

const StyledChipOpen = styled(StyledChip)`
  height: fit-content;
  padding-bottom: 5px;
  flex-direction: column;
  border-radius: 13px;

  img {
    transform: rotate(180deg);
  }
`;

const ChipItem = styled.div`
  text-indent: 11px;
  padding: 4px 0;
  height: 20px;
`;

const Chip = (props: IChipProps) => {
  const { currentValue, options, onChange } = props;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(currentValue || options[0]);
  const [filterOptions, setFilterOptions] = useState(options);

  const HandleOpen = useCallback(() => {
    setOpen(true);
  }, [open]);

  const HandleValue = useCallback(
    (index: number) => {
      setOpen(false);
      if (index > -1) {
        setValue(filterOptions[index]);
        onChange(filterOptions[index]);
      }
    },
    [value, filterOptions]
  );

  useEffect(() => {
    setFilterOptions(options.filter((option) => option !== value));
  }, [value]);

  return (
    <StyledLabel>
      <HiddenSelect value={value} options={options} onChange={onChange} />
      {!open ? (
        <StyledChipClosed onClick={HandleOpen}>
          <Typography category={'Bd8'}>{value}</Typography>
          <img src={'/assets/images/icons/chip_arrow.svg'} alt={'arrow'} />
        </StyledChipClosed>
      ) : (
        <StyledChipOpen>
          <ChipItem onClick={() => HandleValue(-1)}>
            <Typography category={'Bd8'}>{value}</Typography>
            <img src={'/assets/images/icons/chip_arrow.svg'} alt={'arrow'} />
          </ChipItem>
          {filterOptions.map((option, index) => (
            <ChipItem onClick={() => HandleValue(index)} key={index}>
              <Typography category={'Bd8'}>{option}</Typography>
            </ChipItem>
          ))}
        </StyledChipOpen>
      )}
    </StyledLabel>
  );
};

export default Chip;
