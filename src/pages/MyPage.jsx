import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import SupportBox from "../components/common/SupportBox";
import { deleteFollow, postFollow } from "../function/api/follow";
import { getUser } from "../function/api/log";
import { userState } from "../recoil/selector";

const MyPage = () => {
  const navigate = useNavigate();
  const params = useParams();

  //카테고리 상태
  const [categori, setCategori] = useState("");

  //현재 로그인한 유저의 정보
  const currentUser = useRecoilValue(userState);

  //조회하려는 유저의 데이터를 셋팅
  const [userData, setUserData] = useState({});
  useEffect(() => {
    getUser(params.id).then((res) => {
      setUserData(res);
    });
  }, [params]);

  //카테고리에 맞게 게시글 셋팅
  const [boardData, setBoardData] = useState([]);
  useEffect(() => {
    if (categori === "작성") {
      setBoardData(userData.postList);
    }
    if (categori === "추천") {
      setBoardData(userData.likePostList);
    }
  }, [categori, userData]);

  /**
   * 회원정보 수정하기 이벤트
   */
  const editUser = () => {
    if (window.confirm("회원정보를 수정하시겠습니까?")) {
      navigate("/edit", { state: { currentUser } });
    }
  };
  return (
    <div className="container rounded d-flex flex-column justify-content-start align-items-start mt-3 p-5">
      <TopProfileTop userData={userData} />
      <TopProfileBottom userData={userData} currentUser={currentUser} />
      <BottomCategori setCategori={setCategori} categori={categori} />
      <div className="mb-5 w-100">
        <div className="mt-5 w-100 d-flex justify-content-center align-items-center">
          <div className="w-100 row">
            {boardData.map((data, i) => (
              <Card data={data} key={i} />
            ))}
          </div>
        </div>
      </div>
      {userData.userId === currentUser.userId && (
        <SupportBox userData={userData} editUser={editUser} />
      )}
    </div>
  );
};

const UserImg = styled.img.attrs({
  className: "rounded-circle img-fluid",
  alt: "",
})`
  min-width: 75px;
`;

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

const TopProfileBottom = ({ userData, currentUser }) => {
  //구독 숫자
  const [subscribeCount, setSubscribeCount] = useState(0);

  //구독 상태
  const [subscribe, setSubscribe] = useState(false);

  /**
   * 구독 상태와 카운트를 바꿔주는 이벤트
   */
  const subscribeHandler = () => {
    if (userData.userId === currentUser.userId) {
      return alert("다른사람만 팔로우 할 수 있습니다.");
    }

    const followUser = { my_id: currentUser.userId, user_id: userData.userId };
    if (subscribe) {
      deleteFollow(userData.userId, followUser)
        .then((res) => setSubscribeCount(res.data.result.userFollowerCount))
        .catch(() => {
          return alert("잠시 후에 다시 시도해주세요.");
        });
    } else {
      postFollow(userData.userId, followUser)
        .then((res) => setSubscribeCount(res.data.result.userFollowerCount))
        .catch(() => {
          return alert("잠시 후에 다시 시도해주세요.");
        });
    }
    setSubscribe(!subscribe);
  };

  //최초 1회 팔로우 숫자 셋팅
  useEffect(() => {
    setSubscribe(userData.followState);
    setSubscribeCount(userData.followerCount);
  }, [userData]);

  return (
    <div className="mb-5 d-flex flex-column justify-content-start align-items-start px-5">
      <div>
        <span className="me-3">팔로우 {userData.followingCount}</span>
        <span>팔로워 {subscribeCount}</span>
      </div>
      {userData.userId !== currentUser.userId && (
        <>
          <AccessBox onClick={subscribeHandler}>
            <Button
              addStyle={subscribe ? "px-4" : "px-5"}
              message={subscribe ? "팔로우 취소" : "팔로우"}
            />
          </AccessBox>
          <AccessBox>
            <Button addStyle={"px-4"} message={"메세지 보내기"} />
          </AccessBox>
        </>
      )}
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
