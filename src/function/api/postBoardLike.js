import axios from "axios";

export const postBoardLike = async (num, data) => {
  return await axios.post(`http://localhost:8080/api/${num}/like`, data, {
    headers: {
      "Content-Type": `application/json`,
    },
  });
};
