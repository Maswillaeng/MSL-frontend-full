import React, { useEffect, useRef, useState } from "react";
import Comment from "../components/boardDetail/Comment";
import Button from "../components/common/Button";
import { useNavigate, useLocation } from "react-router-dom";
import ProfileIcon from "../components/boardDetail/ProfileIcon";
import styled from "styled-components";
import { postFollow, deleteFollow } from "../function/api/follow";
import SupportBox from "../components/common/SupportBox";
import {
  deleteBoard,
  deleteBoardLike,
  postBoardLike,
} from "../function/api/board";
import { postComment, getComment } from "../function/api/comment";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import {
  commentDataState,
  currentUserState,
  boardDataState,
} from "../recoil/atom";
import { userState } from "../recoil/selector";
import { elapsedTime } from "../function/utility/ elapsedTime";
import { getUser } from "../function/api/log";
import { getIdCookie } from "../function/cookie/cookie";
import Hash from "../components/boardDetail/Hash";

const BoardDetailBox = styled.div.attrs({
  className:
    "container rounded d-flex flex-column justify-content-start align-items-center p-5",
})``;

const BoardDetail = () => {
  const location = useLocation();

  //로그인 체크 상태
  const currentUser = useRecoilValue(currentUserState);

  //로그인중이라면 최초 1회 로그인중인 유저 데이터 셋팅 , 현재 유저 정보임  *작성자 정보 아님*
  const userData = useRecoilValue(userState);

  //최초 1회 상세페이지에 들어오면 페이지 최상단으로 이동
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <BoardDetailBox>
      <div className="w-100 mb-5 d-flex justify-content-center align-items-center flex-column">
        <TopImgBox data={location.state.data} />
        <TopProfileBox data={location.state.data} userData={userData} />
        <TopContentBox data={location.state.data} />
      </div>
      <BottomCommentBox
        data={location.state.data}
        userData={userData}
        currentUser={currentUser}
      />
    </BoardDetailBox>
  );
};

const TopImgDivBox = styled.div.attrs({
  className:
    "w-100 d-flex justify-content-center align-items-center flex-column",
})`
  height: 54vh;
`;

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
  min-width: 365px;
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
    <TopImgDivBox>
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
    </TopImgDivBox>
  );
};

const ProfileUserImg = styled.img.attrs({
  className: "rounded-circle img-fluid",
  alt: "",
})`
  height: 10vh;
  width: 10vh;
`;

const ProfileContainer = styled.div.attrs({
  className: "w-50 justify-content-center align-items-center d-flex",
})`
  height: 20vh;
  min-width: 365px;
`;
const TopProfileBox = ({ data, userData }) => {
  const navigate = useNavigate();
  // console.log(data);
  // console.log(userData);
  const postId = data.postId;
  const postLikeCount = data.likeCount;
  const postUserId = data.userId;
  const currentUserId = userData.userId;
  const currentFollowerState = userData.followState;
  const likeList = userData.likePostList;
  //작성자 정보
  //작성자의 이미지때문에 관리 시작
  const [author, setAuthor] = useState({});
  const authorfollowerCount = author.followerCount;

  /**
   * 작성자 데이터 세팅
   * @param {userId} id
   */
  const getAuthor = (id) => {
    getUser(id).then((res) => {
      setAuthor(res);
    });
  };

  //추천 숫자
  const [likeCount, setLikeCount] = useState(0);

  //추천 상태
  const [like, setLike] = useState(false);

  /**
   * 추천 상태와 카운트를 바꿔주는 이벤트
   */
  const likeHandler = () => {
    if (getIdCookie() === 0) {
      return alert("로그인을 부탁드려요.");
    }

    const likeUser = { post_id: postId, user_id: currentUserId };

    if (like) {
      deleteBoardLike(postId, likeUser)
        .then((res) => setLikeCount(res.data.result.likeCount))
        .catch(() => {
          return alert("잠시 후에 다시 시도해주세요.");
        });
    } else {
      postBoardLike(postId, likeUser)
        .then((res) => {
          setLikeCount(res.data.result.likeCount);
        })
        .catch(() => {
          return alert("잠시 후에 다시 시도해주세요.");
        });
    }

    setLike(!like);
  };

  //구독 숫자
  const [subscribeCount, setSubscribeCount] = useState(0);

  //구독 상태
  const [subscribe, setSubscribe] = useState(false);

  /**
   * 구독 상태와 카운트를 바꿔주는 이벤트
   */
  const subscribeHandler = () => {
    if (getIdCookie() === 0) {
      return alert("로그인을 부탁드려요.");
    }

    const followUser = { my_id: currentUserId, user_id: postUserId };

    if (subscribe) {
      deleteFollow(postUserId, followUser)
        .then((res) => setSubscribeCount(res.data.result.userFollowerCount))
        .catch(() => {
          return alert("잠시 후에 다시 시도해주세요.");
        });
    } else {
      postFollow(postUserId, followUser)
        .then((res) => setSubscribeCount(res.data.result.userFollowerCount))
        .catch(() => {
          return alert("잠시 후에 다시 시도해주세요.");
        });
    }

    setSubscribe(!subscribe);
  };

  //작성자 정보, 추천, 팔로워 최초 세팅
  useEffect(() => {
    getAuthor(postUserId);
    setLikeCount(postLikeCount);
    setSubscribeCount(authorfollowerCount);
    setSubscribe(currentFollowerState);
    setLike(() => {
      if (likeList && likeList.findIndex((el) => el.postId === postId) !== -1) {
        return true;
      }
    });
  }, [
    authorfollowerCount,
    currentFollowerState,
    likeList,
    postId,
    postLikeCount,
    postUserId,
  ]);

  //현재 접속중인 유저의 데이터
  const currentUser = useSetRecoilState(currentUserState);

  //유저 데이터 업데이트
  useEffect(() => {
    currentUser(getIdCookie());
  }, [subscribe, like, currentUser]);

  //작성자의 마이페이지로 이동
  const moveMyPage = () => {
    navigate(`/myPage/${postUserId}`);
  };

  return (
    <ProfileContainer>
      <div className="d-flex justify-content-center align-items-center w-25">
        <ProfileUserImg src={author.userImage} />
      </div>
      <div className="d-flex justify-content-center align-items-center flex-column w-25 pe-2">
        <div onClick={moveMyPage} className="pointer">
          {data.nickname}
        </div>
        <div>구독자 {subscribeCount}명</div>
      </div>
      <div className="d-flex justify-content-center align-items-center flex-column w-50">
        <div>
          <span className="ms-4">추천 : {likeCount}</span>
        </div>
        <div className="d-flex h-100 flex-column">
          <div onClick={likeHandler} className="mx-2 py-3 w-100">
            <ProfileIcon
              message={"추천"}
              state={like}
              addStyle={like ? "bg-primary border-primary" : "border-primary"}
            />
          </div>
          <div onClick={subscribeHandler} className="mx-2 py-2 w-100">
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

const ContentBox = styled.div.attrs({
  className: "w-50 mt-5 card shadow p-3",
})`
  height: 50vh;
  min-width: 365px;
`;
const TitleBox = styled.div.attrs({
  className: "w-50 border p-2",
})`
  min-width: 365px;
`;
const TimeBox = styled.div.attrs({
  className: "w-50 mb-4 d-flex justify-content-end align-items-end mt-5",
})`
  min-width: 365px;
`;
const HashContent = styled.div.attrs({
  className: "card w-50 mt-4",
})`
  min-width: 365px;
`;
const HashBox = styled.div.attrs({
  className: "w-100 shadow",
})`
  min-height: 4.5vh;
`;

const TopContentBox = ({ data }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center my-5 w-100">
      <TitleBox>
        <h1>{data.title}</h1>
      </TitleBox>
      <TimeBox>
        <span className="mx-3">{data.categori}</span>
        <span>{elapsedTime(data.createAt)}</span>
      </TimeBox>
      <ContentBox
        dangerouslySetInnerHTML={{ __html: data.content }}
      ></ContentBox>
      <HashContent>
        <HashBox>
          {data.hashTag.map((x, i) => (
            <Hash tagName={x} key={x + i} />
          ))}
        </HashBox>
      </HashContent>
    </div>
  );
};

const CommentBox = styled.div.attrs({
  className:
    "w-50 d-flex justify-content-start align-items-center mb-5 shadow rounded p-4",
})`
  min-width: 365px;
`;
const CommentUserImg = styled.img.attrs({
  className: "rounded-circle",
  alt: "userImg",
})`
  height: 3vh;
`;
const LengthBox = styled.div.attrs({
  className: "w-100 d-flex justify-content-start align-items-center mb-5",
})``;
const BottomBox = styled.div.attrs({
  className:
    "w-50 d-flex flex-column justify-content-start align-items-center pb-3",
})`
  min-width: 365px;
`;

const BottomCommentBox = ({ data, userData, currentUser }) => {
  const navigate = useNavigate();

  //게시글 데이터 상태
  const [boardData, setBoardData] = useRecoilState(boardDataState);

  //현재 글에 작성된 댓글들을 위한 상태
  const [commentData, setCommentData] = useRecoilState(commentDataState);

  //댓글 버튼 상태
  const [onComment, setOnComment] = useState(false);

  //삭제하기 체크
  const [checkDelete, setCheckDelete] = useState(false);

  /**
   * 댓글 삭제 핸들러
   */
  const checkDeleteHandler = () => {
    setCheckDelete(!checkDelete);
  };

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

  //댓글을 셋팅하기 위한 이펙트
  useEffect(() => {
    getComment(data.postId).then((res) =>
      setCommentData(res.data.result.comment)
    );
  }, [checkDelete, data.postId, setCommentData]);

  //버튼 타겟, 버튼을 클릭하기 위해 생성
  const target = useRef(null);

  /**
   * 비회원일때 로그인 페이지로 이동하고, 회원이라면 댓글을 작성할 수 있게 해주는 이벤트
   */
  const buttonEvent = () => {
    if (getIdCookie() === 0) {
      return navigate("/login");
    }

    if (commentText === "") {
      return alert("댓글을 작성해주세요.");
    }

    const comment = {
      content: commentText,
    };

    // 댓글 제출 이벤트 확인 완료
    postComment(data.postId, comment).then(() => {
      getComment(data.postId).then((res) =>
        setCommentData(res.data.result.comment)
      );
    });
    target.current.click();
    setCommentText("");
    setOnComment(false);
  };

  /**
   * 글 수정하기로 이동
   */
  const moveEdit = () => {
    navigate("/boardCreate", { state: { boardData: data } });
  };

  /**
   * 글 삭제하기
   */
  const moveDelete = () => {
    if (window.confirm("글을 삭제하시겠습니까?")) {
      deleteBoard(data.postId)
        .then(() => {
          setBoardData(boardData.filter((x) => x.postId !== data.postId));
          navigate("/board");
        })
        .catch(() => alert("잠시 후에 다시 시도해주세요."));
    }
  };

  return (
    <>
      <BottomBox>
        <LengthBox>댓글:{commentData.length}개</LengthBox>
        {commentData.map((x, i) => (
          <Comment
            key={x.commentId}
            data={x}
            userData={userData}
            checkDeleteHandler={checkDeleteHandler}
          />
        ))}
      </BottomBox>
      <CommentBox>
        {getIdCookie() !== 0 ? (
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
                    <CommentUserImg src={userData.userImage} />
                    <span className="ms-1">{userData.nickname}</span>
                  </label>
                  <textarea
                    value={commentText}
                    onChange={changeCommentText}
                    className="form-control non-resize"
                    id="comment"
                    maxlenth={300}
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
              <div className="mx-5 fs-5">글을 작성하시려면 로그인 해주세요</div>
              <div>
                <Button buttonEvent={buttonEvent} message={"로그인"} />
              </div>
            </div>
          </>
        )}
        {data.userId === currentUser && (
          <SupportBox moveEdit={moveEdit} moveDelete={moveDelete} />
        )}
      </CommentBox>
    </>
  );
};

export default BoardDetail;
