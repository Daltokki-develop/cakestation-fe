import { useEffect, useRef } from 'react';

import useWindowSize from './useWindowSize';

interface BottomSheetMetrics {
  dragStart: {
    sheetY: number; // touchstart에서 BottomSheet의 최상단 모서리의 Y값
    touchY: number; // touchstart에서 터치 포인트의 Y값
  };
  onDrag: {
    prevTouchY?: number; // 다음 touchmove 이벤트 핸들러에서 필요한 터치 포인트 Y값을 저장
    movingDirection: 'none' | 'down' | 'up'; // 유저가 터치를 움직이고 있는 방향
  };
}

export function useBottomSheetTest() {
  const sheet = useRef<HTMLDivElement>(null);
  const windowSize = useWindowSize();

  const metrics = useRef<BottomSheetMetrics>({
    dragStart: {
      sheetY: 0,
      touchY: 0,
    },
    onDrag: {
      prevTouchY: 0,
      movingDirection: 'none',
    },
  });

  useEffect(() => {
    const MIN_TOP = (windowSize as number) - 180; // 바텀시트가 최소로 올라가야 하는 y 값
    const MIN_Y = 60; // 바텀시트가 최대로 높이 올라갔을 때의 y 값
    const MAX_Y = (windowSize as number) - 158; // 바텀시트가 최소로 내려갔을 때의 y 값

    const handleDragStart = (e: DragEvent) => {
      const { dragStart: touchStart } = metrics.current;

      touchStart.sheetY = sheet.current?.getBoundingClientRect().y as number;
      touchStart.touchY = e.clientY as number;
    };

    const handleDrag = (e: DragEvent) => {
      e.preventDefault();

      const { dragStart: touchStart, onDrag: touchMove } = metrics.current;
      // const currentTouch = e.touches[0] as Touch;
      const currentTouch = e;
      console.log(e);

      if (touchMove.prevTouchY === undefined || touchMove.prevTouchY === 0) {
        touchMove.prevTouchY = touchStart.touchY;
      }

      console.log(`prev : ${touchMove.prevTouchY}`);
      console.log(`current : ${currentTouch?.clientY}`);
      if (touchMove.prevTouchY < currentTouch?.clientY) {
        touchMove.movingDirection = 'down';
        console.log('down');
      }

      if (touchMove.prevTouchY > currentTouch?.clientY) {
        touchMove.movingDirection = 'up';
        console.log('up');
      }

      // 터치 시작점에서부터 현재 터치 포인트까지의 변화된 y값
      const touchOffset = (currentTouch?.clientY as number) - touchStart.touchY;
      let nextSheetY = touchStart.sheetY + touchOffset;

      // nextSheetY 는 MIN_Y와 MAX_Y 사이의 값으로 clamp 되어야 한다
      if (nextSheetY <= MIN_Y) {
        nextSheetY = MIN_Y;
      }

      if (nextSheetY >= MAX_Y) {
        nextSheetY = MAX_Y;
      }

      console.log(`nextSheetY - MAX_Y : ${nextSheetY - MAX_Y}`);

      // sheet 위치 갱신
      sheet.current?.style.setProperty(
        'transform',
        `translateY(${nextSheetY - MAX_Y}px)`
      );
    };

    const handleDragEnd = () => {
      const { onDrag: touchMove } = metrics.current;

      // Snap Animation
      const currentSheetY = sheet.current?.getBoundingClientRect().y;
      console.log(currentSheetY);
      if (currentSheetY !== MIN_TOP) {
        if (touchMove.movingDirection === 'down') {
          // sheet.current?.style.setProperty('transform', 'translateY(0)');
          console.log('내려감');
        }

        if (touchMove.movingDirection === 'up') {
          // sheet.current?.style.setProperty(
          //   'transform',
          //   `translateY(${MIN_Y - MAX_Y}px)`
          //   );
          console.log('올라감');
        }
      }

      // metrics 초기화.
      metrics.current = {
        dragStart: {
          sheetY: 0,
          touchY: 0,
        },
        onDrag: {
          prevTouchY: 0,
          movingDirection: 'none',
        },
      };
    };

    sheet.current?.addEventListener('dragstart', handleDragStart);
    sheet.current?.addEventListener('drag', handleDrag);
    sheet.current?.addEventListener('dragend', handleDragEnd);

    return () => {
      sheet.current?.removeEventListener('dragstart', handleDragStart);
      sheet.current?.removeEventListener('drag', handleDrag);
      sheet.current?.removeEventListener('dragend', handleDragEnd);
    };
  }, [windowSize]);

  return { sheet };
}
