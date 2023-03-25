import axios from "axios";

/**
 * 로그인
 */
export const postLogin = async (user) => {
  return await axios.post("http://localhost:8080/login", user, {
    headers: {
      "Content-Type": `application/json`,
    },
  });
};

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

/**
 * 회원가입
 */
export const postSignUp = async (member) => {
  return await axios.post("http://localhost:8080/api/sign", member, {
    headers: {
      "Content-Type": `application/json`,
    },
  });
};


/**
 * 현재 로그인한 유저 데이터 조회
 */
export const getUser = async (id) => {
  if (id === 0) {
    return {};
  }
  return await axios.get(`http://localhost:8080/api/user/${id}`).then((res) => {
    const user = res.data.result;
    return user;
  });
};
