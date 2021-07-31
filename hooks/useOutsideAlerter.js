import { useEffect } from 'react';

function useOutsideAlerter(ref, isOutside, setIsOpen) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
        document.removeEventListener('mousedown', handleClickOutside);
      }
    }
    if (isOutside) document.addEventListener('mousedown', handleClickOutside);
  }, [isOutside]);
}

export default useOutsideAlerter;
