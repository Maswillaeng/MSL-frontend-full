import axios from "axios";

/**
 * 로그인
 */
export const postLogin = async (user) => {
  axios.post("http://localhost:8080/login", user, {
    headers: {
      "Content-Type": `application/json`,
    },
  });
};
