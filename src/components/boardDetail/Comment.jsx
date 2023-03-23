import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp as faThumbsUpS,
  faThumbsDown as faThumbsDownS,
  faXmark as faXmarkS,
} from "@fortawesome/free-solid-svg-icons";
import {
  faThumbsUp as faThumbsUpR,
  faThumbsDown as faThumbsDownR,
} from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import Button from "../common/Button";
import Reply from "./Reply";
import styled from "styled-components";
import { elapsedTime } from "../../function/utility/ elapsedTime";
import { deleteComment } from "../../function/api/deleteComment";
import { postReply } from "../../function/api/postReply";
import { getReply } from "../../function/api/getReply";
import { putComment } from "../../function/api/putComment";
import getIdCookie from "../../function/cookie/getIdCookie";

const TopCommentBox = styled.div.attrs({
  className: "w-100 d-flex justify-content-start align-items-center mb-2",
})``;

const ProfileImg = styled.img.attrs({
  className: "rounded-circle",
  alt: "",
})`
  height: 5.5vh;
`;
const IconBox = styled.div.attrs({
  className:
    "w-100 d-flex justify-content-center align-items-end ms-2 flex-column",
})``;
const ReplyImg = styled.img.attrs({
  className: "rounded-circle me-3",
  alt: "",
})`
  height: 3vh;
`;
const ContentSpan = styled.span.attrs({
  className: "",
})`
  min-height: 30px;
`;

const Comment = ({ data, userData, checkDeleteHandler }) => {
  const postId = data.postId;
  const commentId = data.commentId;

  //댓글 좋아요 상태
  const [commentLike, setCommentLike] = useState(false);

  // 댓글 좋아요 카운트
  const [likeCount, setLikeCount] = useState(Number(data.likeCount));

  /**
   * 댓글 좋아요 상태와 카운트를 관리하는 이벤트
   */
  const commentLikeHandler = () => {
    setCommentLike(!commentLike);
    if (commentLike) {
      setLikeCount(likeCount - 1);
    } else {
      if (commentDislike) {
        commentDislikeHandler();
      }
      setLikeCount(likeCount + 1);
    }
  };

  //댓글 싫어요 상태
  const [commentDislike, setCommentDislike] = useState(false);

  //댓글 싫어요 카운트
  const [dislikeCount, setDislikeCount] = useState(Number(data.hateCount));

  /**
   * 댓글 싫어요 상태와 카운트를 관리하는 이벤트
   */
  const commentDislikeHandler = () => {
    setCommentDislike(!commentDislike);
    if (commentDislike) {
      setDislikeCount(dislikeCount - 1);
    } else {
      if (commentLike) {
        commentLikeHandler();
      }
      setDislikeCount(dislikeCount + 1);
    }
  };

  //답글 value 상태
  const [replyVal, setReplyVal] = useState("");

  /**
   * 답글 value change 이벤트
   */
  const changeReplyVal = (e) => {
    setReplyVal(e.target.value);
  };

  //답글 쓰기 버튼의 상태
  const [writeReply, setWriteReply] = useState(false);

  /**
   * 답글 버튼 상태를 바꿔주는 이벤트
   */
  const writeReplyHandler = () => {
    if (getIdCookie() === 0) {
      return alert("로그인을 부탁드려요.");
    }
    setWriteReply(!writeReply);
  };

  //답글 보기 버튼의 상태
  const [readReply, setReadReply] = useState(false);

  /**
   * 답글 보기 상태를 바꿔주는 이벤트
   */
  const readReplyHandler = () => {
    setReadReply(!readReply);
  };

  //모든 답글 데이터의 상태
  const [replyList, setReplyList] = useState([]);

  /**
   * 댓글 삭제 이벤트
   */
  const deleteCommentData = () => {
    deleteComment(postId, commentId).then(checkDeleteHandler);
  };

  /**
   * 답글 등록 이벤트
   */
  const submitReply = () => {
    if (replyVal === "") {
      return alert("답글을 적어주세요.");
    }
    const reply = {
      content: replyVal,
    };
    postReply(postId, commentId, reply).then(() => {
      getReply(postId, commentId)
        .then((res) => {
          setReplyList(res.data.result);
        })
        .then(() => {
          setWriteReply(false);
        });
    });
  };

  //최초 1회 답글 셋팅
  useEffect(() => {
    getReply(postId, commentId).then((res) => {
      setReplyList(res.data.result);
    });
  }, [commentId, postId]);

  //댓글 수정을 위한 상태
  const [inputVal, setInputVal] = useState(data.content);

  //댓글 수정 상태 체크용
  const [input, setInput] = useState(false);

  /**
   * input칸 핸들러 , 값이 수정되면 다시 셋팅
   */
  const inputHandler = () => {
    if (input) {
      const data = {
        content: inputVal,
      };
      putComment(postId, commentId, data);
    }
    setInput(!input);
  };

  /**
   * input 체인지 함수
   */
  const changeInput = (e) => {
    setInputVal(e.target.value);
  };

  return (
    <div className="w-100 d-flex justify-content-center align-items-center flex-column">
      <TopCommentBox>
        <div className="me-2">
          <ProfileImg src={data.userImage} />
        </div>
        <div className="ms-2 me-5 w-100 ">
          <div>
            <span>{data.nickname}</span>
          </div>
          <div className="opacity-75">{elapsedTime(data.createAt)}</div>
        </div>
        <IconBox>
          <div className="mb-2 d-flex justify-content-center align-items-center w-100">
            <div className="flex-07">
              {getIdCookie() === data.userId && (
                <>
                  <span
                    className="bg-dark text-white p-1 rounded pointer"
                    onClick={inputHandler}
                  >
                    {input ? "완료" : "수정"}
                  </span>
                  <FontAwesomeIcon
                    icon={faXmarkS}
                    className="ps-3 fs-5 pointer"
                    onClick={deleteCommentData}
                  />
                </>
              )}
            </div>
            <div className="flex-02 ps-2">
              <FontAwesomeIcon
                onClick={commentLikeHandler}
                icon={commentLike ? faThumbsUpS : faThumbsUpR}
                className="me-2 comment-icon"
              />
            </div>
            <div className="flex-01">
              <span>{likeCount}</span>
            </div>
          </div>
          <div className="mb-2 d-flex justify-content-center align-items-center w-100">
            <div className="flex-07"></div>
            <div className="flex-02 ps-2">
              <FontAwesomeIcon
                onClick={commentDislikeHandler}
                icon={commentDislike ? faThumbsDownS : faThumbsDownR}
                className="me-2 comment-icon"
              />
            </div>
            <div className="flex-01">
              <span>{dislikeCount}</span>
            </div>
          </div>
        </IconBox>
      </TopCommentBox>
      <div className="w-100 d-flex justify-content-start align-items-center px-5 py-2">
        {input ? (
          <input value={inputVal} onChange={changeInput} />
        ) : (
          <ContentSpan>{inputVal}</ContentSpan>
        )}
      </div>
      <div className="w-100 d-flex justify-content-start align-items-center px-5 mt-3 pb-1 pointer">
        {replyList.length !== 0 && (
          <div className="me-4" onClick={readReplyHandler}>
            <span className="text-primary">답글 {replyList.length}개</span>
          </div>
        )}
        <div className="pointer" onClick={writeReplyHandler}>
          <span className="text-primary">답글달기</span>
        </div>
      </div>
      <div className="w-100 d-flex justify-content-start align-items-center flex-column">
        {writeReply && (
          <div className="d-flex justify-content-center align-items-center w-100">
            <ReplyImg src={userData.userImage} />
            <input
              type="text"
              className="form-control me-3 w-50"
              placeholder="답글을 적어주세요."
              onChange={changeReplyVal}
            />
            <Button
              message={"취소"}
              buttonEvent={() => {
                setWriteReply(false);
              }}
              addStyle={"me-2"}
            />
            <Button message={"등록"} buttonEvent={submitReply} />
          </div>
        )}
        {readReply && (
          <ul className="d-flex align-items-start w-100 flex-column">
            {replyList.map((x, i) => (
              <Reply data={x} key={i} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Comment;
