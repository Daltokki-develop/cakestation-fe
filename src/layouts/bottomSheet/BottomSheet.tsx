import { motion } from 'framer-motion';
import { useEffect } from 'react';
import styled from 'styled-components';

import { useBottomSheet } from '@/hooks/useBottomSheet';
import useWindowSize from '@/hooks/useWindowSize';

import BottomSheetHeader from './BottomSheetHeader';

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 100;
  max-width: 28rem;
  width: 100%;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.6);
  transition: transform 250ms ease-out;
`;

function BottomSheet() {
  const windowSize = useWindowSize();
  const { sheet } = useBottomSheet();

  useEffect(() => {
    // console.log(windowSize);
  }, [windowSize]);

  return (
    <Wrapper
      ref={sheet}
      style={{
        height: `${windowSize}px`,
        top: `${(windowSize as number) - 158}px`,
      }}
    >
      <BottomSheetHeader />
    </Wrapper>
  );
}

export default BottomSheet;
