import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import styled from "styled-components";
const ImgBox = styled.div.attrs({
  className:
    "flex-grow-1 d-flex justify-content-center align-items-center card m-3 w-100",
})`
  max-height: 210px;
  min-height: 210px;
  min-width: 210px;
  max-width: 210px;
  cursor: pointer;
`;

const ImgFile = styled.img.attrs({
  alt: "",
})`
  max-height: 190px;
  min-height: 190px;
  min-width: 190px;
  max-width: 190px;
`;

const ImgInput = styled.input.attrs({
  type: "file",
  accept: "image/*",
})`
  display: none;
`;

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

  return (
    <ImgBox onClick={uploadClick}>
      {imgFile && <ImgFile src={imgFile} />}
      <ImgInput ref={target} onChange={saveImgFile} />
      <div className="p-1 w-100 d-flex justify-content-center align-items-center">
        {!imgFile && <FontAwesomeIcon icon={faPlus} className="add-img-icon" />}
      </div>
    </ImgBox>
  );
};

export default AddImg;
