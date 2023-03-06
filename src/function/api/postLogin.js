import axios from "axios";

export const postLogin = async (user) => {
   axios.post("http://localhost:8080/login", user, {
    headers: {
      "Content-Type": `application/json`,
    },
  });
};
