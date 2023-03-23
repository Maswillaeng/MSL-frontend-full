import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Button from "../components/common/Button";
import SupportBox from "../components/common/SupportBox";
import { deleteFollow } from "../function/api/deleteFollow";
import { postFollow } from "../function/api/postFollow";
import { userState } from "../recoil/selector";

const MyPage = () => {
  const navigate = useNavigate();
  //카테고리 상태
  const [categori, setCategori] = useState("");

  //조회하려는 유저의 데이터 상태
  const userData = useRecoilValue(userState);

  /**
   * 회원정보 수정하기 이벤트
   */
  const editUser = () => {
    if (window.confirm("회원정보를 수정하시겠습니까?")) {
      navigate("/signUp", { state: { userData } });
    }
  };

  return (
    <div className="container rounded d-flex flex-column justify-content-start align-items-start mt-3 p-5">
      <TopProfileTop userData={userData} />
      <TopProfileBottom userData={userData} />
      <BottomCategori setCategori={setCategori} categori={categori} />
      <div className="mb-5 px-5 d-flex justify-content-center align-items-center w-100">
        글
      </div>
      <SupportBox userData={userData} editUser={editUser} />
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
  className: "d-flex  justify-content-center align-items-center w-100 my-1",
})`
  margin-bottom: -15px;
`;

const TopProfileBottom = ({ userData }) => {
  //구독 숫자
  const [subscribeCount, setSubscribeCount] = useState(0);

  //구독 상태
  const [subscribe, setSubscribe] = useState(false);

  /**
   * 구독 상태와 카운트를 바꿔주는 이벤트
   */
  // const subscribeHandler = () => {
  //   const followUser = { my_id: userData.userId, user_id: data.userId };
  //   setSubscribe(!subscribe);
  //   if (subscribe) {
  //     setSubscribeCount(subscribeCount - 1);
  //     deleteFollow(data.userId, followUser).catch((err) => {
  //       console.log(err);
  //       alert("잠시 후에 다시 시도해주세요.");
  //     });
  //   } else {
  //     setSubscribeCount(subscribeCount + 1);
  //     postFollow(data.userId, followUser).catch((err) => {
  //       console.log(err);
  //       alert("잠시 후에 다시 시도해주세요.");
  //     });
  //   }
  // };

  return (
    <div className="mb-5 d-flex flex-column justify-content-start align-items-start px-5">
      <div>
        <span className="me-3">팔로우 {userData.followerCount}</span>
        <span>팔로워 {userData.followingCount}</span>
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
  /**
   * 카테고리를 작성으로 변경하기 위한 이벤트들
   */
  const writeCategori = () => {
    setCategori("작성");
  };
  /**
   * 카테고리를 추천으로 변경하기 위한 이벤트들
   */
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
