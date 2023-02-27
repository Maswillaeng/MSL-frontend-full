import React, { useEffect, useState } from "react";
import CardRow from "../components/CardRow";
import Loading from "../components/Loading";
import boardData from "../dummy/boardData";
import { infinityScroll } from "../function/infinityScroll";

export default function Board() {
  //클라이언트의 현재 스크롤 체크
  const [scroll, setScroll] = useState(0);
  window.addEventListener("scroll", () => {
    setScroll(document.documentElement.scrollTop);
  });
  //카드 카운트
  const [cardData, setCardData] = useState(boardData.slice(0, 4));

  //rowCount를 전달받아서 활용하면 될듯?
  const reloadCardData = (number) => {
    setCardData(boardData.slice(4 * (number - 1), 4 * number));
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
  console.log(rowCount);
  //api가 생기면 활용할 로딩
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    infinityScroll(setRowCount, scroll, rowCount).then(() => {
      setLoading(false);
    });
  }, [scroll]);
  return (
    <div
      className="container rounded d-flex flex-column justify-content-center align-items-center my-5"
      style={{
        maxWidth: "90vw",
        minHeight: "85vh",
      }}
    >
      <BoardTop reloadCardData={reloadCardData} rowCount={rowCount} />
      <BoardMiddle
        cardData={cardData}
        rowCount={rowCount}
        rowData={rowData}
        reloadCardData={reloadCardData}
        addRowData={addRowData}
      />
      <BoardBottom loading={loading} />
    </div>
  );
}

const BoardTop = ({ reloadCardData, rowCount }) => {
  //useEffect를 스크롤과 rowCount를 같이썼더니 의도치않은 랜더링이 일어나서 top을 활용해서 변경하기로함
  useEffect(() => {
    reloadCardData(rowCount);
  }, [rowCount]);
  return (
    <div className={`d-flex flex-column justify-content-flex w-100 mt-1 `}>
      <h1 className="ps-5">자유게시판</h1>
    </div>
  );
};

const BoardMiddle = ({ rowCount, cardData, rowData, addRowData }) => {
  //cardData가 변경되면 CardRow 추가
  useEffect(() => {
    if (rowCount > 1) {
      addRowData(cardData);
    }
  }, [cardData]);

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

const BoardBottom = ({ loading }) => {
  const loadingArr = Array(3).fill(1);
  return (
    <div
      className={`d-flex justify-content-center align-items-center w-100 mt-5 mb-5 fs-3`}
    >
      {loading &&
        loadingArr.map((x, i) => <Loading key={i} addStyle={"mx-5"} />)}
    </div>
  );
};
