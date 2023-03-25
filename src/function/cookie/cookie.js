/**
 * 쿠키를 갖고오는 함수
 * @returns 아이디값
 */
export const getIdCookie = () => {
  const value = "; " + document.cookie;
  const parts = value.split("; id=");
  if (parts.length === 2) {
    return Number(parts[1]);
  } else {
    return 0;
  }
};

/**
 * 쿠키 삭제
 */
export const deleteIdCookie = () => {
  document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;";
};

/**
 * id쿠키를 저장하고 전달받은 시간 뒤에 삭제되도록 도와주는 함수
 */
export const setIdCookie = (id, time) => {
  const now = new Date();
  const [hours, minutes, seconds] = time.split(":").map(Number);
  const expirationTime = (hours * 60 + minutes) * 60 + seconds;
  const futureTime = new Date(now.getTime() + expirationTime * 1000);
  const formattedTime = futureTime.toUTCString();
  document.cookie = `id=${id};expires=${formattedTime};path=/`;
};
