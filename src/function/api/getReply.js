import axios from "axios";

/**
 * 대댓글 조회
 */
export const getReply = async (postId,commentId) => {
  return await axios.get(`http://localhost:8080/api/post/${postId}/${commentId}/comment`);
};
