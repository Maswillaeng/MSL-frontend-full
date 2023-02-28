import { useNavigate } from "react-router-dom";

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
        <div
          className="mt-4"
          style={{
            overflow: "hidden",
          }}
        >
          {data.title}
        </div>
      </div>
    </div>
  );
};

export default Card;
