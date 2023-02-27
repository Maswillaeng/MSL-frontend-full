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

  //인풋값 셋팅
  const inputChange = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="d-flex p-2 my-2 ">
      {data !== "userImage" && data !== "introduction" ? (
        <>
          <label
            className="pt-2"
            htmlFor={data}
            style={{
              minWidth: "100px",
            }}
          >
            {data === "email"
              ? "이메일"
              : data === "password"
              ? "비밀번호"
              : data === "pwc"
              ? "비밀번호확인"
              : data === "nickname"
              ? "닉네임"
              : data === "phoneNumber" && "전화번호"}
          </label>
          <input
            type={
              data === "email"
                ? "email"
                : data === "password" || data === "pwc"
                ? "password"
                : "text"
            }
            ref={(el) => (targetRefs.current[idx] = el)}
            placeholder={
              data === "email"
                ? "이메일을 적어주세요."
                : data === "password" || data === "pwc"
                ? "비밀번호를 적어주세요."
                : data === "nickname"
                ? "닉네임을 적어주세요."
                : data === "phoneNumber" && "전화번호를 적어주세요."
            }
            name={data}
            onChange={(e) => inputChange(e)}
            className="ms-5 rounded form-control"
          />
        </>
      ) : data === "userImage" ? (
        <>
          <label
            className="pt-2"
            htmlFor={data}
            style={{
              minWidth: "165px",
            }}
          >
            이미지
          </label>
          <input
            style={{ display: "none" }}
            type="file"
            accept="image/*"
            ref={(el) => (targetRefs.current[idx] = el)}
            placeholder="이미지를 등록해주세요."
            name={data}
            onChange={(e) => {
              saveImgFile(idx);
              inputChange(e);
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
            htmlFor={data}
            style={{
              minWidth: "100px",
            }}
          >
            자기소개
          </label>
          <textarea
            style={{ resize: "none" }}
            rows="4"
            type="text"
            ref={(el) => (targetRefs.current[idx] = el)}
            placeholder="자기소개를 적어주세요."
            name={data}
            onChange={(e) => inputChange(e)}
            className="ms-5 rounded form-control"
          />
        </>
      )}
    </div>
  );
};

export default Input;
