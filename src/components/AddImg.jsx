import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import styled from "styled-components";

const ImgBox = styled.div.attrs({
  className:
    "d-flex justify-content-center align-items-center card m-3 w-100 pointer",
})``;

const ImgFile = styled.img.attrs({
  className: "img-fluid",
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
  //이미지 파일 상태
  const [imgFile, setImgFile] = useState("");

  //hidden input을 타겟으로 설정하기 위한 ref
  const target = useRef(null);

  /**
   * hidden input을 클릭하기 위한 이벤트
   */
  const uploadClick = () => {
    target.current.click();
  };

  /**
   * 이미지를 저장하기 위한 이벤트
   */
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
        [`imgSrc${num}`]: reader.result,
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
