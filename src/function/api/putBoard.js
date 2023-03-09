import axios from "axios";

/**
 * 게시글 수정
 */
export const putBoard = async (num, postData) => {
  return await axios.put(`http://localhost:8080/api/post/${num}`, postData, {
    headers: {
      "Content-Type": `application/json`,
    },
  });
};
