/**
 * 현재 로그인한 유저의 쿠키 정보 조회
 */
const getUserCookie = (id) => {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        id.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export default getUserCookie;
