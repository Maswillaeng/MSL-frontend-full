import axios from "axios";

/**
 * 모든 게시글 조회
 */
export const getBoard = async () => {
  return await axios.get("http://localhost:8080/api/post/page");
};
