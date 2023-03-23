import axios from "axios";

/**
 * 대댓글 작성
 */
export const postReply = async (postId, commentId, data) => {
  return await axios.post(
    `http://localhost:8080/api/post/${postId}/${commentId}/comment`,
    data,
    {
      headers: {
        "Content-Type": `application/json`,
      },
    }
  );
};
