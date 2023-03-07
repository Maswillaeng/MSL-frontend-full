import React, { useCallback, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faCircle as faCircleS,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle as faCircleR } from "@fortawesome/free-regular-svg-icons";
import AddImg from "../components/AddImg";
import { useNavigate } from "react-router-dom";
import Li from "../components/Li";
import EditorComponent from "../components/EditorComponent";
import styled from "styled-components";
import { postBoard } from "../function/api/postBoard";

const BoardCreate = () => {
  //텍스트 에디터용 상태와 이벤트
  const [desc, setDesc] = useState("");
  const onEditorChange = (value) => {
    setDesc(value);
    setContent({
      ...content,
      content: value,
    });
  };

  //처음엔 배열로 넣었다가 객체의 형태로 바꾸게 된 이유는 이미지가 등록순서대로 보이길래 원래 있는 칸 순서대로 보이기 위해 객체로 변경함
  const [imgData, setImgData] = useState({
    imgSrc1: "",
    imgSrc2: "",
    imgSrc3: "",
    imgSrc4: "",
    imgSrc5: "",
  });

  /**
   * 이미지 데이터를 저장하기 위한 이벤트
   */
  const addImgData = (data) => {
    setImgData({
      ...imgData,
      ...data,
    });
  };

  //썸네일 이벤트를 보여주기 위한 상태
  const [imgNum, setImgNum] = useState(0);

  //카테고리 상태, 최초 값은 레시피로 설정
  const [content, setContent] = useState({ category: "레시피" });

  /**
   * 작성된 내용을 반영하기 위한 이벤트
   */
  const updateContent = (e) => {
    setContent({
      ...content,
      ...{
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <>
      <BoardCreateNav content={content} imgData={imgData} imgNum={imgNum} />
      <div className="container rounded d-flex flex-column justify-content-start align-items-center my-5 p-5 ">
        <TopImgBox imgData={imgData} imgNum={imgNum} setImgNum={setImgNum} />
        <TopAddImg
          addImgData={addImgData}
          setImgNum={setImgNum}
          imgData={imgData}
        />
        <BottomContentBox
          updateContent={updateContent}
          onEditorChange={onEditorChange}
          desc={desc}
        />
      </div>
    </>
  );
};

const BoardCreateNav = ({ content, imgData, imgNum }) => {
  const navigate = useNavigate();

  /**
   * 글 작성 이벤트
   */
  const successEvent = () => {
    if (!content.title) {
      return alert("제목을 적어주세요.");
    }
    if (!content.content) {
      return alert("설명을 적어주세요.");
    }
    if (!content.category) {
      return alert("카테고리를 선택해주세요.");
    }

    const allImgData = Object.values(imgData).filter((x) => x !== "");

    const postData = {
      ...content,
      thumbnail:
        allImgData.length === 0 ? "/img/마쉴랭.PNG" : allImgData[imgNum],
      imgData: allImgData.length === 0 ? "/img/마쉴랭.PNG" : allImgData,
    };

    postBoard(postData)
      .then(() => {
        alert("글이 등록되었습니다.");
        navigate("/board");
      })
      .catch((err) => {
        alert("실패요");
        console.log(err);
      });
  };

  /**
   * 뒤로가기 이벤트를 위한 함수 navigate가 콜백안에서 직접 작성이 불가하길래 따로 빼서 작성함
   */
  const backPage = () => {
    navigate(-2);
  };

  //네비를 구성하는 배열
  const navArr = [
    {
      뒤로가기: {
        event: backPage,
      },
    },
    {
      "글 작성": {
        event: () => console.log("글 작성"),
      },
    },
    {
      완료: {
        event: successEvent,
      },
    },
  ];

  return (
    <nav className="navbar navbar-expand-lg bg-light py-2 fs-3 w-100">
      <div className="container-fluid w-100">
        <div className="collapse navbar-collapse w-100" id="navbarNavDropdown">
          <ul className="navbar-nav d-flex justify-content-between align-items-center my-3 w-100 px-5 fs-1">
            {navArr.map((data, idx) => (
              <Li data={data} idx={idx} key={Object.keys(data)[0]} />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

const IconBox = styled.div`
  max-width: 70px;
  min-width: 70px;
`;
const ThumbnailImgBox = styled.div.attrs({
  className:
    "w-25 d-flex justify-content-center align-items-center card shadow fs-5 mx-3",
})`
  min-height: 280px;
`;
const ThumbnailImg = styled.img.attrs({
  alt: "",
})`
  max-height: 270px;
  min-height: 270px;
  min-width: 300px;
  max-width: 300px;
`;
const PlusIconBox = styled.div`
  max-width: 70px;
  min-width: 70px;
`;
const ImgListBox = styled.div`
  min-height: 20px;
  max-height: 20px;
`;

const TopImgBox = ({ imgData, imgNum, setImgNum }) => {
  //이미지 개수를 아이콘으로 보여주기 위한 배열
  const imgCountArr = Array(
    Object.values(imgData).filter((x) => x !== "").length
  ).fill(1);

  /**
   * 썸네일 이미지 변경용 이벤트 +1
   */
  const upImgNum = () => {
    setImgNum(imgNum + 1);
  };
  /**
   * 썸네일 이미지 변경용 이벤트 -1
   */
  const downImgNum = () => {
    setImgNum(imgNum - 1);
  };

  return (
    <div className="w-100 d-flex justify-content-center align-items-center flex-column">
      <div className="w-100 d-flex justify-content-center align-items-center mb-3">
        <IconBox>
          {imgNum > 0 && (
            <FontAwesomeIcon
              onClick={downImgNum}
              icon={faArrowLeft}
              className="mx-3 pointer board-create-icon"
            />
          )}
        </IconBox>
        <ThumbnailImgBox>
          {Object.values(imgData).filter((x) => x !== "").length === 0 ? (
            "이미지를 등록해주세요."
          ) : (
            <ThumbnailImg
              src={Object.values(imgData).filter((x) => x !== "")[imgNum]}
            />
          )}
        </ThumbnailImgBox>
        <PlusIconBox>
          {Object.values(imgData).filter((x) => x !== "").length > 1 &&
            imgNum <
              Object.values(imgData).filter((x) => x !== "").length - 1 && (
              <FontAwesomeIcon
                onClick={upImgNum}
                icon={faArrowRight}
                className="mx-3 pointer board-create-icon"
              />
            )}
        </PlusIconBox>
      </div>
      <ImgListBox>
        {imgCountArr.map((x, i) =>
          i === imgNum ? (
            <FontAwesomeIcon icon={faCircleS} className="mx-2 mt-2" key={i} />
          ) : (
            <FontAwesomeIcon icon={faCircleR} className="mx-2 mt-2" key={i} />
          )
        )}
      </ImgListBox>
    </div>
  );
};

export const TopAddImg = ({ addImgData, setImgNum, imgData }) => {
  //총 5개의 이미지를 등록할 수 있도록 박스 5개를 배치하는 배열
  const imgBox = Array(5)
    .fill(1)
    .map((x, i) => (x = x + i));
  return (
    <div className="w-100 d-flex justify-content-center align-items-center my-5">
      {imgBox.map((x) => (
        <AddImg
          x={x}
          key={x}
          addImgData={addImgData}
          setImgNum={setImgNum}
          imgData={imgData}
        />
      ))}
    </div>
  );
};

const BottomContentBox = ({ updateContent, desc, onEditorChange }) => {
  return (
    <div
      className="w-100 d-flex justify-content-start align-items-center flex-column my-5"
      style={{ height: "70vh" }}
    >
      <div className="w-50 d-flex justify-content-center align-items-center my-5">
        <div className="me-5 flex-07">
          <div>
            <input
              onChange={updateContent}
              type="email"
              className="form-control"
              name="title"
              placeholder="제목을 적어주세요."
            />
          </div>
        </div>
        <div className="flex-03">
          <select
            className="form-select"
            name="category"
            onChange={updateContent}
          >
            <option disabled>-칵테일 레시피-</option>
            <option defaultValue="레시피">레시피</option>
            <option disabled>-칵테일 맛집-</option>
            <option defaultValue="서울/경기">서울/경기</option>
            <option defaultValue="광역시">광역시</option>
            <option defaultValue="그 외">그 외</option>
          </select>
        </div>
      </div>
      <div className=" mb-5 w-50 h-100">
        <EditorComponent value={desc} onChange={onEditorChange} />
      </div>
    </div>
  );
};

export default BoardCreate;
