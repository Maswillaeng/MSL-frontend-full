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
import getUser from "../function/getUser";

export default function BoardDetail() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div
      className="container rounded d-flex flex-column justify-content-start align-items-center my-5 p-5"
      style={{
        maxWidth: "60vw",
      }}
    >
      <div className="w-100 mb-5">
        <TopImgBox data={location.state.data} />
        <TopProfileBox data={location.state.data} />
        <TopContentBox data={location.state.data} />
      </div>
      <BottomCommentBox data={location.state.data} />
    </div>
  );
}

const TopImgBox = ({ data }) => {
  //이미지 개수만큼 생성할 state만들어야할듯
  const circleArr = Array(data.imgSrc.length).fill(1);
  const [currentImg, setCurrentImg] = useState(0);
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
        <div style={{ minWidth: "70px" }}>
          {currentImg !== 0 && (
            <FontAwesomeIcon
              icon={faArrowLeft}
              onClick={downCurrentImg}
              className="mx-3 "
              style={{
                height: "40px",
                cursor: "pointer",
              }}
            />
          )}
        </div>
        <div>
          <img
            className="img-thumbnail"
            style={{
              minHeight: "350px",
              maxHeight: "350px",
              minWidth: "500px",
              maxWidth: "500px",
            }}
            src={data.imgSrc[currentImg]}
            alt="1"
          />
        </div>
        <div style={{ minWidth: "70px" }}>
          {currentImg < data.imgSrc.length - 1 && (
            <FontAwesomeIcon
              icon={faArrowRight}
              onClick={upCurrentImg}
              className="mx-3 "
              style={{
                height: "40px",
                cursor: "pointer",
              }}
            />
          )}
        </div>
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

const TopProfileBox = ({ data }) => {
  //추천 관련
  const [likeCount, setLikeCount] = useState(data.like);
  const [like, setLike] = useState(false);
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

  //구독 관련
  const [subscribeCount, setSubscribeCount] = useState(userSubscribe);
  const [subscribe, setSubscribe] = useState(false);
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
        <img
          className="rounded-circle"
          style={{
            height: "70px",
          }}
          src={userImgae}
          alt="detailThumbnail"
        />
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
            type={like}
            addStyle={like ? "bg-primary border-primary" : "border-primary"}
          />
          <span className="ms-4">추천 : {likeCount}</span>
        </div>
        <div onClick={subscribeHandler}>
          <ProfileIcon
            message={"구독하기"}
            type={subscribe}
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

const BottomCommentBox = ({ login, data }) => {
  const navigate = useNavigate();
  //버튼 타겟
  const target = useRef(null);
  //코멘트 필터로 나누기
  const [commentArr, setCommentArr] = useState(
    commentData.filter((x) => x.post_id === data.post_id)
  );
  //댓글 핸들러
  const [onComment, setOnComment] = useState(false);
  const onCommentHandeler = () => {
    setOnComment(!onComment);
  };
  const [commentText, setCommentText] = useState("");
  const detectCommentText = (e) => {
    setCommentText(e.target.value);
  };
  //비회원일때 로그인창으로 이동하게 조건문 달아줘야할듯
  const buttonEvent = () => {
    if (!getUser("user")) {
      return navigate("/login");
    }
    if (commentText === "") {
      return alert("댓글을 작성해주세요.");
    }
    commentData.push({
      post_id: data.post_id,
      nickname: getUser("user"),
      createAt: "2023-02-27",
      content: commentText,
      like: 0,
      dislike: 0,
    });
    target.current.click();
    setCommentText("");
    setOnComment(false);
  };
  useEffect(() => {
    setCommentArr(commentData.filter((x) => x.post_id === data.post_id));
  }, [commentText]);
  return (
    <>
      <div className="w-50 d-flex flex-column justify-content-start align-items-center">
        <div className="w-100 d-flex justify-content-start align-items-center mb-5">
          댓글:{commentArr.length}개
        </div>
        {commentArr.map((x, i) => (
          <Comment key={i} data={x} />
        ))}
      </div>
      <div className="w-50 d-flex justify-content-start align-items-center mb-5 shadow rounded p-4">
        {getUser("user") ? (
          <>
            <div className="w-100 d-flex justify-content-center align-items-center flex-column">
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
                    <img
                      className="rounded-circle"
                      style={{
                        height: "30px",
                      }}
                      src={
                        "https://avatars.githubusercontent.com/u/117655658?v=4"
                      }
                      alt="1"
                    />
                    <span className="ms-1">{getUser("user")}</span>
                  </label>
                  <textarea
                    value={commentText}
                    onChange={detectCommentText}
                    className="form-control"
                    id="comment"
                    rows="5"
                    style={{
                      resize: "none",
                    }}
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
            <div className="flex-grow-1">글을 작성하시려면 로그인 해주세요</div>
            <div>
              <Button buttonEvent={buttonEvent} message={"로그인"} />
            </div>
          </>
        )}
      </div>
    </>
  );
};
