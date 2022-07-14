import { useEffect, useRef } from 'react';

import useWindowSize from './useWindowSize';

interface BottomSheetMetrics {
  touchStart: {
    sheetY: number; // touchstart에서 BottomSheet의 최상단 모서리의 Y값
    touchY: number; // touchstart에서 터치 포인트의 Y값
  };
  touchMove: {
    prevTouchY?: number; // 다음 touchmove 이벤트 핸들러에서 필요한 터치 포인트 Y값을 저장
    movingDirection: 'none' | 'down' | 'up'; // 유저가 터치를 움직이고 있는 방향
  };
}

export function useBottomSheet() {
  const sheet = useRef<HTMLDivElement>(null);
  const windowSize = useWindowSize();

  const metrics = useRef<BottomSheetMetrics>({
    touchStart: {
      sheetY: 0,
      touchY: 0,
    },
    touchMove: {
      prevTouchY: 0,
      movingDirection: 'none',
    },
  });

  useEffect(() => {
    const MIN_TOP = (windowSize as number) / 2; // 바텀시트가 최소로 올라가야 하는 y 값
    const MIN_Y = 60; // 바텀시트가 최대로 높이 올라갔을 때의 y 값
    const MAX_Y = (windowSize as number) - 158; // 바텀시트가 최소로 내려갔을 때의 y 값

    const handleTouchStart = (e: TouchEvent) => {
      const { touchStart } = metrics.current;

      touchStart.sheetY = sheet.current?.getBoundingClientRect().y as number;
      touchStart.touchY = e.touches[0]?.clientY as number;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();

      const { touchStart, touchMove } = metrics.current;
      const currentTouch = e.touches[0] as Touch;

      if (touchMove.prevTouchY === undefined) {
        touchMove.prevTouchY = touchStart.touchY;
      }

      if (touchMove.prevTouchY < currentTouch?.clientY) {
        touchMove.movingDirection = 'down';
      }

      if (touchMove.prevTouchY > currentTouch?.clientY) {
        touchMove.movingDirection = 'up';
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

      // sheet 위치 갱신
      sheet.current?.style.setProperty(
        'transform',
        `translateY(${nextSheetY - MAX_Y}px)`
      );
    };

    const handleTouchEnd = () => {
      const { touchMove } = metrics.current;

      // Snap Animation
      const currentSheetY = sheet.current?.getBoundingClientRect().top;

      if ((currentSheetY as number) > MIN_TOP) {
        if (touchMove.movingDirection === 'down') {
          sheet.current?.style.setProperty('transform', 'translateY(0)');
        }

        if (touchMove.movingDirection === 'up') {
          sheet.current?.style.setProperty(
            'transform',
            `translateY(${MIN_Y - MAX_Y}px)`
          );
        }
      }

      // metrics 초기화.
      metrics.current = {
        touchStart: {
          sheetY: 0,
          touchY: 0,
        },
        touchMove: {
          prevTouchY: 0,
          movingDirection: 'none',
        },
      };
    };

    sheet.current?.addEventListener('touchstart', handleTouchStart);
    sheet.current?.addEventListener('touchmove', handleTouchMove);
    sheet.current?.addEventListener('touchend', handleTouchEnd);

    return () => {
      sheet.current?.removeEventListener('touchstart', handleTouchStart);
      sheet.current?.removeEventListener('touchmove', handleTouchMove);
      sheet.current?.removeEventListener('touchend', handleTouchEnd);
    };
  }, [windowSize]);

  return { sheet };
}
