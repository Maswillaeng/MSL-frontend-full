import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../recoil/atom";

const Li = ({ data }) => {
  const navigate = useNavigate();

  //로그인 체크 상태
  const currentUser = useRecoilValue(currentUserState);

  //로그인 유저라면 boardCreate로 이동, 아니라면 로그인 페이지로 이동하는 이벤트
  const checkLogin = () => {
    if (currentUser !== 0) {
      navigate("/boardCreate");
    } else {
      alert("로그인을 부탁드려요.");
      navigate("/login");
    }
  };

  return (
    <>
      {Object.keys(data)[0] !== "게시판" ? (
        data[Object.keys(data)[0]].event ? (
          <li
            className="nav-item text-light me-5 pointer"
            onClick={data[Object.keys(data)[0]].event}
          >
            <span
              className={
                Object.keys(data)[0] === "뒤로가기" ||
                Object.keys(data)[0] === "완료" ||
                Object.keys(data)[0] === "글 작성"
                  ? "nav-link"
                  : "nav-link text-light"
              }
            >
              {Object.keys(data)[0]}
            </span>
          </li>
        ) : (
          <li className="nav-item me-5">
            <a
              className="nav-link text-light"
              href={data[Object.keys(data)[0]].href}
            >
              {Object.keys(data)[0]}
            </a>
          </li>
        )
      ) : (
        <li className="nav-item dropdown ">
          <a
            className="nav-link dropdown-toggle text-light"
            href="#!"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            게시판
          </a>
          <ul className="dropdown-menu">
            <li>
              <span
                className="dropdown-item pointer"
                onClick={() => navigate("/board")}
              >
                전체게시글
              </span>
            </li>
            <li>
              <span className="dropdown-item pointer" onClick={checkLogin}>
                글쓰기
              </span>
            </li>
          </ul>
        </li>
      )}
    </>
  );
};
export default Li;
