import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const ImgBox = styled.div.attrs({
  className:
    "col-lg-2 col-md-4 col-sm-12 d-flex justify-content-center align-items-center card m-3 pointer",
})`
  min-width: 220px;
`;

const ImgFile = styled.img.attrs({
  className: "py-2 h-100 w-100",
  alt: "",
})``;

const ImgInput = styled.input.attrs({
  type: "file",
  accept: "image/*",
})`
  display: none;
`;

const ImgThumbnailBox = styled.div.attrs({
  className: "p-1 w-100 d-flex justify-content-center align-items-center",
})`
  height: 25vh;
`;

const AddImg = ({ addImgData, setImgNum, imgData, num }) => {
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
      const formData = new FormData();
      formData.append("data", file);
      axios
        .post("http://localhost:8080/api/upload", formData, {
          headers: {
            "Content-Type": `multipart/form-data`,
          },
        })
        .then((res) =>
          addImgData({
            [`imgSrc${num}`]: res,
          })
        )
        .then(() => {
          setImgNum(0);
          setImgFile(reader.result);
        })
        .catch(() => {
          alert("사진 등록에 실패하였습니다.");
        });
    };
  };

  return (
    <ImgBox onClick={uploadClick}>
      <ImgInput ref={target} onChange={saveImgFile} />
      <ImgThumbnailBox>
        {imgFile && <ImgFile src={imgFile} />}
        {!imgFile && <FontAwesomeIcon icon={faPlus} className="add-img-icon" />}
      </ImgThumbnailBox>
    </ImgBox>
  );
};

export default AddImg;
