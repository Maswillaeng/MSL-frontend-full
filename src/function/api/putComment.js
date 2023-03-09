import axios from "axios";

/**
 * 댓글 수정
 */
export const putComment = async (postId, commentId) => {
  return await axios.put(
    `http://localhost:8080/api/post/${postId}/${commentId}`,
    {
      headers: {
        "Content-Type": `application/json`,
      },
    }
  );
};
