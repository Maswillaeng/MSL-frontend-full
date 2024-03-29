import { atom } from "recoil";
import { getBoard } from "../function/api/board";
import { getIdCookie } from "../function/cookie/cookie";

//로그인에 성공한 유저의 id정보
export const currentUserState = atom({
  key: "currentUserState",
  default: getIdCookie(),
});

//게시글 slice를 위한 숫자
export const sliceCountState = atom({
  key: "sliceCountState",
  default: 1,
});

//게시글 데이터
export const boardDataState = atom({
  key: "boardDataState",
  default: [],
});

//게시글 사이즈
export const boardSizeState = atom({
  key: "boardSizeState",
  default: 20,
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

//카테고리 상태
export const categoryState = atom({
  key: "categoryState",
  default: "전체게시글",
});
