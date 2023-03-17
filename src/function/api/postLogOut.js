import axios from "axios";


/**
 * 로그아웃
 */
export const postLogOut = async () => {
  // const user = { user_id: getUserCookie("user") };
  axios.post("http://localhost:8080/logout", {
    headers: {
      "Content-Type": `application/json`,
    },
  });
};
