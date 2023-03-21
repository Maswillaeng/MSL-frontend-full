import { atom } from "recoil";
import { getBoard } from "../function/api/getBoard";

//로그인에 성공한 유저의 id정보
export const currentUserState = atom({
  key: "currentUserState",
  default: 0,
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