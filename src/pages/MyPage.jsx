import { useState } from "react";
import Button from "../components/Button";
import members from "../dummy/members";
import getUser from "../function/cookie/getUser";

const MyPage = () => {
  const [categori, setCategori] = useState("");

  return (
    <div className="container rounded d-flex flex-column justify-content-start align-items-start mt-3 p-5">
      <TopProfileTop />
      <TopProfileBottom />
      <BottomCategori setCategori={setCategori} categori={categori} />
      <div className="mb-5 px-5 d-flex justify-content-center align-items-center w-100">
        글
      </div>
    </div>
  );
};

const TopProfileTop = () => {
  return (
    <div className="mb-5 d-flex px-5">
      <div className="me-5">
        <img
          className="rounded-circle"
          style={{
            height: "150px",
          }}
          src={
            members.filter((x) => x.email === "shdomi8599@naver.com")[0]
              .userImage
          }
          alt=""
        />
      </div>
      <div className="d-flex flex-column">
        <div className="flex-grow-1 d-flex justify-content-start align-items-center fs-3 mb-4">
          shdomi8599
        </div>
        <div>소개글</div>
        <div className="flex-grow-1 d-flex justify-content-start align-items-center">
          <span>칵테일은 관심없다.</span>
        </div>
      </div>
    </div>
  );
};

const TopProfileBottom = () => {
  return (
    <div className="mb-5 d-flex flex-column justify-content-start align-items-start px-5">
      <div>
        <span className="me-3">팔로우 30</span>
        <span>팔로워 30</span>
      </div>
      <div style={{ marginBottom: "-15px" }}>
        <Button addStyle={"px-5"} message={"팔로우"} />
      </div>
      <div>
        <Button addStyle={"px-4"} message={"메세지 보내기"} />
      </div>
    </div>
  );
};

const BottomCategori = ({ setCategori, categori }) => {
  const writeCategori = () => {
    setCategori("작성");
  };
  const recommendCategori = () => {
    setCategori("추천");
  };
  const writeStyle = categori === "작성" ? "bg-dark text-light" : "";
  const recommendStyle = categori === "추천" ? "bg-dark text-light" : "";
  return (
    <div className="mb-5 px-5 d-flex justify-content-center align-items-center w-100 ">
      <div
        className={`flex-grow-1 d-flex justify-content-center align-items-center py-3 border border-dark ${writeStyle}`}
        onClick={writeCategori}
        style={{ cursor: "pointer" }}
      >
        내가 작성한 글
      </div>
      <div
        className={`flex-grow-1 d-flex justify-content-center align-items-center py-3 border-top border-bottom border-end border-dark ${recommendStyle}`}
        onClick={recommendCategori}
        style={{ cursor: "pointer" }}
      >
        내가 추천한 글
      </div>
    </div>
  );
};

export default MyPage;
