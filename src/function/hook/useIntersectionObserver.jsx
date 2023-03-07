import { useRef } from "react";

/**
 * 무한스크롤을 위한 커스텀훅
 */
const useIntersectionObserver = (callback) => {
  const observer = useRef(
    new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
          }
        });
      },
      { threshold: 1 }
    )
  );

  const observe = (element) => {
    observer.current.observe(element);
  };

  const unobserve = (element) => {
    observer.current.unobserve(element);
  };

  return [observe, unobserve];
};

export default useIntersectionObserver;
