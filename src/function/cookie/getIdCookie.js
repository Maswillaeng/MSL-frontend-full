/**
 * @returns 아이디값
 */
const getIdCookie = () => {
  const value = "; " + document.cookie;
  const parts = value.split(";id=");
  if (parts.length === 2) {
    return Number(parts.pop().split(";").shift());
  } else {
    return 0;
  }
};

export default getIdCookie;