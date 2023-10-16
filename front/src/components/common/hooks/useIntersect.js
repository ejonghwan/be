import { useState, useEffect, useCallback } from 'react';
const defaultOption = {
  root: null,
  threshold: 0.5,
  rootMargin: '0px'
};


// 관찰 대상을 지정할 수 있도록 ref값을 useState 훅을 이용해 state로 관리
const useIntersect = (onIntersect, option) => {
  const [ref, setRef] = useState(null);
  const checkIntersect = useCallback(([entry], observer) => {
    if (entry.isIntersecting) {
      onIntersect(entry, observer);
    }
  }, []);


  useEffect(() => {
    let observer;
    if (ref) {
      observer = new IntersectionObserver(checkIntersect, {
        ...defaultOption,
        ...option
      });
      observer.observe(ref);
    }
    return () => observer && observer.disconnect();
  }, [ref, option.root, option.threshold, option.rootMargin, checkIntersect]);
  return [ref, setRef];
}



export default useIntersect;