import axios from "axios";

export const postSignUp = async (member) => {
  return await axios.post("http://localhost:8080/api/sign", member, {
    headers: {
      "Content-Type": `application/json`,
    },
  });
};
