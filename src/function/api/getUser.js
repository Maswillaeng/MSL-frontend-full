import axios from "axios";
import getUserCookie from "../cookie/getUserCookie";

/**
 * 현재 로그인한 유저 데이터 조회
 */
export const getUser = async () => {
  const user = { user_id: getUserCookie("user") };
  return await axios.get("http://localhost:8080/api/user", user);
};
