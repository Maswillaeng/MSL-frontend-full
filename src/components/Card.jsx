import { useNavigate } from "react-router-dom";
import members from "../dummy/members";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp as faThumbsUpR,
  faComment as faCommentR,
} from "@fortawesome/free-regular-svg-icons";
import commentData from "../dummy/commentData";
import styled from "styled-components";

const ThumbnailImg = styled.img.attrs({
  alt: "thumbnail",
})`
  max-height: 180px;
`;
const TitleBox = styled.div.attrs({
  className: "mt-2 mb-5 mx-2",
})`
  height: 30px;
`;
const UserImg = styled.img.attrs({
  className: "rounded-circle",
  alt: "",
})`
  height: 25px;
`;

const Card = ({ data }) => {
  const navigate = useNavigate();

  //데이터를 가지고 상세페이지로 이동하기 위한 이벤트
  const detail = () => {
    navigate(`/boardDetail/${data.post_id}`, { state: { data: data } });
  };

  return (
    <div className="col-3">
      <div
        onClick={detail}
        className="p-2 border bg-light d-flex flex-column align-items-center shadow pointer"
      >
        <div className="mb-5">
          <ThumbnailImg src={data.thumbnail} />
        </div>
        <TitleBox>
          <span>{data.title}</span>
        </TitleBox>
        <div className="mt-4 d-flex align-items-center justify-content-center w-100 pb-2">
          <div className="mx-2">
            <UserImg
              src={
                members.filter((x) => x.nickname === data.nickname)[0].userImage
              }
            />
            <span>{data.nickname}</span>
          </div>
          <div className="mx-2">
            <FontAwesomeIcon icon={faThumbsUpR} className="me-1 card-icon" />
            <span>{data.like}</span>
          </div>
          <div className="mx-2">
            <FontAwesomeIcon
              icon={faCommentR}
              className="me-1 card-icon"
              id="card-icon"
            />
            <span>
              {commentData.filter((x) => x.post_id === data.post_id).length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
