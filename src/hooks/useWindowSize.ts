import { useLayoutEffect, useState } from 'react';

const useWindowSize = () => {
  const [size, setSize] = useState<number | null>(null);

  useLayoutEffect(() => {
    const updateSize = () => {
      setSize(window.innerHeight);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};
export default useWindowSize;
