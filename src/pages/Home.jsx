import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import CardRow from "../components/CardRow";
import DropdownLi from "../components/DropdownLi";
import getUserCookie from "../function/cookie/getUserCookie";
import Carousel from "../components/Carousel";
import { getBoard } from "../function/api/getBoard";

const HomeBox = styled.div.attrs({
  className:
    "d-flex flex-column justify-content-start align-items-center mt-3 px-0",
})``;

const Home = () => {
  const navigate = useNavigate();
  return (
    <HomeBox>
      <TopSearchBox navigate={navigate} />
      <TopMainNavBox navigate={navigate} />
      <Carousel />
      <BottomHotBox />
    </HomeBox>
  );
};

const TopSearchBox = ({ navigate }) => {
  //검색 값 상태
  const [inputVal, setInputVal] = useState("");

  //검색 값 change 이벤트
  const changeVal = (e) => {
    setInputVal(e.target.value);
  };

  //검색 버튼 이벤트
  const buttonEvent = () => {
    navigate("/board", {
      state: { categori: `${inputVal}에 대한 검색결과입니다.` },
    });
  };

  return (
    <div className="mb-3 w-100 d-flex justify-content-center align-items-center">
      <form className="my-2 d-flex justify-content-center align-items-center">
        <input
          type="text"
          className="form-control w-75 me-2"
          value={inputVal}
          onChange={changeVal}
          placeholder="검색어를 입력해주세요."
        />
        <Button className="w-25" buttonEvent={buttonEvent} message={"검색"} />
      </form>
    </div>
  );
};

const TopMainNavBox = ({ navigate }) => {
  //칵테일 레시피 카테고리로 이동하기 위한 이벤트
  const moveRecipe = () => {
    navigate("/board", { state: { categori: "칵테일 레시피" } });
  };

  //nav값을 셋팅하기 위한 배열
  const eventLi = [
    {
      name: "서울/경기",
      event: () => {
        navigate("/board", { state: { categori: "서울/경기" } });
      },
    },
    {
      name: "광역시",
      event: () => {
        navigate("/board", { state: { categori: "광역시" } });
      },
    },
    {
      name: "그 외",
      event: () => {
        navigate("/board", { state: { categori: "그 외" } });
      },
    },
  ];

  return (
    <div className="mb-5 w-100 d-flex justify-content-center align-items-center">
      <ul className="nav nav-pills w-75 d-flex justify-content-center align-items-center p-3 fs-3">
        {getUserCookie("user") && (
          <li className="nav-item flex-grow-1 d-flex justify-content-center align-items-center ">
            <a
              className="nav-link main-bg-color"
              aria-current="page"
              href="/myPage"
            >
              <span className="main-color">MY페이지</span>
            </a>
          </li>
        )}
        <li className="nav-item flex-grow-1 d-flex justify-content-center align-items-center">
          <span onClick={moveRecipe} className="main-color pointer">
            칵테일 레시피
          </span>
        </li>
        <li className="nav-item dropdown flex-grow-1 d-flex justify-content-center align-items-center ">
          <div
            className="nav-link dropdown-toggle main-color pointer"
            data-bs-toggle="dropdown"
          >
            <span className="main-color">칵테일 맛집</span>
          </div>
          <ul className="dropdown-menu ">
            {eventLi.map((x) => (
              <DropdownLi data={x} key={x.name} />
            ))}
          </ul>
        </li>
        <li className="nav-item flex-grow-1 d-flex justify-content-center align-items-center">
          <span className="main-color pointer">미정</span>
        </li>
      </ul>
    </div>
  );
};

const BottomHotBox = () => {
  //전체 데이터를 저장하는 상태
  const [boardData, setBoardData] = useState([]);

  //1줄의 카드 데이터들을 보관하는 상태
  const [rowData, setRowData] = useState([]);

  //새로운 1줄의 카드 데이터들을 가져오기 위한 이벤트
  const addRowData = (count) => {
    if (boardData.slice(4 * (count - 1), 4 * count).length !== 0) {
      setRowData([...rowData, boardData.slice(4 * (count - 1), 4 * count)]);
    }
  };

  //카드 줄 카운트를 위한 상태
  const [rowCount, setRowCount] = useState(1);

  //카드 줄을 늘려주는 이벤트
  const upRowCount = () => {
    setRowCount(rowCount + 1);
  };

  //카드 줄이 늘어난다면 새로운 카드 데이터들을 갖고오도록 도와주는 이펙트
  useEffect(() => {
    if (rowCount > 1) {
      addRowData(rowCount);
    }
  }, [rowCount]);

  //최초 1회 데이터를 셋팅하기 위한 이펙트
  useEffect(() => {
    getBoard()
      .then((res) => {
        const data = res.data.result.reverse();
        setBoardData(data);
        return data;
      })
      .then((data) => {
        const firstData = data.slice(0, 4);
        setRowData([firstData]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="w-75 my-5">
      <div className="ps-3 fs-1 mb-4">인기레시피</div>
      <div className="w-100 d-flex flex-column">
        {rowData.map((x, i) => (
          <CardRow key={i} cardList={x} />
        ))}
      </div>
      <div className="d-flex justify-content-center align-items-center w-100 flex-column pb-5">
        {boardData.length >= rowCount * 4 && (
          <Button
            message={"더보기"}
            size={"lg"}
            addStyle="px-5"
            buttonEvent={upRowCount}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
