import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import CardRow from "../components/CardRow";
import Loading from "../components/Loading";
import SkeletonUi from "../components/SkeletonUi";
import boardData from "../dummy/boardData";
import useIntersectionObserver from "../function/hook/useIntersectionObserver";

const Board = () => {
  // axios
  // .get(
  //   "http://localhost:8080/api/post/page",
  //   {},
  //   {
  //     headers: {
  //       "Content-Type": `application/json`,
  //     },
  //     withCredentials: true,
  //   }
  // )
  // .then((res) => {
  //   console.log(res);
  // })
  // .catch((err) => {
  //   alert("실패요");
  //   console.log(err);
  // });
  const location = useLocation();

  //1줄의 카드 데이터 상태
  const [cardData, setCardData] = useState(boardData.slice(0, 4));

  //1줄의 카드 데이터를 셋팅하고 리턴
  const reloadCardData = async (number) => {
    const data = boardData.slice(4 * (number - 1), 4 * number);
    setCardData(data);
    return data;
  };

  //전체 데이터를 보관하는 상태
  const [rowData, setRowData] = useState([cardData]);

  //cardData를 전달받아서 데이터를 추가
  const addRowData = (data) => {
    if (data.length !== 0) {
      setRowData([...rowData, data]);
    }
  };

  //카드 줄 카운트 상태
  const [rowCount, setRowCount] = useState(1);

  //로딩 상태
  const [loading, setLoading] = useState(false);

  //카테고리 상태
  const [categori, setCategori] = useState("전체게시글");

  //네비를 통해 들어온다면 최초 1회만 그 카테고리에 맞게 재설정
  useEffect(() => {
    if (location.state) {
      window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
      setCategori(location.state.categori);
      location.state = undefined;
    }
  }, []);

  //무한스크롤 observe 타겟
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
      id="board-box"
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
  const loadingArr = Array(4).fill(1);
  return (
    <>
      <div className="d-flex justify-content-start align-items-start w-100 mb-5 fs-3 pb-5 blink">
        {loading && (
          <div className="d-flex flex-column justify-content-start align-items-start w-100 ">
            <div className="container text-center">
              <div className="row g-5 mt-3 mb-5">
                {loadingArr.map((x, i) => (
                  <SkeletonUi key={i} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div ref={target}></div>
    </>
  );
};

export default Board;
