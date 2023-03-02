import {
  faThumbsUp as faThumbsUpS,
  faThumbsDown as faThumbsDownS,
} from "@fortawesome/free-solid-svg-icons";
import {
  faThumbsUp as faThumbsUpR,
  faThumbsDown as faThumbsDownR,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import members from "../dummy/members";
import { useState } from "react";

const Reply = ({ data }) => {
  //답글 좋아요
  const [like, setLike] = useState(false);
  const likeHandler = () => {
    setLike(!like);
  };
  const [likeCount, setLikeCount] = useState(Number(data.like));
  const changeLikeCount = () => {
    if (like) {
      likeHandler();
      return setLikeCount(likeCount - 1);
    }
    if (dislike) {
      setDislike(false);
      setDislikeCount(dislikeCount - 1);
    }
    likeHandler();
    setLikeCount(likeCount + 1);
  };
  //답글 싫어요
  const [dislike, setDislike] = useState(false);
  const dislikeHandler = () => {
    setDislike(!dislike);
  };
  const [dislikeCount, setDislikeCount] = useState(Number(data.dislike));
  const changeDislikeCount = () => {
    if (dislike) {
      dislikeHandler();
      return setDislikeCount(dislikeCount - 1);
    }
    if (like) {
      setLike(false);
      setLikeCount(likeCount - 1);
    }
    dislikeHandler();
    setDislikeCount(dislikeCount + 1);
  };
  return (
    <li className="mb-2" style={{ listStyle: "none" }}>
      <div>
        <img
          className="rounded-circle me-2 mb-1 pt-1"
          style={{
            height: "24px",
          }}
          src={members.filter((x) => x.nickname === data.nickname)[0].userImage}
          alt="1"
        />
        {/* 글 주인이 댓글을 쓰면 "rounded main-bg-color p-1 text-light" 속성을 주자 */}
        <span className="me-2">{data.nickname}</span>
        <span className="opacity-50">{data.createAt}</span>
      </div>
      <div className="pt-1 px-4 mx-1 mb-1">
        <span>{data.content}</span>
      </div>
      <div className="pt-1 px-4 mx-1 d-flex ">
        <div className="me-3">
          <FontAwesomeIcon
            onClick={changeLikeCount}
            style={{
              height: "20px",
              cursor: "pointer",
            }}
            icon={like ? faThumbsUpS : faThumbsUpR}
            className="me-2 "
          />
          <span>{likeCount}</span>
        </div>
        <div>
          <FontAwesomeIcon
            onClick={changeDislikeCount}
            style={{
              height: "20px",
              cursor: "pointer",
            }}
            icon={dislike ? faThumbsDownS : faThumbsDownR}
            className="me-2 "
          />
          <span> {dislikeCount}</span>
        </div>
      </div>
    </li>
  );
};

export default Reply;
