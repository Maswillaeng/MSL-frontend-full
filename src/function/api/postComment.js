import axios from "axios";

/**
 * 댓글 작성
 */
export const postComment = async (num, data) => {
  return await axios.post(
    `http://localhost:8080/api/post/${num}/comment`,
    data,
    {
      headers: {
        "Content-Type": `application/json`,
      },
    }
  );
};
