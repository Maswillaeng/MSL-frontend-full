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
import { useState } from "react";

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
  return (
    <div className="w-100 d-flex justify-content-center align-items-center flex-column">
      <div
        className="w-75 d-flex justify-content-start align-items-center mb-2"
        style={{
          marginLeft: "-50px",
          marginBottom: "-35px",
        }}
      >
        <div>
          <img
            className="rounded-circle"
            style={{
              height: "50px",
            }}
            src={
              members.filter((x) => x.nickname === data.nickname)[0].userImage
            }
            alt="1"
          />
        </div>
        <div className="ms-2 me-5 w-100 ">
          <div>{data.nickname}</div>
          <div>{data.createAt}</div>
        </div>
        <div
          className="w-75 d-flex justify-content-start align-items-start ms-5 flex-column"
          style={{
            marginRight: "-150px",
          }}
        >
          <div className="mb-2">
            <FontAwesomeIcon
              onClick={commentLikeHandler}
              style={{
                height: "25px",
                cursor: "pointer",
                marginBottom: "-5px",
              }}
              icon={commentLike ? faThumbsUpS : faThumbsUpR}
              className="me-2 "
            />
            {likeCount}
          </div>
          <div>
            <FontAwesomeIcon
              onClick={commentDislikeHandler}
              style={{
                height: "25px",
                cursor: "pointer",
                marginBottom: "-5px",
              }}
              icon={commentDislike ? faThumbsDownS : faThumbsDownR}
              className="me-2"
            />
            {dislikeCount}
          </div>
        </div>
      </div>
      <div className="w-100 d-flex justify-content-start align-items-center p-5">
        {data.content}
      </div>
    </div>
  );
};

export default Comment;
