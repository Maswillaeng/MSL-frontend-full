import axios from "axios";

/**
 * 댓글 삭제
 */
export const deleteComment = async (postId, commentId) => {
  return await axios.delete(
    `http://localhost:8080/api/post/${postId}/${commentId}`,
    {
      headers: {
        "Content-Type": `application/json`,
      },
    }
  );
};

/**
 * 해당 글의 모든 댓글 조회
 */
export const getComment = async (number) => {
  return await axios.get(`http://localhost:8080/api/post/${number}`);
};

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
