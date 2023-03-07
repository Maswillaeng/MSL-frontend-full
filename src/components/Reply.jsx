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
import styled from "styled-components";
import { elapsedTime } from "../function/utility/ elapsedTime";

const UserImg = styled.img.attrs({
  className: "rounded-circle me-2 mb-1 pt-1",
  alt: "",
})`
  height: 24px;
`;

const Reply = ({ data }) => {
  //답글 좋아요 상태
  const [like, setLike] = useState(false);

  /**
   * 답글 좋아요 상태 이벤트
   */
  const likeHandler = () => {
    setLike(!like);
  };

  //답글 좋아요 카운트
  const [likeCount, setLikeCount] = useState(Number(data.like));

  /**
   * 답글 좋아요 상태와 카운트를 바꿔주는 이벤트
   */
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

  //답글 싫어요 상태
  const [dislike, setDislike] = useState(false);

  /**
   * 답글 싫어요 상태 이벤트
   */
  const dislikeHandler = () => {
    setDislike(!dislike);
  };

  //답글 싫어요 카운트
  const [dislikeCount, setDislikeCount] = useState(Number(data.dislike));

  /**
   * 답글 싫어요 상태와 카운트를 바꿔주는 이벤트3
   */
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
        <UserImg
          src={members.filter((x) => x.nickname === data.nickname)[0].userImage}
        />
        {/* 글 주인이 댓글을 쓰면 "rounded main-bg-color p-1 text-light" 속성을 주자 */}
        <span className="me-2">{data.nickname}</span>
        <span className="opacity-50">{elapsedTime(data.createAt)}</span>
      </div>
      <div className="pt-1 px-4 mx-1 mb-1">
        <span>{data.content}</span>
      </div>
      <div className="pt-1 px-4 mx-1 d-flex ">
        <div className="me-3">
          <FontAwesomeIcon
            onClick={changeLikeCount}
            icon={like ? faThumbsUpS : faThumbsUpR}
            className="me-2 pointer reply-icon"
          />
          <span>{likeCount}</span>
        </div>
        <div>
          <FontAwesomeIcon
            onClick={changeDislikeCount}
            icon={dislike ? faThumbsDownS : faThumbsDownR}
            className="me-2 pointer reply-icon"
          />
          <span> {dislikeCount}</span>
        </div>
      </div>
    </li>
  );
};

export default Reply;
