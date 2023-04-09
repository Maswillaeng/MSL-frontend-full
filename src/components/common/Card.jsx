import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp as faThumbsUpR,
  faComment as faCommentR,
} from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import { useEffect, useState } from "react";
import FocusBoard from "./FocusBoard";

const CardBox = styled.div.attrs({
  className:
    "col-lg-3 col-md-6 col-sm-12 d-flex justify-content-center mb-3 py-3",
})``;

const ThumbnailImg = styled.img.attrs({
  alt: "",
  className: "w-100 mt-3",
})`
  max-height: 16vh;
`;
const TitleBox = styled.div.attrs({
  className: "mt-2 mb-5 px-4 h-25 flex-02",
})`
  height: 30px;
`;
const UserImg = styled.img.attrs({
  className: "rounded-circle me-1",
  alt: "",
})`
  height: 25px;
`;

const Card = ({ data }) => {
  const navigate = useNavigate();

  /**
   * 데이터를 가지고 상세페이지로 이동하기 위한 이벤트
   */
  const detail = () => {
    navigate(`/boardDetail/${data.postId}`);
  };

  //게시글 포커스 이벤트
  const [focus, setFocus] = useState(false);
  const [timeEvent, setTimeEvent] = useState(null);

  const onMouseEnter = () => {
    setTimeEvent(
      setTimeout(() => {
        setFocus(true);
      }, 500)
    );
  };

  const onMouseLeave = () => {
    // 이전에 등록한 이벤트가 있다면 삭제
    if (timeEvent) {
      clearTimeout(timeEvent);
      setTimeEvent(null);
    }
    setFocus(false);
  };

  //전체 화면을 체크하기 위한 상태
  const [isFull, setIsFull] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsFull(window.innerWidth === window.screen.width);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //전체화면 최초 값 셋팅
  useEffect(() => {
    setIsFull(window.innerWidth === window.screen.width);
  }, []);

  return (
    <>
      <CardBox onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {isFull && focus && <FocusBoard postId={data.postId} />}
        <div
          onClick={detail}
          className="p-2 border bg-light d-flex flex-column align-items-center shadow pointer h-100 mx-4"
        >
          <div className="mb-5 h-50 flex-08 w-75">
            <ThumbnailImg src={data.thumbnail} />
          </div>
          {data.title && (
            <TitleBox>
              <span>{data.title}</span>
            </TitleBox>
          )}
          <div className="mt-4 d-flex align-items-center justify-content-center w-100 pb-2 h-25 flex-01">
            {data.nickname && (
              <div className="mx-2">
                <UserImg src={"img/마쉴랭.PNG"} />
                <span>{data.nickname}</span>
              </div>
            )}
            <div className="mx-2">
              <FontAwesomeIcon icon={faThumbsUpR} className="me-1 card-icon" />
              <span>{data.likeCount}</span>
            </div>
            <div className="mx-2">
              <FontAwesomeIcon
                icon={faCommentR}
                className="me-1 card-icon"
                id="card-icon"
              />
              <span>{data.commentCount}</span>
            </div>
          </div>
        </div>
      </CardBox>
    </>
  );
};

export default Card;
