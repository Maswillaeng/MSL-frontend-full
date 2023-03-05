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
import members from "../dummy/members";
import commentData from "../dummy/commentData";
import ProfileIcon from "../components/ProfileIcon";
import getUserCookie from "../function/cookie/getUserCookie";
import styled from "styled-components";
import { currentTime } from "../function/utility/ currentTime";

const BoardDetailBox = styled.div.attrs({
  className:
    "container rounded d-flex flex-column justify-content-start align-items-center my-5 p-5",
})``;

const BoardDetail = () => {
  const location = useLocation();

  //최초 1회 상세페이지에 들어오면 페이지 최상단으로 이동
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <BoardDetailBox>
      <div className="w-100 mb-5">
        <TopImgBox data={location.state.data} />
        <TopProfileBox data={location.state.data} />
        <TopContentBox data={location.state.data} />
      </div>
      <BottomCommentBox data={location.state.data} />
    </BoardDetailBox>
  );
};

const IconBox = styled.div`
  min-width: 70px;
`;

const ThumbnailImg = styled.img.attrs({
  className: "img-thumbnail",
  alt: "",
})`
  min-height: 350px;
  max-height: 350px;
  min-width: 500px;
  max-width: 500px;
`;

const TopImgBox = ({ data }) => {
  //글에 등록된 이미지 개수의 상태를 보여주기 위한 배열
  const circleArr = Array(data.imgSrc.length).fill(1);

  //현재 선택된 이미지를 보여주기 위한 상태
  const [currentImg, setCurrentImg] = useState(0);

  //현재 보여지는 이미지를 바꾸기 위한 이벤트들
  const upCurrentImg = () => {
    if (currentImg < data.imgSrc.length - 1) {
      setCurrentImg(currentImg + 1);
    }
  };
  const downCurrentImg = () => {
    if (currentImg > 0) {
      setCurrentImg(currentImg - 1);
    }
  };

  return (
    <div className="w-100 d-flex justify-content-center align-items-center flex-column">
      <div className="d-flex justify-content-center align-items-center">
        <IconBox>
          {currentImg !== 0 && (
            <FontAwesomeIcon
              icon={faArrowLeft}
              onClick={downCurrentImg}
              className="mx-3  pointer board-detail-icon"
            />
          )}
        </IconBox>
        <div>
          <ThumbnailImg src={data.imgSrc[currentImg]} />
        </div>
        <IconBox>
          {currentImg < data.imgSrc.length - 1 && (
            <FontAwesomeIcon
              icon={faArrowRight}
              onClick={upCurrentImg}
              className="mx-3 pointer board-detail-icon"
            />
          )}
        </IconBox>
      </div>
      <div>
        {circleArr.map((x, i) =>
          currentImg === i ? (
            <FontAwesomeIcon icon={faCircleS} className="mx-2 mt-2" key={i} />
          ) : (
            <FontAwesomeIcon icon={faCircleR} className="mx-2 mt-2" key={i} />
          )
        )}
      </div>
    </div>
  );
};

const ProfileUserImg = styled.img.attrs({
  className: "rounded-circle",
  alt: "userImg",
})`
  height: 70px;
`;

const TopProfileBox = ({ data }) => {
  //추천 숫자
  const [likeCount, setLikeCount] = useState(data.like);

  //추천 상태
  const [like, setLike] = useState(false);

  //추천 상태와 카운트를 바꿔주는 이벤트
  const likeHandler = () => {
    setLike(!like);
    if (like) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
  };

  const userImgae = members.filter((x) => x.nickname === data.nickname)[0]
    .userImage;
  const userSubscribe = members.filter((x) => x.nickname === data.nickname)[0]
    .subscribeCount;

  //구독 숫자
  const [subscribeCount, setSubscribeCount] = useState(userSubscribe);

  //구독 상태
  const [subscribe, setSubscribe] = useState(false);

  //구독 상태와 카운트를 바꿔주는 이벤트
  const subscribeHandler = () => {
    setSubscribe(!subscribe);
    if (subscribe) {
      setSubscribeCount(subscribeCount - 1);
    } else {
      setSubscribeCount(subscribeCount + 1);
    }
  };

  return (
    <div className="w-100 d-flex justify-content-center align-items-center">
      <div className=" mt-5 ">
        <ProfileUserImg src={userImgae} />
      </div>
      <div className="ms-2 mt-5 me-5">
        <div>{data.nickname}</div>
        <div className="d-flex justify-content-center align-items-center">
          구독자 {subscribeCount}명
        </div>
      </div>
      <div className="mx-5 mt-5 d-flex justify-content-start align-items-start flex-column">
        <div className="mb-4" onClick={likeHandler}>
          <ProfileIcon
            message={"추천"}
            state={like}
            addStyle={like ? "bg-primary border-primary" : "border-primary"}
          />
          <span className="ms-4">추천 : {likeCount}</span>
        </div>
        <div onClick={subscribeHandler}>
          <ProfileIcon
            message={"구독하기"}
            state={subscribe}
            addStyle={
              subscribe ? "bg-danger border-danger ms-1" : "border-danger ms-1"
            }
          />
        </div>
      </div>
    </div>
  );
};

const TopContentBox = ({ data }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center my-5">
      <div className="w-50">
        <h1>{data.title}</h1>
      </div>
      <div className="w-50 mb-4 d-flex justify-content-end align-items-end">
        <span className="mx-3">{data.categori}</span>
        <span>{data.createAt}</span>
      </div>
      <div className="w-50">{data.content}</div>
    </div>
  );
};

const CommentUserImg = styled.img.attrs({
  className: "rounded-circle",
  alt: "userImg",
})`
  height: 30px;
`;

const BottomCommentBox = ({ data }) => {
  const navigate = useNavigate();

  //현재 글에 작성된 댓글들을 위한 상태
  const [commentArr, setCommentArr] = useState(
    commentData.filter((x) => x.post_id === data.post_id)
  );

  //댓글 버튼 상태
  const [onComment, setOnComment] = useState(false);

  //댓글 핸들러
  const onCommentHandeler = () => {
    setOnComment(!onComment);
  };

  //댓글 text 상태
  const [commentText, setCommentText] = useState("");

  //댓글 text change 이벤트
  const changeCommentText = (e) => {
    setCommentText(e.target.value);
  };

  //버튼 타겟, 버튼을 클릭하기 위해 생성
  const target = useRef(null);

  //비회원일때 로그인 페이지로 이동하고, 회원이라면 댓글을 작성할 수 있게 해주는 이벤트
  const buttonEvent = () => {
    if (!getUserCookie("user")) {
      return navigate("/login");
    }

    if (commentText === "") {
      return alert("댓글을 작성해주세요.");
    }

    const postComment = {
      post_id: data.post_id,
      nickname: getUserCookie("user"),
      createAt: currentTime(),
      content: commentText,
      like: 0,
      dislike: 0,
    };

    commentData.push(postComment);
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
                    <CommentUserImg
                      src={
                        "https://avatars.githubusercontent.com/u/117655658?v=4"
                      }
                    />
                    <span className="ms-1">{"임시"}</span>
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
