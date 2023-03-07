import axios from "axios";

/**
 * 게시글 추천 -1
 */
export const deleteBoardLike = async (num, data) => {
  return await axios.delete(`http://localhost:8080/api/${num}/like`, data, {
    headers: {
      "Content-Type": `application/json`,
    },
  });
};
