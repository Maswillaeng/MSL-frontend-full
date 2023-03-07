
/**
 * 로그인할때 유저닉네임 쿠키 설정
 */
const loginCookie = (id) => {
  document.cookie = `user=${id}; path=/; expires=Tue, 19 Jan 2028 03:14:07 GMT`;
};

export default loginCookie;
