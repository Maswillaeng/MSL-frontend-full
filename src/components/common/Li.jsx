import { useLocation, useNavigate } from "react-router-dom";
import getIdCookie from "../../function/cookie/getIdCookie";

const Li = ({ data }) => {
  const navigate = useNavigate();
  const location = useLocation();

  //경로 이름 추출
  const path = location.pathname;
  console.log(Object.keys(data)[0]);

  //로그인 유저라면 boardCreate로 이동, 아니라면 로그인 페이지로 이동하는 이벤트
  const checkLogin = () => {
    if (getIdCookie() !== 0) {
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
            className="nav-item text-light me-4 pointer"
            onClick={data[Object.keys(data)[0]].event}
          >
            <span
              className={
                path === "/boardCreate" ? "nav-link" : "nav-link text-light"
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
        <li
          className="nav-item dropdown text-center"
          style={{ width: "160px" }}
        >
          <a
            className="nav-link dropdown-toggle text-light"
            href="#!"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            게시판
          </a>
          <ul className="dropdown-menu position-absolute">
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
