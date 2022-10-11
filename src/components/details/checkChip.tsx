import React from 'react';
import styled from 'styled-components';

import palette from '@/styles/palette';

interface CheckProps {
  isCheck: boolean;
}

const Chip = styled.div<CheckProps>`
  width: 4.5625rem;
  height: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid ${palette.black};
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${(props) =>
    props.isCheck === true ? palette.cakeLemon_400 : palette.white};
`;

function CheckChip({ isCheck, children }: { isCheck: boolean; children: any }) {
  return <Chip isCheck={isCheck}>{children}</Chip>;
}

export default CheckChip;
