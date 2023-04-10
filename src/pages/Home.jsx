import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/common/Button";
import DropdownLi from "../components/common/DropdownLi";
import Carousel from "../components/home/Carousel";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentUserState, lastSliceNumState } from "../recoil/atom";
import { boardDataSliceState, sliceDataLengthState } from "../recoil/selector";
import Card from "../components/common/Card";

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

  /**
   * 검색 값 change 이벤트
   */
  const changeVal = (e) => {
    setInputVal(e.target.value);
  };

  /**
   * 검색 버튼 이벤트
   */
  const buttonEvent = () => {
    navigate("/board", {
      state: { categori: `${inputVal}에 대한 검색결과입니다.` },
    });
  };

  return (
    <div className="mb-3 w-100 d-flex justify-content-center align-items-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="my-2 d-flex justify-content-center align-items-center"
      >
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
  //로그인 체크 상태
  const currentUser = useRecoilValue(currentUserState);

  /**
   * 칵테일 레시피 카테고리로 이동하기 위한 이벤트
   */
  const moveRecipe = () => {
    navigate("/board", { state: { categori: "레시피" } });
  };

  //nav값을 셋팅하기 위한 배열
  const eventLi = [
    {
      name: "서울/경기",
      event: () => {
        navigate("/board", { state: { categori: "서울" } });
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
        navigate("/board", { state: { categori: "그_외" } });
      },
    },
  ];

  return (
    <div className="mb-5 w-100 d-flex justify-content-center align-items-center">
      <ul className="nav nav-pills w-75 d-flex justify-content-center align-items-center p-3 fs-3">
        {currentUser !== 0 && (
          <li className="nav-item flex-grow-1 d-flex justify-content-center align-items-center ">
            <span
              className="main-color pointer"
              onClick={() => navigate(`/myPage/${currentUser}`)}
            >
              MY페이지
            </span>
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
  //게시글 데이터
  const boardSliceData = useRecoilValue(boardDataSliceState);

  //현재 불러와진 글의 개수
  const sliceDataLength = useRecoilValue(sliceDataLengthState);

  //게시글 추가 로드를 위한 상태
  const [lastSliceNum, setLastSliceNum] = useRecoilState(lastSliceNumState);

  /**
   * 게시글 추가 로드를 위한 count up
   */
  const upSliceCount = () => {
    setLastSliceNum(lastSliceNum + 1);
  };

  return (
    <div className="w-75 my-5">
      <div className="ps-3 fs-1 mb-4">인기레시피</div>
      <div className="w-100 row ms-1">
        {boardSliceData.map((data, i) => (
          <Card data={data} key={data.createAt + i} />
        ))}
      </div>
      <div className="d-flex justify-content-center align-items-center w-100 flex-column pb-5">
        {sliceDataLength !== 0 && sliceDataLength % 4 === 0 ? (
          <Button
            message={"더보기"}
            size={"lg"}
            addStyle="px-5"
            buttonEvent={upSliceCount}
          />
        ) : (
          <div className="py-3 fs-2">
            {sliceDataLength === 0
              ? "등록된 글이 없습니다."
              : "마지막 글입니다."}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
