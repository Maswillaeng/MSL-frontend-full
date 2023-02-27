import { useNavigate } from "react-router-dom";
import getUser from "../function/getUser";

const Li = ({ data }) => {
  const navigate = useNavigate();
  const checkLogin = () => {
    if (getUser("user")) {
      navigate("/boardCreate");
    } else {
      alert("로그인을 부탁드려요.");
      navigate("/login");
    }
  };
  return (
    <>
      {" "}
      {Object.keys(data)[0] !== "게시판" ? (
        data[Object.keys(data)[0]].event ? (
          <li className="nav-item" onClick={data[Object.keys(data)[0]].event}>
            <a className="nav-link" href="#!">
              {Object.keys(data)[0]}
            </a>
          </li>
        ) : (
          <li className="nav-item">
            <a className="nav-link" href={data[Object.keys(data)[0]].href}>
              {Object.keys(data)[0]}
            </a>
          </li>
        )
      ) : (
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#!"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            게시판
          </a>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="/board">
                자유게시판
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#!" onClick={checkLogin}>
                글쓰기
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/">
                즐겨찾기
              </a>
            </li>
          </ul>
        </li>
      )}{" "}
    </>
  );
};
export default Li;
