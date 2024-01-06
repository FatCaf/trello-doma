import { useEffect } from 'react';
import { useAppSelector } from '../store/hooks';

const useOutsideClick = (targetElement: HTMLDivElement | null, callback: () => void): void => {
  const { inputs } = useAppSelector((state) => state.input);
  useEffect(() => {
    const handleClose = (event: MouseEvent): void => {
      if (!targetElement?.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('click', handleClose);

    return () => {
      document.removeEventListener('click', handleClose);
    };
  }, [callback, inputs.length, targetElement]);
};

export default useOutsideClick;
