/**
 * id쿠키를 저장하고 전달받은 시간 뒤에 삭제되도록 도와주는 함수
 */
const setIdCookie = (id, time) => {
  const now = new Date();
  const [hours, minutes, seconds] = time.split(":").map(Number);
  const expirationTime = (hours * 60 + minutes) * 60 + seconds;
  const futureTime = new Date(now.getTime() + expirationTime * 1000);
  const formattedTime = futureTime.toUTCString();
  document.cookie = `id=${id};expires=${formattedTime};path=/`;
};

export default setIdCookie;
