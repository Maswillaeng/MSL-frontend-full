import axios from "axios";

/**
 * 게시글 작성
 */
export const postBoard = async (data) => {
  axios
    .post("http://localhost:8080/api/post", data, {
      headers: {
        "Content-Type": `application/json`,
      },
    })
};
