import axios from "axios";

/**
 * 댓글 수정
 */
export const putComment = async (postId, commentId, data) => {
  return await axios.put(
    `http://localhost:8080/api/post/${postId}/${commentId}/comment`,
    data,
    {
      headers: {
        "Content-Type": `application/json`,
      },
    }
  );
};
