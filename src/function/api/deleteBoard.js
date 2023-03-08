import axios from "axios";

/**
 * 게시글 삭제
 */
export const deleteBoard = async (num) => {
  return await axios.delete(`http://localhost:8080/api/postD/${num}`, {
    headers: {
      "Content-Type": `application/json`,
    },
  });
};
