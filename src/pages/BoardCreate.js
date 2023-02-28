import React, { useState } from "react";
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

const BoardCreate = () => {
  //처음엔 배열로 넣었다가 객체의 형태로 바꾸게 된 이유는 이미지가 등록순서대로 보이길래 원래 있는 칸 순서대로 보이기 위해 객체로 변경함
  const [imgData, setImgData] = useState({
    imgSrc1: "",
    imgSrc2: "",
    imgSrc3: "",
    imgSrc4: "",
    imgSrc5: "",
  });
  const addImgData = (data) => {
    setImgData({
      ...imgData,
      ...data,
    });
  };
  const [imgNum, setImgNum] = useState(0);
  const [content, setContent] = useState({});
  const updateContent = (e) => {
    setContent({
      ...content,
      ...{
        [e.target.name]: e.target.value,
      },
    });
  };
  const [postData, setPostData] = useState({});
  console.log(postData)
  return (
    <>
      <BoardCreateNav
        content={content}
        imgData={imgData}
        imgNum={imgNum}
        setPostData={setPostData}
        postData={postData}
      />
      <div
        className="container rounded d-flex flex-column justify-content-start align-items-center my-5 p-5 "
        style={{
          maxWidth: "70vw",
          minHeight: "100vh",
        }}
      >
        <TopImgBox imgData={imgData} imgNum={imgNum} setImgNum={setImgNum} />
        <TopAddImg
          addImgData={addImgData}
          setImgNum={setImgNum}
          imgData={imgData}
        />
        <BottomContentBox updateContent={updateContent} />
      </div>
    </>
  );
};

const BoardCreateNav = ({ content, imgData, imgNum, setPostData }) => {
  const navigate = useNavigate();
  //완료버튼 눌러서 제출할 데이터 모두 저장 , 유효성검사 추가해야함
  const successEvent = () => {
    if (Object.values(imgData).filter((x) => x !== "").length === 0) {
      return alert("이미지를 등록해주세요.");
    }
    if (!content.title) {
      return alert("제목을 적어주세요.");
    }
    if (!content.content) {
      return alert("설명을 적어주세요.");
    }
    if (!content.categori) {
      return alert("카테고리를 선택해주세요.");
    }
    setPostData({
      ...content,
      thumbnail: Object.values(imgData).filter((x) => x !== "")[imgNum],
      imgData: Object.values(imgData).filter((x) => x !== ""),
    });
  };

  const backPage = () => {
    navigate(-1);
  };
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

const TopImgBox = ({ imgData, imgNum, setImgNum }) => {
  const imgCountArr = Array(
    Object.values(imgData).filter((x) => x !== "").length
  ).fill(1);
  const upImgNum = () => {
    setImgNum(imgNum + 1);
  };
  const downImgNum = () => {
    setImgNum(imgNum - 1);
  };
  return (
    <div className="w-100 d-flex justify-content-center align-items-center flex-column">
      <div className="w-100 d-flex justify-content-center align-items-center mb-3">
        <div
          style={{
            maxWidth: "70px",
            minWidth: "70px",
          }}
        >
          {imgNum > 0 && (
            <FontAwesomeIcon
              onClick={downImgNum}
              icon={faArrowLeft}
              className="mx-3 "
              style={{
                height: "40px",
                cursor: "pointer",
              }}
            />
          )}
        </div>
        <div
          className="w-25 d-flex justify-content-center align-items-center card shadow fs-5 mx-3"
          style={{
            minHeight: "280px",
          }}
        >
          {Object.values(imgData).filter((x) => x !== "").length === 0 ? (
            "이미지를 등록해주세요."
          ) : (
            <img
              className=""
              style={{
                maxHeight: "270px",
                minHeight: "270px",
                minWidth: "300px",
                maxWidth: "300px",
              }}
              src={Object.values(imgData).filter((x) => x !== "")[imgNum]}
              alt=""
            />
          )}
        </div>
        <div
          style={{
            maxWidth: "70px",
            minWidth: "70px",
          }}
        >
          {Object.values(imgData).filter((x) => x !== "").length > 1 &&
            imgNum <
              Object.values(imgData).filter((x) => x !== "").length - 1 && (
              <FontAwesomeIcon
                onClick={upImgNum}
                icon={faArrowRight}
                className="mx-3"
                style={{
                  height: "40px",
                  cursor: "pointer",
                }}
              />
            )}
        </div>
      </div>
      <div
        style={{
          minHeight: "20px",
          maxHeight: "20px",
        }}
      >
        {imgCountArr.map((x, i) =>
          i === imgNum ? (
            <FontAwesomeIcon icon={faCircleS} className="mx-2 mt-2" />
          ) : (
            <FontAwesomeIcon icon={faCircleR} className="mx-2 mt-2" />
          )
        )}
      </div>
    </div>
  );
};

export const TopAddImg = ({ addImgData, setImgNum, imgData }) => {
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

const BottomContentBox = ({ updateContent }) => {
  return (
    <div className="w-100 d-flex justify-content-center align-items-center flex-column my-5">
      <div className="w-50 d-flex justify-content-center align-items-center my-5">
        <div
          className="me-5"
          style={{
            flex: "0.7",
          }}
        >
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
        <div
          style={{
            flex: "0.3",
          }}
        >
          <select
            className="form-select"
            name="categori"
            onChange={updateContent}
          >
            <option selected="selected">카테고리</option>
            <option defaultValue="서울/경기">서울/경기</option>
            <option defaultValue="광역시">광역시</option>
            <option defaultValue="그 외">그 외</option>
          </select>
        </div>
      </div>
      <div className=" mb-5 w-50">
        <div>
          <textarea
            onChange={updateContent}
            placeholder="레시피에 대한 설명을 적어주세요."
            className="form-control"
            style={{
              resize: "none",
            }}
            name="content"
            rows="8"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default BoardCreate;
