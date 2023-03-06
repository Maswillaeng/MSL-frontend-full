import { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import { getUser } from "../function/api/getUser";

const MyPage = () => {
  //카테고리 상태
  const [categori, setCategori] = useState("");

  //조회하려는 유저의 데이터 상태
  const [userData, setUserData] = useState({});

  //최초 1회 조회하려는 유저의 데이터를 셋팅하기 위한 이펙트
  useEffect(() => {
    getUser()
      .then((res) => {
        setUserData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container rounded d-flex flex-column justify-content-start align-items-start mt-3 p-5">
      <TopProfileTop userData={userData} />
      <TopProfileBottom />
      <BottomCategori setCategori={setCategori} categori={categori} />
      <div className="mb-5 px-5 d-flex justify-content-center align-items-center w-100">
        글
      </div>
    </div>
  );
};

const UserImg = styled.img.attrs({
  className: "rounded-circle img-fluid",
  alt: "",
})``;

const TopProfileTop = ({ userData }) => {
  return (
    <div className="mb-5 d-flex px-5 w-100">
      <div className="me-5 flex-02">
        <UserImg src={userData.userImage} />
      </div>
      <div className="d-flex flex-column">
        <div className="flex-grow-1 d-flex justify-content-start align-items-center fs-3 mb-4">
          <span>{userData.nickname}</span>
        </div>
        <div>소개글</div>
        <div className="flex-grow-1 d-flex justify-content-start align-items-center">
          <span>{userData.introduction}</span>
        </div>
      </div>
    </div>
  );
};

const AccessBox = styled.div.attrs({
  className: "d-flex  justify-content-center align-items-center w-100",
})`
  margin-bottom: -15px;
`;

const TopProfileBottom = () => {
  return (
    <div className="mb-5 d-flex flex-column justify-content-start align-items-start px-5">
      <div>
        <span className="me-3">팔로우 30</span>
        <span>팔로워 30</span>
      </div>
      <AccessBox>
        <Button addStyle={"px-5"} message={"팔로우"} />
      </AccessBox>
      <AccessBox>
        <Button addStyle={"px-4"} message={"메세지 보내기"} />
      </AccessBox>
    </div>
  );
};

const BottomCategori = ({ setCategori, categori }) => {
  //카테고리를 변경하기 위한 이벤트들
  const writeCategori = () => {
    setCategori("작성");
  };
  const recommendCategori = () => {
    setCategori("추천");
  };
  const writeStyle = categori === "작성" ? "bg-dark text-light" : "";
  const recommendStyle = categori === "추천" ? "bg-dark text-light" : "";
  return (
    <div className="mb-5 px-5 d-flex justify-content-center align-items-center w-100 ">
      <div
        className={`flex-grow-1 d-flex justify-content-center align-items-center py-3 border border-dark ${writeStyle} pointer`}
        onClick={writeCategori}
      >
        내가 작성한 글
      </div>
      <div
        className={`flex-grow-1 d-flex justify-content-center align-items-center py-3 border-top border-bottom border-end border-dark ${recommendStyle} pointer`}
        onClick={recommendCategori}
      >
        내가 추천한 글
      </div>
    </div>
  );
};

export default MyPage;
