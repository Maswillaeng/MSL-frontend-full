import axios from "axios";

export const getPost = async (data) => {
  axios
    .post("http://localhost:8080/api/post", data, {
      headers: {
        "Content-Type": `application/json`,
      },
      withCredentials: true,
    })
};
