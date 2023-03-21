/**
 *
 * @param {쿠키 데이터} name
 * @returns 아이디값
 */
export const getIdCookie = (name) => {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) {
    return parts.pop().split(";").shift();
  }
};
