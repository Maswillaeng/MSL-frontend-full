import axios from "axios";

export const getLogin = async (user) => {
  await axios.post("http://localhost:8080/login", user, {
    headers: {
      "Content-Type": `application/json`,
    },
    withCredentials: true,
  });
};
