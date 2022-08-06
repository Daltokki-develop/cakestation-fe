import { useState } from 'react';
import styled from 'styled-components';

import palette from '@/styles/palette';

import Typography from './typography';

const StyledUl = styled.ul`
  width: 100%;
  height: 3rem;
  display: flex;
  list-style: none;
  justify-content: space-around;
  align-items: center;
`;

const StyledLi = styled.li`
  display: flex;
  align-content: center;
  padding: 13px 0px;
  cursor: pointer;

  &.active {
    border-bottom: 4px solid ${palette.cakeLavender_700};
  }
`;

const StyledIcon = styled.img`
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.25rem;
`;

const StyledNumber = styled.span`
  line-height: 1.25rem;
  margin-left: 0.25rem;
`;

function Tab({
  titles,
  counts,
  icons,
  contents,
}: {
  titles: Array<string>;
  counts: Array<number>;
  icons: Array<string>;
  contents: any;
}) {
  const [activeId, setActiveId] = useState(0);

  const clickHandler = (id: number) => {
    setActiveId(id);
  };

  return (
    <div>
      <StyledUl>
        {titles.map((str, idx) => (
          <StyledLi
            key={str}
            className={`${activeId === idx ? 'active' : ''}`}
            onClick={() => clickHandler(idx)}
          >
            {icons[idx] !== '' && <StyledIcon src={icons[idx]} />}
            <Typography
              category={'Bd1'}
              color={`${activeId === idx ? 'cakeLavender_700' : 'black'}`}
            >
              {str}
            </Typography>
            {counts[idx] !== 0 && (
              <Typography category={'Bd8'} color={'grey_500'}>
                <StyledNumber>{counts[idx]}</StyledNumber>
              </Typography>
            )}
          </StyledLi>
        ))}
      </StyledUl>
      <div>{contents[activeId]}</div>
    </div>
  );
}

export default Tab;
