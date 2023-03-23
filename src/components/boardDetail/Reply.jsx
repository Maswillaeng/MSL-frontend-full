import {
  faThumbsUp as faThumbsUpS,
  faThumbsDown as faThumbsDownS,
} from "@fortawesome/free-solid-svg-icons";
import {
  faThumbsUp as faThumbsUpR,
  faThumbsDown as faThumbsDownR,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import members from "../../dummy/members";
import { useState } from "react";
import styled from "styled-components";
import { elapsedTime } from "../../function/utility/ elapsedTime";

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
    <li className="mb-2 w-100">
      <div>
        <UserImg src={data.user_image} />
        {/* 글 주인이 댓글을 쓰면 "rounded main-bg-color p-1 text-light" 속성을 주자 */}
        <span className="me-2">{data.nickname}</span>
        <span className="opacity-50">{elapsedTime(data.createAt)}</span>
      </div>
      <div className="pt-1 px-4 mx-1 mb-1">
        <span>{data.content}</span>
      </div>
      <div className="pt-2 mx-1 d-flex w-50">
        <div className="d-flex justify-content-center align-items-center w-25">
          <div className="flex-05">
            <FontAwesomeIcon
              onClick={changeLikeCount}
              icon={like ? faThumbsUpS : faThumbsUpR}
              className=" pointer reply-icon"
            />
          </div>
          <div className="flex-01">
            <span>{likeCount}</span>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center w-25">
          <div className="flex-05">
            <FontAwesomeIcon
              onClick={changeDislikeCount}
              icon={dislike ? faThumbsDownS : faThumbsDownR}
              className="pointer reply-icon"
            />
          </div>
          <div className="flex-01">
            <span> {dislikeCount}</span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Reply;
