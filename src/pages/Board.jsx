import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import CardRow from "../components/CardRow";
import Loading from "../components/Loading";
import boardData from "../dummy/boardData";
import useIntersectionObserver from "../hook/useIntersectionObserver";

const Board = () => {
  const location = useLocation();
  //카드 카운트
  const [cardData, setCardData] = useState(boardData.slice(0, 4));
  //rowCount를 전달받아서 데이터를 셋팅하고 리턴
  const reloadCardData = async (number) => {
    const data = boardData.slice(4 * (number - 1), 4 * number);
    setCardData(data);
    return data;
  };
  //cardData를 전달받아서 데이터를 추가
  const [rowData, setRowData] = useState([cardData]);
  const addRowData = (data) => {
    if (data.length !== 0) {
      setRowData([...rowData, data]);
    }
  };
  //카드 줄 카운트
  const [rowCount, setRowCount] = useState(1);
  //api가 생기면 활용할 로딩
  const [loading, setLoading] = useState(false);
  //카테고리 상태관리
  const [categori, setCategori] = useState("전체게시글");
  useEffect(() => {
    if (location.state) {
      //네비를 통해 들어온다면 그 카테고리에 맞게 재설정
      window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
      setCategori(location.state.categori);
      location.state = undefined;
    }
  }, []);
  //무한스크롤
  const target = useRef(null);
  //커스텀훅 사용
  const [observe, unobserve] = useIntersectionObserver(() => {
    setRowCount((rowCount) => rowCount + 1);
  });
  useEffect(() => {
    // 타겟 설정
    if (rowCount === 1) {
      observe(target.current);
    }
    //마지막 데이터라면 타겟 해제
    if (cardData.length !== 4) {
      unobserve(target.current);
    }
    //카운트 1증가하면 리로드해서 데이터 추가
    if (rowCount > 1) {
      setLoading(true);
      reloadCardData(rowCount)
        .then((data) => {
          addRowData(data);
        })
        .then(() => setLoading(false));
    }
  }, [rowCount]);

  return (
    <div
      className="container rounded d-flex flex-column justify-content-center align-items-center my-5"
      style={{
        maxWidth: "90vw",
        minHeight: "100vh",
      }}
    >
      <BoardTop categori={categori} />
      <BoardMiddle rowData={rowData} />
      <BoardBottom target={target} loading={loading} />
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

const BoardMiddle = ({ rowData }) => {
  return (
    <div
      className={`d-flex flex-column justify-content-start align-items-center w-100 flex-grow-1 mt-5`}
    >
      <div className="container text-center">
        {rowData.map((x, i) => (
          <CardRow cardList={x} key={i} />
        ))}
      </div>
    </div>
  );
};

const BoardBottom = ({ loading, target }) => {
  const loadingArr = Array(3).fill(1);
  return (
    <div
      ref={target}
      className={`d-flex justify-content-center align-items-center w-100 mt-5 mb-5 fs-3`}
    >
      {loading &&
        loadingArr.map((x, i) => <Loading key={i} addStyle={"mx-5"} />)}
    </div>
  );
};

export default Board;
