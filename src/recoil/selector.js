import { selector } from "recoil";
import { boardDataState, lastSliceNumState } from "./atom";

//게시글 분할
export const boardDataSliceState = selector({
  key: "boardDataSliceState",
  get: ({ get }) => {
    const allData = get(boardDataState);
    const lastCount = get(lastSliceNumState);
    return allData.slice(0, 4 * lastCount);
  },
});

export const sliceDataLengthState = selector({
  key: "sliceDataLengthState",
  get: ({ get }) => {
    const length = get(boardDataSliceState).length;
    return length;
  },
});
