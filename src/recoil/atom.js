import { atom } from "recoil";
import { getBoard } from "../function/api/getBoard";
import getIdCookie from "../function/cookie/getIdCookie";

//로그인에 성공한 유저의 id정보
export const currentUserState = atom({
  key: "currentUserState",
  default: getIdCookie(),
});

//게시글 데이터
export const boardDataState = atom({
  key: "boardDataState",
  default: getBoard().then((res) => {
    const data = res.data.result.reverse();
    return data;
  }),
});

//무한스크롤을 위한 카운트
export const lastSliceNumState = atom({
  key: "lastSliceNumState",
  default: 1,
});

//댓글 데이터
export const commentDataState = atom({
  key: "commentDataState",
  default: [],
});
