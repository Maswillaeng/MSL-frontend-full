import axios from "axios";

/**
 * 댓글 삭제
 */
export const deleteComment = async (postId, commentId) => {
  return await axios.delete(
    `http://localhost:8080/api/${postId}/${commentId}`,
    {
      headers: {
        "Content-Type": `application/json`,
      },
    }
  );
};
