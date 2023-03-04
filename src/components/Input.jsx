import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

//스타일 컴포넌트
const DafaultLabel = styled.label.attrs({
  className: "pt-2",
})`
  min-width: 100px;
`;
const DangerMessage = styled.div.attrs({
  className: "d-flex justify-content-center align-items-center text-danger",
})`
  min-height: 24px;
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

const Input = ({
  setMember,
  data,
  member,
  targetRefs,
  idx,
  saveImgFile,
  imgFile,
  warning,
}) => {
  //이미지 업로드 클릭용 이벤트
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
    <div className="d-flex mt-2 mb-1">
      {data.id !== "userImage" && data.id !== "introduction" ? (
        <>
          <div>
            <div className="d-flex mb-2">
              <DafaultLabel htmlFor={data.id}>
                {data.name}
                {saveImgFile && <span className="text-danger">*</span>}
              </DafaultLabel>
              <input
                id={data.id}
                type={data.type}
                ref={(el) => (targetRefs.current[idx] = el)}
                placeholder={data.placeholder}
                name={data.id}
                onChange={(e) => inputChange(e)}
                className="ms-5 rounded form-control"
              />
            </div>
            <DangerMessage>
              <span>{!saveImgFile && warning[idx] && data.warning}</span>
              <span>
                {Object.keys(warning).includes(data.id) && warning[data.id]}
              </span>
            </DangerMessage>
          </div>
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
            className="hidden"
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
