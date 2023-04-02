import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faCircle as faCircleS,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle as faCircleR } from "@fortawesome/free-regular-svg-icons";
import AddImg from "../components/boardCreate/AddImg";
import { useLocation, useNavigate } from "react-router-dom";
import Li from "../components/common/Li";
import EditorComponent from "../components/boardCreate/EditorComponent";
import styled from "styled-components";
import { putBoard, postBoard, getBoard } from "../function/api/board";
import { WithContext as ReactTags } from "react-tag-input";
import { useRecoilState } from "recoil";
import { boardDataState } from "../recoil/atom";

const BoardCreate = () => {
  const location = useLocation();

  const [editData, setEditData] = useState(undefined);
  //글 수정하기로 이동했을 시 실행될 이펙트
  useEffect(() => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
    if (location.state) {
      const data = location.state.boardData;
      setDesc(data.content);
      setContent({ ...content, title: data.title, category: data.category });
      setEditData(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  const [content, setContent] = useState({
    title: "",
    category: "레시피",
    content: "",
  });

  //해시태그 값 상태
  const [tags, setTags] = useState([]);

  /**
   * 해시태그 업데이트
   */
  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };
  /**
   * 해시태그 중복 삭제
   */
  const handleDelete = (index) => {
    setTags(tags.filter((tag, i) => i !== index));
  };

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
      <BoardCreateNav
        content={content}
        imgData={imgData}
        imgNum={imgNum}
        editData={editData}
        tags={tags}
      />
      <div className="d-flex flex-column justify-content-start align-items-center my-3 p-5 ">
        <TopImgBox imgData={imgData} imgNum={imgNum} setImgNum={setImgNum} />
        <TopAddImg
          addImgData={addImgData}
          setImgNum={setImgNum}
          imgData={imgData}
        />
        <BottomContentBox
          content={content}
          updateContent={updateContent}
          onEditorChange={onEditorChange}
          handleAddition={handleAddition}
          handleDelete={handleDelete}
          tags={tags}
          desc={desc}
        />
      </div>
    </>
  );
};

const BoardCreateNav = ({ content, imgData, imgNum, editData, tags }) => {
  const navigate = useNavigate();

  //게시글 데이터 상태
  const [, setBoardData] = useRecoilState(boardDataState);

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
    const tag = tags.map((x) => x.text);
    const postData = {
      ...content,
      thumbnail:
        allImgData.length === 0 ? "/img/마쉴랭.PNG" : allImgData[imgNum],
      imgData: allImgData.length === 0 ? "/img/마쉴랭.PNG" : allImgData,
      tag: tag,
    };

    postBoard(postData)
      .then(() => {
        alert("글이 등록되었습니다.");
        getBoard()
          .then((res) => {
            const data = res.data.result.reverse();
            return data;
          })
          .then((res) => {
            setBoardData(res);
          });
      })
      .then(() => navigate("/board"))
      .catch(() => {
        alert("잠시 후에 다시 시도해주세요.");
      });
  };

  /**
   * 글 수정 이벤트
   */
  const editEvent = () => {
    const allImgData = Object.values(imgData).filter((x) => x !== "");
    const postData = {
      ...content,
      thumbnail:
        allImgData.length === 0 ? "/img/마쉴랭.PNG" : allImgData[imgNum],
      imgData: allImgData.length === 0 ? "/img/마쉴랭.PNG" : allImgData,
    };
    const num = editData.postId;

    putBoard(num, postData)
      .then(() => {
        alert("글이 수정되었습니다.");
        getBoard()
          .then((res) => {
            const data = res.data.result.reverse();
            console.log(data);
            return data;
          })
          .then((res) => {
            setBoardData(res);
          });
      })
      .then(() => navigate("/board"))
      .catch(() => {
        alert("잠시 후에 다시 시도해주세요.");
      });
  };

  /**
   * 뒤로가기 이벤트를 위한 함수 navigate가 콜백안에서 직접 작성이 불가하길래 따로 빼서 작성함
   */
  const backPage = () => {
    navigate(-1);
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
        event: editData ? editEvent : successEvent,
      },
    },
  ];

  return (
    <nav className="navbar navbar-expand-lg bg-light py-2 fs-3 w-100">
      <div className="container-fluid w-100">
        <div className="navbar-collapse w-100" id="navbarNavDropdown">
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

const TopImgContainer = styled.div.attrs({
  className:
    "w-100 d-flex justify-content-center align-items-center flex-column",
})`
  min-width: 400px;
`;

const ThumbnailImgBox = styled.div.attrs({
  className:
    "w-25 d-flex justify-content-center align-items-center card shadow mx-3 fs-3",
})`
  height: 40vh;
  min-width: 360px;
`;
const ThumbnailImg = styled.img.attrs({
  className: " p-3 h-100 w-100",
  alt: "",
})``;
const PlusIconBox = styled.div.attrs({
  className: "d-flex justify-content-center align-items-center",
})`
  width: 5vw;
  height: 5vh;
`;
const ImgListBox = styled.div`
  height: 2vh;
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
    <TopImgContainer>
      <div>{"<썸네일 선택>"}</div>
      <div className="w-50 d-flex justify-content-center align-items-center h-100 mb-3">
        <PlusIconBox>
          {imgNum > 0 && (
            <FontAwesomeIcon
              onClick={downImgNum}
              icon={faArrowLeft}
              className="pointer board-create-icon"
            />
          )}
        </PlusIconBox>
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
    </TopImgContainer>
  );
};

export const TopAddImg = ({ addImgData, setImgNum, imgData }) => {
  //총 5개의 이미지를 등록할 수 있도록 박스 5개를 배치하는 배열
  const imgBox = Array(5)
    .fill(1)
    .map((x, i) => (x = x + i));
  return (
    <div className="w-75 row justify-content-center align-items-center my-4">
      {imgBox.map((x) => (
        <AddImg
          num={x}
          key={x}
          addImgData={addImgData}
          setImgNum={setImgNum}
          imgData={imgData}
        />
      ))}
    </div>
  );
};

const EditorBox = styled.div.attrs({
  className: "col-12 mb-5 w-50",
})`
  min-width: 365px;
`;
const TagsBox = styled.div.attrs({
  className: "w-50 pt-4",
})`
  min-width: 365px;
`;

const ContentTitleBox = styled.div.attrs({
  className: "w-50 my-5 row",
})`
  min-width: 365px;
`;

const BottomContentBox = ({
  updateContent,
  desc,
  onEditorChange,
  content,
  handleAddition,
  handleDelete,
  tags,
}) => {
  return (
    <div className="w-100 d-flex justify-content-start align-items-center flex-column my-3">
      <ContentTitleBox>
        <div className="col-lg-8 col-md-12 m-1 px-0">
          <div>
            <input
              onChange={updateContent}
              value={content.title}
              type="text"
              className="form-control"
              name="title"
              placeholder="제목을 적어주세요."
            />
          </div>
        </div>
        <div className="col-lg-3 col-md-12 m-1 px-0">
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
      </ContentTitleBox>
      <EditorBox>
        <EditorComponent value={desc} onChange={onEditorChange} />
      </EditorBox>
      <TagsBox>
        <ReactTags
          tags={tags}
          handleAddition={handleAddition}
          handleDelete={handleDelete}
          classNames={{
            tag: "btn btn-primary p-1 m-1",
            remove: "btn btn-primary btn-sm",
            tagInput: "form-control w-100",
            tagInputField: "tag-input-class",
          }}
          inputAttributes={{
            className: "tag-input-class", // input 요소에 추가할 클래스명
          }}
          placeholder="해시태그를 입력해주세요." // input placeholder 추가
          inputFieldPosition="bottom" // input 위치를 bottom으로 변경
          allowDragDrop={false} // 드래그 앤 드랍 기능 비활성화
          autofocus={false} // 자동 포커스 기능 비활성화
          delimiters={[13, 32]} // 엔터 및 스페이스바로 태그 추가 가능하도록 설정
          inline={false} // 인라인 모드 비활성화
          maxLength={15} // 최대 길이 설정
          minQueryLength={1} // 최소 쿼리 길이 설정
        />
      </TagsBox>
    </div>
  );
};

export default BoardCreate;
