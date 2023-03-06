import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

//스타일 컴포넌트
const DafaultLabel = styled.label.attrs({
  className: "pt-2",
})``;

const DangerMessage = styled.div.attrs({
  className: "d-flex justify-content-center align-items-center text-danger",
})`
  min-height: 24px;
`;

const ImgLabel = styled.label.attrs({
  className: "pt-2",
})``;

const ImgBox = styled.div.attrs({
  className:
    "border border-3 mx-5 d-flex justify-content-center align-items-center pointer w-50 h-100",
})``;

const UserImg = styled.img.attrs({
  className: "rounded img-fluid",
  alt: "",
})``;

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
    <div className="d-flex mt-2 mb-1 col-12 w-100 justify-content-center align-items-center">
      {data.id !== "userImage" && data.id !== "introduction" ? (
        <>
          <div className="d-flex w-100 justify-content-center align-items-center flex-column">
            <div className="d-flex mb-2 w-50 justify-content-center align-items-center ">
              <div className="flex-06">
                <DafaultLabel htmlFor={data.id}>
                  {data.name}
                  {saveImgFile && <span className="text-danger">*</span>}
                </DafaultLabel>
              </div>
              <div className="flex-10">
                <input
                  id={data.id}
                  type={data.type}
                  ref={(el) => (targetRefs.current[idx] = el)}
                  placeholder={data.placeholder}
                  name={data.id}
                  onChange={(e) => inputChange(e)}
                  className=" rounded form-control"
                />
              </div>
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
          <div
            className="d-flex w-100 justify-content-center align-items-center flex-column"
            style={{ height: "12vh" }}
          >
            <div className="d-flex mb-2 w-50 justify-content-center align-items-center h-100">
              <div className="flex-06">
                <ImgLabel htmlFor={data.id}>{data.name}</ImgLabel>
              </div>
              <div className="flex-10 h-100">
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
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="d-flex w-100 justify-content-center align-items-center flex-column">
            <div className="d-flex mb-2 w-50 justify-content-center align-items-center ">
              <div className="flex-06">
                <DafaultLabel htmlFor={data.id}>{data.name}</DafaultLabel>
              </div>
              <div className="flex-10 ">
                <textarea
                  ref={(el) => (targetRefs.current[idx] = el)}
                  rows="4"
                  type={data.type}
                  placeholder={data.placeholder}
                  name={data.id}
                  onChange={(e) => inputChange(e)}
                  className="rounded form-control non-resize"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Input;
