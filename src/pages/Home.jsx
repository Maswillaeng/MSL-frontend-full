import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import CardRow from "../components/CardRow";
import DropdownLi from "../components/DropdownLi";
import boardData from "../dummy/boardData";
import getUser from "../function/cookie/getUser";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div
      className="container rounded d-flex flex-column justify-content-start align-items-center mt-3 px-0"
      style={{
        maxWidth: "100vw",
      }}
    >
      <TopSearchBox navigate={navigate} />
      <TopMainNavBox navigate={navigate} />
      <TopImgBox />
      <BottomHotBox />
    </div>
  );
};

const TopSearchBox = ({ navigate }) => {
  const [inputVal, setInputVal] = useState("");
  const changeVal = (e) => {
    setInputVal(e.target.value);
  };
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
  const moveRecipe = () => {
    navigate("/board", { state: { categori: "칵테일 레시피" } });
  };
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
        {getUser("user") && (
          <li className="nav-item flex-grow-1 d-flex justify-content-center align-items-center">
            <a className="nav-link active" aria-current="page" href="/myPage">
              MY페이지
            </a>
          </li>
        )}
        <li
          onClick={moveRecipe}
          className="nav-item flex-grow-1 d-flex justify-content-center align-items-center"
        >
          <a className="nav-link" href="/board">
            칵테일 레시피
          </a>
        </li>
        <li className="nav-item dropdown flex-grow-1 d-flex justify-content-center align-items-center">
          <a
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
            href="#!"
            role="button"
            aria-expanded="false"
          >
            칵테일 맛집
          </a>
          <ul className="dropdown-menu ">
            {eventLi.map((x) => (
              <DropdownLi data={x} key={x.name} />
            ))}
          </ul>
        </li>
        <li className="nav-item flex-grow-1 d-flex justify-content-center align-items-center">
          <a
            className="nav-link disabled"
            href="#!"
            tabIndex="-1"
            aria-disabled="true"
          >
            미정
          </a>
        </li>
      </ul>
    </div>
  );
};

const TopImgBox = () => {
  return (
    <div className="w-100 text-center bg-secondary mb-5">
      <img
        className="w-100 "
        src={"img/KakaoTalk_20230225_174505991.png"}
        alt="1"
      />
    </div>
  );
};

const BottomHotBox = () => {
  const [rowData, setRowData] = useState([boardData.slice(0, 4)]);
  const addRowData = (count) => {
    if (boardData.slice(4 * (count - 1), 4 * count).length !== 0) {
      setRowData([...rowData, boardData.slice(4 * (count - 1), 4 * count)]);
    }
  };
  const [rowCount, setRowCount] = useState(1);
  const upRowCount = () => {
    setRowCount(rowCount + 1);
  };
  useEffect(() => {
    if (rowCount > 1) {
      addRowData(rowCount);
    }
  }, [rowCount]);
  return (
    <div className="w-75 my-5">
      <div className="ps-3 fs-1 ">인기레시피</div>
      <div className="my-3 w-100">
        {rowData.map((x, i) => (
          <CardRow key={i} cardList={x} />
        ))}
      </div>
      <div className="d-flex justify-content-center align-items-center w-100">
        {rowData[rowData.length - 1].length % 4 === 0 && (
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
