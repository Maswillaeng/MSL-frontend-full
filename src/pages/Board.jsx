import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CardRow from "../components/CardRow";
import Loading from "../components/Loading";
import boardData from "../dummy/boardData";
import { infinityScroll } from "../function/utility/infinityScroll";

export default function Board() {
  const location = useLocation();
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
  //api가 생기면 활용할 로딩
  const [loading, setLoading] = useState(false);
  //카테고리 상태관리
  const [categori, setCategori] = useState("전체게시글");
  useEffect(() => {
    if (location.state) {
      //네비를 통해 들어온다면 그 카테고리에 맞게 재설정
      window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
      setCategori(location.state.categori);
    }
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
      <BoardTop
        reloadCardData={reloadCardData}
        rowCount={rowCount}
        categori={categori}
      />
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

const BoardTop = ({ reloadCardData, rowCount, categori }) => {
  //Board의 useEffect로 스크롤과 rowCount를 같이썼더니 의도치않은 랜더링이 일어나서 BoardTop을 활용해서 변경하기로함
  useEffect(() => {
    reloadCardData(rowCount);
  }, [rowCount]);
  return (
    <div className={`d-flex flex-column justify-content-flex w-100 mt-1 `}>
      <h1 className="ps-5">{categori}</h1>
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
