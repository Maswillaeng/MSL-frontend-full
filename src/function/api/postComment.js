import axios from "axios";

export const postComment = async (num, data) => {
  return await axios.post(
    `http://localhost:8080/api/post/${num}/comment`,
    data,
    {
      headers: {
        "Content-Type": `application/json`,
      },
    }
  );
};
