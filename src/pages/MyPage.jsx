import { useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import members from "../dummy/members";
import getUser from "../function/cookie/getUser";

const MyPage = () => {
  //카테고리 상태
  const [categori, setCategori] = useState("");
  return (
    <div className="container rounded d-flex flex-column justify-content-start align-items-start mt-3 p-5">
      <TopProfileTop />
      <TopProfileBottom />
      <BottomCategori setCategori={setCategori} categori={categori} />
      <div className="mb-5 px-5 d-flex justify-content-center align-items-center w-100">
        글
      </div>
    </div>
  );
};

const UserImg = styled.img.attrs({
  className: "rounded-circle",
  alt: "",
})`
  height: 150px;
`;

const TopProfileTop = () => {
  return (
    <div className="mb-5 d-flex px-5">
      <div className="me-5">
        <UserImg
          src={
            members.filter((x) => x.email === "shdomi8599@naver.com")[0]
              .userImage
          }
        />
      </div>
      <div className="d-flex flex-column">
        <div className="flex-grow-1 d-flex justify-content-start align-items-center fs-3 mb-4">
          shdomi8599
        </div>
        <div>소개글</div>
        <div className="flex-grow-1 d-flex justify-content-start align-items-center">
          <span>칵테일은 관심없다.</span>
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
