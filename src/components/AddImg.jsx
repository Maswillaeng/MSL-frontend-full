import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import styled from "styled-components";

const AddImg = ({ addImgData, setImgNum, imgData, x }) => {
  const [imgFile, setImgFile] = useState("");
  const target = useRef(null);
  const uploadClick = () => {
    target.current.click();
  };
  const saveImgFile = () => {
    const file = target.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (
        Object.values(imgData).filter((x) => x === reader.result).length !== 0
      ) {
        return alert("같은 사진은 등록할 수 없습니다.");
      }
      setImgNum(0);
      setImgFile(reader.result);
      addImgData({
        [`imgSrc${x}`]: reader.result,
      });
    };
  };

  const ImgBox = styled.div`
    max-height: 210px;
    min-height: 210px;
    min-width: 210px;
    max-width: 210px;
    cursor: pointer;
  `;

  return (
    <ImgBox
      onClick={uploadClick}
      className="flex-grow-1 d-flex justify-content-center align-items-center card m-3 w-100"
    >
      {imgFile && (
        <img
          style={{
            maxHeight: "190px",
            minHeight: "190px",
            minWidth: "190px",
            maxWidth: "190px",
          }}
          src={imgFile}
          alt=""
        />
      )}
      <input
        ref={target}
        type="file"
        accept="image/*"
        style={{
          display: "none",
        }}
        onChange={saveImgFile}
      />
      <div className="p-1 w-100 d-flex justify-content-center align-items-center">
        {!imgFile && (
          <FontAwesomeIcon
            icon={faPlus}
            style={{
              height: "50px",
              width: "50px",
            }}
          />
        )}
      </div>
    </ImgBox>
  );
};

export default AddImg;
