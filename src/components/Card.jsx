import { useNavigate } from "react-router-dom";
import members from "../dummy/members";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as faThumbsUpR,faComment as faCommentR } from "@fortawesome/free-regular-svg-icons";
import commentData from "../dummy/commentData";

const Card = ({ data }) => {
  const navigate = useNavigate();
  const detail = () => {
    navigate(`/boardDetail/${data.post_id}`, { state: { data: data } });
  };
  return (
    <div className="col-3">
      <div
        className="p-2 border bg-light d-flex flex-column align-items-center shadow"
        onClick={detail}
        style={{
          minHeight: "400px",
          maxHeight: "400px",
          cursor: "pointer",
        }}
      >
        <div className="mb-5">
          <img
            style={{ maxHeight: "180px", minHeight: "180px" }}
            src={data.thumbnail}
            alt="thumbnail"
          />
        </div>
        <div className="mt-2 mb-5 mx-2" style={{ height: "30px" }}>
          <span>{data.title}</span>
        </div>
        <div className="mt-4 d-flex align-items-center justify-content-center w-100">
          <div className="mx-2">
            <img
              className="rounded-circle"
              style={{
                height: "25px",
              }}
              src={
                members.filter((x) => x.nickname === data.nickname)[0].userImage
              }
              alt=""
            />
            <span>{data.nickname}</span>
          </div>
          <div className="mx-2">
            <FontAwesomeIcon
              style={{
                height: "20px",
              }}
              icon={faThumbsUpR}
              className="me-1 "
            />
            <span>{data.like}</span>
          </div>
          <div className="mx-2">
          <FontAwesomeIcon
              style={{
                height: "20px",
              }}
              icon={faCommentR}
              className="me-1 "
            /><span>{commentData.filter(x=>x.post_id===data.post_id).length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
