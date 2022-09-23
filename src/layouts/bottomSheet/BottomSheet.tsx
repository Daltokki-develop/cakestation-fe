import { motion } from 'framer-motion';
import { useEffect } from 'react';
import styled from 'styled-components';

import { useBottomSheetTest } from '@/hooks/useBottomSheetTest';
import useWindowSize from '@/hooks/useWindowSize';

import BottomSheetHeader from './BottomSheetHeader';

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 100;
  max-width: 28rem;
  width: 100%;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  background-color: #fff;
  box-shadow: 0rem 0rem 0.625rem rgba(0, 0, 0, 0.6);
  transition: transform 250ms ease-out;
`;

function BottomSheet() {
  const windowSize = useWindowSize();
  // const { sheet } = useBottomSheet();
  const { sheet } = useBottomSheetTest();

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
