import axios from "axios";

/**
 * 모든 게시글 조회
 */
export const getBoard = async (num) => {
  return await axios.get(
    `http://localhost:8080/api/post/page?page=${Math.floor(
      (num / 20) - 1
    )}&size=${num}`
  );
};

/**
 * 게시글 삭제
 */
export const deleteBoard = async (num) => {
  return await axios.delete(`http://localhost:8080/api/post/${num}`, {
    headers: {
      "Content-Type": `application/json`,
    },
  });
};

/**
 * 게시글 추천 -1
 */
export const deleteBoardLike = async (num, data) => {
  return await axios.delete(`http://localhost:8080/api/${num}/like`, data, {
    headers: {
      "Content-Type": `application/json`,
    },
  });
};

/**
 * 단일 게시글 조회
 */
export const getPickBoard = async (id) => {
  return await axios.get(`http://localhost:8080/api/post/${id}`);
};

/**
 * 게시글 작성
 */
export const postBoard = async (data) => {
  axios.post("http://localhost:8080/api/post", data, {
    headers: {
      "Content-Type": `application/json`,
    },
  });
};

/**
 * 게시글 추천 +1
 */
export const postBoardLike = async (num, data) => {
  return await axios.post(`http://localhost:8080/api/${num}/like`, data, {
    headers: {
      "Content-Type": `application/json`,
    },
  });
};

/**
 * 게시글 수정
 */
export const putBoard = async (num, postData) => {
  return await axios.put(`http://localhost:8080/api/post/${num}`, postData, {
    headers: {
      "Content-Type": `application/json`,
    },
  });
};

/**
 * 게시글 카테고리 별 조회
 */
export const getCategoryBoard = async (category, size) => {
  return await axios.get(
    `http://localhost:8080/api/post/list?category=${category}&page=0&size=${size}`
  );
};

/**
 * 게시글 검색
 */
export const postSearchBoard = async (category, content, size = 20) => {
  return await axios.post(
    `http://localhost:8080/api/post/search?postWriter=${category}&page=0&size=${size}`,
    { data: content }
  );
};
