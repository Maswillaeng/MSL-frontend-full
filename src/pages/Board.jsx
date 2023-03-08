import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import CardRow from "../components/CardRow";
import SkeletonUi from "../components/SkeletonUi";
import { getBoard } from "../function/api/getBoard";
import useIntersectionObserver from "../function/hook/useIntersectionObserver";

const Board = () => {
  const location = useLocation();

  //네비를 통해 들어온다면 최초 1회만 그 카테고리에 맞게 재설정
  useEffect(() => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
    if (location.state) {
      setCategori(location.state.categori);
      location.state = undefined;
    }
    //board 데이터 저장
    getBoard()
      .then((res) => {
        const data = res.data.result.reverse();
        setBoardData(data);
        return data;
      })
      .then((data) => {
        const firstData = data.slice(0, 4);
        setCardData(firstData);
        setRowData([firstData]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [boardData, setBoardData] = useState([]);

  //1줄의 카드 데이터 상태
  const [cardData, setCardData] = useState([]);

  /**
   * 1줄의 카드 데이터를 셋팅하고 리턴
   */
  const reloadCardData = async (number) => {
    const data = boardData.slice(4 * (number - 1), 4 * number);
    setCardData(data);
    return data;
  };

  //전체 데이터를 보관하는 상태
  const [rowData, setRowData] = useState([]);

  /**
   * cardData를 전달받아서 데이터를 추가
   */
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

  //무한스크롤 observe 타겟
  const target = useRef(null);

  //커스텀훅 사용
  const [observe, unobserve] = useIntersectionObserver(() => {
    setRowCount((rowCount) => rowCount + 1);
  });

  //boardData를 넣어준 이유는 최초 페이지 로드 시, 데이터가 없는 상태라서 target이 뜬금없는 곳에 가길래 boardData를 통해 제대로 한 번 더 설정되도록 함
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
  }, [rowCount, boardData]);

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
      <div className="container text-center mt-5">
        {rowData.map((data, i) => (
          <CardRow cardList={data} key={i} />
        ))}
      </div>
    </div>
  );
};

const BoardBottom = ({ loading, target }) => {
  const loadingArr = Array(4).fill(1);
  return (
    <>
      <div
        className="d-flex justify-content-start align-items-start w-100 mb-5 fs-3  blink"
        ref={target}
      >
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
      <div></div>
    </>
  );
};

export default Board;
