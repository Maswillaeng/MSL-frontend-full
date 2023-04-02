import { useRef } from "react";

/**
 * 무한스크롤을 위한 커스텀훅
 */
const useIntersectionObserver = (callback) => {
  // IntersectionObserver 객체를 생성하고, useRef를 사용하여 observer 변수에 할당한다.
  const observer = useRef(
    new IntersectionObserver(
      // IntersectionObserver의 콜백 함수를 정의한다.
      (entries) => {
        // entries 배열의 모든 요소에 대해 반복문을 실행한다.
        entries.forEach((entry) => {
          // 만약 요소가 교차되었다면(callback 함수를 실행해야 한다면)
          if (entry.isIntersecting) {
            // callback 함수를 실행한다.
            callback();
          }
        });
      },
      // threshold 옵션이 1이라면 화면 전체가 보일 때마다, 콜백 함수가 작동한다.
      { threshold: 1 }
    )
  );
  // observe 함수를 정의한다.
  const observe = (element) => {
    // observer 객체의 observe 메소드를 호출하여 element를 관찰한다.
    observer.current.observe(element);
  };
  // unobserve 함수를 정의한다.
  const unobserve = (element) => {
    // observer 객체의 unobserve 메소드를 호출하여 element의 관찰을 중단한다.
    observer.current.unobserve(element);
  };
  // observe와 unobserve 함수를 배열로 묶어서 반환한다.
  return [observe, unobserve];
};

export default useIntersectionObserver;
