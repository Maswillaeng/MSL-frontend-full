import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Input = ({
  setMember,
  data,
  member,
  targetRefs,
  idx,
  saveImgFile,
  imgFile,
}) => {
  const uploadClick = () => {
    targetRefs.current[idx].click();
  };
  //인풋 값 변경 이벤트
  const inputChange = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="d-flex p-2 my-2 ">
      {data.id !== "userImage" && data.id !== "introduction" ? (
        <>
          <label
            className="pt-2"
            htmlFor={data.id}
            style={{
              minWidth: "100px",
            }}
          >
            {data.name}
          </label>
          <input
            id={data.id}
            type={data.type}
            ref={(el) => (targetRefs.current[idx] = el)}
            placeholder={data.placeholder}
            name={data.id}
            onChange={(e) => inputChange(e)}
            className="ms-5 rounded form-control"
          />
        </>
      ) : data.id === "userImage" ? (
        <>
          <label
            className="pt-2"
            htmlFor={data.id}
            style={{
              minWidth: "165px",
            }}
          >
            {data.name}
          </label>
          <input
            style={{ display: "none" }}
            type={data.type}
            accept="image/*"
            placeholder={data.placeholder}
            ref={(el) => (targetRefs.current[idx] = el)}
            name={data.id}
            onChange={() => {
              saveImgFile(idx);
            }}
            className="ms-5 rounded form-control"
          />
          <div
            className="border border-3 mx-5 d-flex justify-content-center align-items-center"
            onClick={uploadClick}
            style={{
              minWidth: "100px",
              maxWidth: "100px",
              maxHeight: "100px",
              minHeight: "100px",
              cursor: "pointer",
            }}
          >
            {!imgFile && (
              <FontAwesomeIcon
                icon={faPlus}
                style={{
                  height: "50px",
                  width: "50px",
                }}
              />
            )}
            {imgFile && (
              <img
                className="rounded"
                style={{
                  maxHeight: "90px",
                  minHeight: "90px",
                  minWidth: "90px",
                  maxWidth: "90px",
                }}
                src={imgFile}
                alt=""
              />
            )}
          </div>
        </>
      ) : (
        <>
          <label
            className="pt-2"
            htmlFor={data.id}
            style={{
              minWidth: "100px",
            }}
          >
            {data.name}
          </label>
          <textarea
            ref={(el) => (targetRefs.current[idx] = el)}
            style={{ resize: "none" }}
            rows="4"
            type={data.type}
            placeholder={data.placeholder}
            name={data.id}
            onChange={(e) => inputChange(e)}
            className="ms-5 rounded form-control"
          />
        </>
      )}
    </div>
  );
};

export default Input;
