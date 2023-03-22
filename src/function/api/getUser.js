import axios from "axios";

/**
 * 현재 로그인한 유저 데이터 조회
 */
export const getUser = async (id) => {
  if (id === 0) {
    return undefined;
  }
  return await axios.get(`http://localhost:8080/api/user/${id}`).then((res) => {
    const user = res.data.result;
    return user;
  });
};
