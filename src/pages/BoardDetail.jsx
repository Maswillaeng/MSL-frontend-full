import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faCircle as faCircleS,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle as faCircleR } from "@fortawesome/free-regular-svg-icons";
import React, { useEffect, useRef, useState } from "react";
import Comment from "../components/Comment";
import Button from "../components/Button";
import { useNavigate, useLocation } from "react-router-dom";
import commentData from "../dummy/commentData";
import ProfileIcon from "../components/ProfileIcon";
import getUserCookie from "../function/cookie/getUserCookie";
import { getUser } from "../function/api/getUser";
import styled from "styled-components";
import { currentTime } from "../function/utility/ currentTime";
import { postBoardLike } from "../function/api/postBoardLike";
import { postFollow } from "../function/api/postFollow";
import { deleteFollow } from "../function/api/deleteFollow";
import { deleteBoardLike } from "../function/api/deleteBoardLike";

const BoardDetailBox = styled.div.attrs({
  className:
    "container rounded d-flex flex-column justify-content-start align-items-center p-5",
})``;

const BoardDetail = () => {
  const location = useLocation();

  //로그인중이라면 최초 1회 로그인중인 유저 데이터 셋팅 , 현재 유저 정보임  *작성자 정보 아님*
  const [userData, setUserData] = useState({});

  //최초 1회 상세페이지에 들어오면 페이지 최상단으로 이동
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (getUserCookie("user")) {
      getUser().then((res) => setUserData(res.data.result));
    }
  }, []);

  return (
    <BoardDetailBox>
      <div className="w-100 mb-5 d-flex justify-content-center align-items-center flex-column">
        <TopImgBox data={location.state.data} />
        <TopProfileBox data={location.state.data} userData={userData} />
        <TopContentBox data={location.state.data} />
      </div>
      <BottomCommentBox data={location.state.data} userData={userData} />
    </BoardDetailBox>
  );
};

const IconBox = styled.div.attrs({
  className: " d-flex justify-content-center align-items-center mx-2 ",
})`
  width: 3vw;
  height: 3vh;
`;

const ThumbnailBox = styled.div.attrs({
  className:
    " d-flex flex-column justify-content-center align-items-center card shadow h-100 ",
})`
  width: 22vw;
`;

const ThumbnailImg = styled.img.attrs({
  className: "h-100 w-100",
  alt: "",
})``;

const TopImgBox = ({ data }) => {
  //글에 등록된 이미지 개수의 상태를 보여주기 위한 배열
  // const circleArr = Array(data.imgSrc.length).fill(1);

  //현재 선택된 이미지를 보여주기 위한 상태
  // const [currentImg, setCurrentImg] = useState(0);

  //현재 보여지는 이미지를 바꾸기 위한 이벤트들
  // const upCurrentImg = () => {
  //   if (currentImg < data.imgSrc.length - 1) {
  //     setCurrentImg(currentImg + 1);
  //   }
  // };
  // const downCurrentImg = () => {
  //   if (currentImg > 0) {
  //     setCurrentImg(currentImg - 1);
  //   }
  // };

  return (
    <div
      className="w-100 d-flex justify-content-center align-items-center flex-column"
      style={{ height: "54vh" }}
    >
      <div className="d-flex justify-content-center align-items-center h-75">
        <IconBox>
          {/* {currentImg !== 0 && (
            <FontAwesomeIcon
              icon={faArrowLeft}
              onClick={downCurrentImg}
              className="pointer board-detail-icon"
            />
         )}  */}
        </IconBox>
        <ThumbnailBox>
          <ThumbnailImg src={data.thumbnail} />
        </ThumbnailBox>
        <IconBox>
          {/* {currentImg < data.imgSrc.length - 1 && (
            <FontAwesomeIcon
              icon={faArrowRight}
              onClick={upCurrentImg}
              className="pointer board-detail-icon"
            />
         )}  */}
        </IconBox>
      </div>
      <div>
        {/* {circleArr.map((x, i) =>
          currentImg === i ? (
            <FontAwesomeIcon icon={faCircleS} className="mx-2 mt-2" key={i} />
          ) : (
            <FontAwesomeIcon icon={faCircleR} className="mx-2 mt-2" key={i} />
          )
        )} */}
      </div>
    </div>
  );
};

const ProfileUserImg = styled.img.attrs({
  className: "rounded-circle img-fluid",
  alt: "userImg",
})`
  height: 10vh;
`;

const ProfileContainer = styled.div.attrs({
  className: "w-50 d-flex justify-content-center align-items-center px-5",
})`
  height: 15vh;
`;
const TopProfileBox = ({ data, userData }) => {
  //추천 숫자
  const [likeCount, setLikeCount] = useState(data.hits);

  //추천 상태
  const [like, setLike] = useState(false);

  /**
   * 추천 상태와 카운트를 바꿔주는 이벤트
   */
  const likeHandler = () => {
    const likeUser = { post_id: data.postId, user_id: userData.userId };
    setLike(!like);
    if (like) {
      setLikeCount(likeCount - 1);
      deleteBoardLike(data.postId, likeUser).then((res) => {
        console.log(res);
      });
    } else {
      setLikeCount(likeCount + 1);
      postBoardLike(data.postId, likeUser).then((res) => {
        console.log(res);
      });
    }
  };

  //구독 숫자
  //작성자 정보가 내려와야 함
  const [subscribeCount, setSubscribeCount] = useState(0);

  //구독 상태
  const [subscribe, setSubscribe] = useState(false);

  /**
   * 구독 상태와 카운트를 바꿔주는 이벤트
   */
  const subscribeHandler = () => {
    const followUser = { my_id: userData.userId, user_id: data.userId };
    setSubscribe(!subscribe);
    if (subscribe) {
      setSubscribeCount(subscribeCount - 1);
      deleteFollow(data.userId, followUser).then((res) => {
        console.log(res);
      });
    } else {
      setSubscribeCount(subscribeCount + 1);
      postFollow(data.userId, followUser).then((res) => {
        console.log(res);
      });
    }
  };

  return (
    <ProfileContainer>
      <div className="w-25 d-flex justify-content-center align-items-center">
        <ProfileUserImg src={userData.userImage} />
      </div>
      <div className="w-25 d-flex justify-content-center align-items-center flex-column">
        <div>{data.nickname}</div>
        <div>구독자 {subscribeCount}명</div>
      </div>
      <div className="w-50 d-flex justify-content-center align-items-center flex-column h-50">
        <div className="h-75">
          <span className="ms-4">추천 : {likeCount}</span>
        </div>
        <div className="d-flex h-25">
          <div onClick={likeHandler} className="mx-2">
            <ProfileIcon
              message={"추천"}
              state={like}
              addStyle={like ? "bg-primary border-primary" : "border-primary"}
            />
          </div>
          <div onClick={subscribeHandler} className="mx-2">
            <ProfileIcon
              message={"구독하기"}
              state={subscribe}
              addStyle={
                subscribe ? "bg-danger border-danger " : "border-danger"
              }
            />
          </div>
        </div>
      </div>
    </ProfileContainer>
  );
};

const TopContentBox = ({ data }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center my-5 w-100">
      <div className="w-50 border p-2">
        <h1>{data.title}</h1>
      </div>
      <div className="w-50 mb-4 d-flex justify-content-end align-items-end mt-5">
        <span className="mx-3">{data.categori}</span>
        <span>{"방금 전"}</span>
      </div>
      <div
        className="w-50 mt-5 card shadow p-3"
        style={{ height: "50vh" }}
        dangerouslySetInnerHTML={{ __html: data.content }}
      ></div>
    </div>
  );
};

const CommentUserImg = styled.img.attrs({
  className: "rounded-circle",
  alt: "userImg",
})`
  height: 3vh;
`;

const BottomCommentBox = ({ data, userData }) => {
  const navigate = useNavigate();

  //현재 글에 작성된 댓글들을 위한 상태
  const [commentArr, setCommentArr] = useState(
    commentData.filter((x) => x.post_id === data.post_id)
  );

  //댓글 버튼 상태
  const [onComment, setOnComment] = useState(false);

  /**
   * 댓글 핸들러
   */
  const onCommentHandeler = () => {
    setOnComment(!onComment);
  };

  //댓글 text 상태
  const [commentText, setCommentText] = useState("");

  /**
   * 댓글 text change 이벤트
   */
  const changeCommentText = (e) => {
    setCommentText(e.target.value);
  };

  //버튼 타겟, 버튼을 클릭하기 위해 생성
  const target = useRef(null);

  /**
   * 비회원일때 로그인 페이지로 이동하고, 회원이라면 댓글을 작성할 수 있게 해주는 이벤트
   */
  const buttonEvent = () => {
    if (!getUserCookie("user")) {
      return navigate("/login");
    }

    if (commentText === "") {
      return alert("댓글을 작성해주세요.");
    }

    const comment = {
      post_id: data.postId,
      nickname: userData.nickname,
      createAt: currentTime(),
      content: commentText,
      like: 0,
      dislike: 0,
    };

    // 댓글 제출 이벤트 확인 완료
    // postComment(data.postId, comment).then((res) => {
    //   console.log(res);
    //   alert("성공");
    // });

    commentData.push(comment);
    target.current.click();
    setCommentText("");
    setOnComment(false);
  };

  //제출 상태가 변화할 때, 새로운 댓글을 등록해주기 위한 이펙트
  useEffect(() => {
    setCommentArr(commentData.filter((x) => x.post_id === data.post_id));
  }, [onComment]);

  return (
    <>
      <div className="w-50 d-flex flex-column justify-content-start align-items-center pb-3">
        <div className="w-100 d-flex justify-content-start align-items-center mb-5">
          댓글:{commentArr.length}개
        </div>
        {commentArr.map((x, i) => (
          <Comment key={i} data={x} />
        ))}
      </div>
      <div className="w-50 d-flex justify-content-start align-items-center mb-5 shadow rounded p-4">
        {getUserCookie("user") ? (
          <>
            <div className="w-100 d-flex justify-content-center align-items-center flex-column ">
              <button
                ref={target}
                onClick={onCommentHandeler}
                className="btn btn-primary mb-2 w-50"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                {onComment ? "댓글 취소하기" : "댓글 작성하기"}
              </button>
              <div className="collapse mt-3 w-100" id="collapseExample">
                <div className="mb-3 w-100">
                  <label htmlFor="comment" className="form-label ">
                    <CommentUserImg src={userData.userImage} />
                    <span className="ms-1">{userData.nickname}</span>
                  </label>
                  <textarea
                    value={commentText}
                    onChange={changeCommentText}
                    className="form-control non-resize"
                    id="comment"
                    rows="5"
                  ></textarea>
                </div>
                <div className="w-100 d-flex justify-content-between align-items-center">
                  <div>{commentText.length}/300</div>
                  <div>
                    <Button
                      buttonEvent={buttonEvent}
                      message={"등록"}
                      size={"sm"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="d-flex justify-content-center align-items-center w-100">
              <div className="mx-5 fs-4">글을 작성하시려면 로그인 해주세요</div>
              <div>
                <Button buttonEvent={buttonEvent} message={"로그인"} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default BoardDetail;
