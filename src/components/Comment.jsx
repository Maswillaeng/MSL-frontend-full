import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp as faThumbsUpS,
  faThumbsDown as faThumbsDownS,
} from "@fortawesome/free-solid-svg-icons";
import {
  faThumbsUp as faThumbsUpR,
  faThumbsDown as faThumbsDownR,
} from "@fortawesome/free-regular-svg-icons";
import members from "../dummy/members";
import { useEffect, useState } from "react";
import Button from "./Button";
import Reply from "./Reply";
import replyData from "../dummy/replyData";
import styled from "styled-components";

const Comment = ({ data }) => {
  //댓글 up
  const [commentLike, setCommentLike] = useState(false);
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
  //댓글 down
  const [commentDislike, setCommentDislike] = useState(false);
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
  // 좋아요 상태
  const [likeCount, setLikeCount] = useState(Number(data.like));
  // 싫어요 상태
  const [dislikeCount, setDislikeCount] = useState(Number(data.dislike));
  //답글달기
  const [writeReply, setWriteReply] = useState(false);
  const writeReplyHandler = () => {
    setWriteReply(!writeReply);
  };
  //답글value
  const [replyVal, setReplyVal] = useState("");
  const changeReplyVal = (e) => {
    setReplyVal(e.target.value);
  };
  //답글보기
  const [readReply, setReadReply] = useState(false);
  const readReplyHandler = () => {
    setReadReply(!readReply);
  };
  //답글등록
  const submitReply = () => {
    if (replyVal === "") {
      return alert("답글을 적어주세요.");
    }
    replyData.push({
      post_id: data.post_id,
      comment_id: data.comment_id,
      reply_id: replyList.length + 1,
      nickname: "shdomi8599",
      content: replyVal,
      createAt: "방금 전",
      like: 0,
      dislike: 0,
    });
    setCheckReply(true);
    setWriteReply(false);
  };
  //답글 데이터
  const [replyList, setReplyList] = useState(
    replyData.filter(
      (x) => x.post_id === data.post_id && x.comment_id === data.comment_id
    )
  );
  //답글 제출 체크용
  const [checkReply, setCheckReply] = useState(false);
  //답글 제출이 확인되면 새로운 데이터를 가져옴
  useEffect(() => {
    setReplyList(
      replyData.filter(
        (x) => x.post_id === data.post_id && x.comment_id === data.comment_id
      )
    );
    setCheckReply(false);
  }, [checkReply]);

  const TopCommentBox = styled.div.attrs({
    className: "w-75 d-flex justify-content-start align-items-center mb-2",
  })`
    margin-left: -50px;
    margin-bottom: -35px;
  `;

  const ProfileImg = styled.img.attrs({
    className: "rounded-circle",
    alt: "",
  })`
    height: 50px;
  `;
  const IconBox = styled.div.attrs({
    className:
      "w-75 d-flex justify-content-start align-items-start ms-5 flex-column",
  })`
    margin-right: -150px;
  `;
  const ReplyImg = styled.img.attrs({
    className: "rounded-circle me-3",
    alt: "",
  })`
    height: 25px;
  `;

  return (
    <div className="w-100 d-flex justify-content-center align-items-center flex-column">
      <TopCommentBox>
        <div>
          <ProfileImg
            src={
              members.filter((x) => x.nickname === data.nickname)[0].userImage
            }
          />
        </div>
        <div className="ms-2 me-5 w-100 ">
          <div>{data.nickname}</div>
          <div className="opacity-75">{data.createAt}</div>
        </div>
        <IconBox>
          <div className="mb-2">
            <FontAwesomeIcon
              onClick={commentLikeHandler}
              icon={commentLike ? faThumbsUpS : faThumbsUpR}
              className="me-2 comment-icon"
            />
            {likeCount}
          </div>
          <div>
            <FontAwesomeIcon
              onClick={commentDislikeHandler}
              icon={commentDislike ? faThumbsDownS : faThumbsDownR}
              className="me-2 comment-icon"
            />
            {dislikeCount}
          </div>
        </IconBox>
      </TopCommentBox>
      <div className="w-100 d-flex justify-content-start align-items-center px-5 py-2">
        {data.content}
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
          <div
            aria-label={"답글달기"}
            className="d-flex justify-content-center align-items-center w-100"
          >
            <ReplyImg
              src={
                members.filter((x) => x.nickname === "shdomi8599")[0].userImage
              }
            />
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
            {replyList.map((x) => (
              <Reply data={x} key={x.reply_id} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Comment;
