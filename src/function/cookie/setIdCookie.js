/**
 * id쿠키를 저장하는 메소드
 */
export const setCookie = (id) => {
  document.cookie = `id=${id};expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/`;
};
