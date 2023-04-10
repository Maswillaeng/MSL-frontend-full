import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import Card from "../components/common/Card";
import SkeletonUi from "../components/common/SkeletonUi";
import useIntersectionObserver from "../function/hook/useIntersectionObserver";
import {
  boardDataState,
  boardSizeState,
  categoryState,
  lastSliceNumState,
} from "../recoil/atom";
import { boardDataSliceState, sliceDataLengthState } from "../recoil/selector";
import {
  getBoard,
  getCategoryBoard,
  getSearchBoard,
} from "../function/api/board";

const Board = () => {
  const location = useLocation();

  //게시글 사이즈
  const [boardSize, setBoardSize] = useRecoilState(boardSizeState);

  //게시글 전체데이터
  const [boardData, setBoardData] = useRecoilState(boardDataState);

  //게시글 slice 데이터
  const boardDataSlice = useRecoilValue(boardDataSliceState);

  //현재 불러와진 글의 개수
  const sliceDataLength = useRecoilValue(sliceDataLengthState);

  //게시글 추가 로드를 위한 상태
  const [lastSliceNum, setLastSliceNum] = useRecoilState(lastSliceNumState);

  //카테고리 상태
  const [categori, setCategori] = useRecoilState(categoryState);

  //네비를 통해 들어온다면 최초 1회만 그 카테고리에 맞게 재설정
  useEffect(() => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
    if (location.state) {
      setCategori(location.state.categori);
    }
    setLastSliceNum(1);
  }, [location, setCategori, setLastSliceNum]);

  //로딩 상태
  const [loading, setLoading] = useState(false);

  //게시글 데이터를 가져오는 이펙트
  useEffect(() => {
    if (sliceDataLength % 4 !== 0)
      getBoard(boardSize).then((res) =>
        setBoardData([...boardData, ...res.data.result])
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardSize, setBoardData]);

  //카테고리를 통해 넘어왔을 때, 카테고리에 맞는 글을 셋팅
  useEffect(() => {
    if (location.state) {
      const option = location.state.option[0];
      const content = location.state.option[1];
      getSearchBoard(option, content).then((res) =>
        setBoardData(res.data.result.content)
      );
    } else {
      if (categori !== "전체게시글")
        getCategoryBoard(categori, boardSize).then((res) =>
          setBoardData(res.data.result.content)
        );
    }
  }, [boardSize, categori, setBoardData, location.state]);

  //무한스크롤 observe 타겟
  const target = useRef(null);

  //무한스크롤 커스텀훅 사용
  const [observe, unobserve] = useIntersectionObserver(() => {
    setLoading(true);
    setLastSliceNum((lastSliceNum) => lastSliceNum + 1);
    setLoading(false);
  });

  //lastSliceNum이 4의 배수일때 한 턴 빠르게 데이터를 미리 가져올 수 있도록
  useEffect(() => {
    if (lastSliceNum % 4 === 0) {
      setBoardSize(boardSize + 20);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastSliceNum, setBoardSize, sliceDataLength]);

  useEffect(() => {
    // 타겟 설정
    observe(target.current);
    //마지막 데이터라면 타겟 해제 (카드 개수가 4개가 안된다면)
    if (sliceDataLength % 4 !== 0) {
      unobserve(target.current);
    }
  }, [observe, sliceDataLength, unobserve]);

  return (
    <div
      className="container rounded d-flex flex-column justify-content-center align-items-center my-5"
      id="board-box"
    >
      <BoardTop categori={categori} />
      <BoardMiddle boardDataSlice={boardDataSlice} />
      <BoardBottom
        target={target}
        loading={loading}
        sliceDataLength={sliceDataLength}
      />
    </div>
  );
};

const BoardTop = ({ categori }) => {
  return (
    <div className={`d-flex flex-column justify-content-flex w-100 mt-1 `}>
      <h1 className="ps-5">{categori}</h1>
    </div>
  );
};

const BoardMiddle = ({ boardDataSlice }) => {
  return (
    <div
      className={`d-flex flex-column justify-content-start align-items-center w-100 flex-grow-1 mt-5`}
    >
      <div className="mt-5 w-75 row">
        {boardDataSlice.map((data, i) => (
          <Card data={data} key={data.createAt + i} />
        ))}
      </div>
    </div>
  );
};

const BoardBottom = ({ loading, target, sliceDataLength }) => {
  const loadingArr = Array(4).fill(1);
  return (
    <div
      className="d-flex justify-content-start align-items-start w-100 mb-5 fs-3 flex-column  blink"
      ref={target}
    >
      {loading && (
        <div className="d-flex flex-column justify-content-center align-items-center w-100 ">
          <div className="row g-5 mt-3 mb-5 w-75">
            {loadingArr.map((x, i) => (
              <SkeletonUi key={i} />
            ))}
          </div>
        </div>
      )}
      {sliceDataLength % 4 !== 0 && (
        <div className="d-flex justify-content-center align-items-center w-100 pt-5">
          마지막 글입니다.
        </div>
      )}
    </div>
  );
};

export default Board;
