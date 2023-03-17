import axios from "axios";

/**
 * 현재 로그인한 유저 데이터 조회
 */
export const getUser = async (id) => {
  return await axios.get(`http://localhost:8080/api/user/${id}`);
};
