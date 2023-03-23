import axios from "axios";

/**
 * 댓글 작성
 */
export const postComment = async (postId, data) => {
  return await axios.post(
    `http://localhost:8080/api/post/${postId}/comment`,
    data,
    {
      headers: {
        "Content-Type": `application/json`,
      },
    }
  );
};
