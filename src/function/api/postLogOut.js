import axios from "axios";
import getUserCookie from "../cookie/getUserCookie";

/**
 * 로그아웃
 */
export const postLogOut = async () => {
  const user = { user_id: getUserCookie("user") };
  axios.post("http://localhost:8080/logout", user, {
    headers: {
      "Content-Type": `application/json`,
    },
  });
};
