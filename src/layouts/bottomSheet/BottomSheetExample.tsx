import React from 'react';
import type { SheetRef } from 'react-modal-sheet';
import Sheet from 'react-modal-sheet';
import styled from 'styled-components';

const snapPoints = [800, 400, 150];
const initialSnap = snapPoints.length - 1;
const disableOnClose = () => {};

const CustomSheet = styled(Sheet)`
  &&& {
    display: flex;
    flex-direction: column;
    position: fixed;
    z-index: 100;
    max-width: 28rem;
    width: 100%;
  }

  .react-modal-sheet-backdrop {
    background-color: transparent !important;
  }
  .react-modal-sheet-container {
    height: max(800px, calc(100% - env(safe-area-inset-top) - 34px)) !important;
  }
  .react-modal-sheet-header {
    /* custom styles */
  }
  .react-modal-sheet-drag-indicator {
    /* custom styles */
  }
  .react-modal-sheet-content {
    /* custom styles */
  }
`;

function BottomSheetExample() {
  const ref = React.useRef<SheetRef>();
  const snapTo = (i: number) => ref.current?.snapTo(i);

  return (
    <CustomSheet
      ref={ref}
      isOpen
      onClose={disableOnClose}
      snapPoints={snapPoints}
      initialSnap={initialSnap}
    >
      <CustomSheet.Container>
        <CustomSheet.Header />
        <CustomSheet.Content style={{ paddingBottom: ref.current?.y }}>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <button onClick={() => snapTo(0)}>800</button>
            <button onClick={() => snapTo(1)}>400</button>
            <button onClick={() => snapTo(2)}>150</button>
          </div>
        </CustomSheet.Content>
      </CustomSheet.Container>

      {/* <Sheet.Backdrop /> */}
    </CustomSheet>
  );
}

export default BottomSheetExample;
