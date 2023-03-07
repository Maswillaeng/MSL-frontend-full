
/**
 * 로그아웃할때 유저닉네임 쿠키 삭제
 */
const logOutCookie = (id) => {
  document.cookie = `user=${id}; path=/; expires=Tue, 19 Jan 2018 03:14:07 GMT`;
};

export default logOutCookie;
