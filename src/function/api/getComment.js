import axios from "axios";

/**
 * 해당 글의 모든 댓글 조회
 */
export const getComment = async (number) => {
  return await axios.get("http://localhost:8080/api/post/page");
};
