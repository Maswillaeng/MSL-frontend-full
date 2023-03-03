import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

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
  const DafaultLabel = styled.label.attrs({
    className: "pt-2",
  })`
    min-width: 100px;
  `;
  const ImgLabel = styled.label.attrs({
    className: "pt-2",
  })`
    min-width: 165px;
  `;
  const ImgBox = styled.div.attrs({
    className:
      "border border-3 mx-5 d-flex justify-content-center align-items-center pointer",
  })`
    min-width: 100px;
    max-width: 100px;
    min-height: 100px;
    max-height: 100px;
  `;
  const UserImg = styled.img.attrs({
    className: "rounded",
    alt: "",
  })`
    max-width: 90px;
    min-width: 90px;
    max-height: 90px;
    min-height: 90px;
  `;
  return (
    <div className="d-flex p-2 my-2 ">
      {data.id !== "userImage" && data.id !== "introduction" ? (
        <>
          <DafaultLabel htmlFor={data.id}>{data.name}</DafaultLabel>
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
          <ImgLabel htmlFor={data.id}>{data.name}</ImgLabel>
          <input
            type={data.type}
            accept="image/*"
            placeholder={data.placeholder}
            ref={(el) => (targetRefs.current[idx] = el)}
            name={data.id}
            onChange={() => {
              saveImgFile(idx);
            }}
            className="ms-5 rounded form-control hidden"
          />
          <ImgBox onClick={uploadClick}>
            {!imgFile && (
              <FontAwesomeIcon icon={faPlus} className="input-icon" />
            )}
            {imgFile && <UserImg src={imgFile} />}
          </ImgBox>
        </>
      ) : (
        <>
          <DafaultLabel htmlFor={data.id}>{data.name}</DafaultLabel>
          <textarea
            ref={(el) => (targetRefs.current[idx] = el)}
            rows="4"
            type={data.type}
            placeholder={data.placeholder}
            name={data.id}
            onChange={(e) => inputChange(e)}
            className="ms-5 rounded form-control non-resize"
          />
        </>
      )}
    </div>
  );
};

export default Input;
