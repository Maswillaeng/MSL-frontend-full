import { selector } from "recoil";
import { getUser } from "../function/api/log";
import { boardDataState, currentUserState, lastSliceNumState } from "./atom";

//게시글 분할
export const boardDataSliceState = selector({
  key: "boardDataSliceState",
  get: ({ get }) => {
    const allData = get(boardDataState);
    const lastCount = get(lastSliceNumState);
    return allData.slice(0, 4 * lastCount);
  },
});

//게시글 길이
export const sliceDataLengthState = selector({
  key: "sliceDataLengthState",
  get: ({ get }) => {
    const length = get(boardDataSliceState).length;
    return length;
  },
});

//로그인한 유저의 정보
export const userState = selector({
  key: "userState",
  get: ({ get }) => {
    const userId = get(currentUserState);
    return getUser(userId);
  },
});
