import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Li from "../components/Li";
import getUser from "../function/getUser";
import logOut from "../function/logOut";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMartiniGlassEmpty } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  const location = useLocation();
  return <>{location.pathname !== "/boardCreate" && <MainNav />}</>;
};

const MainNav = () => {
  const navigate = useNavigate();
  const navArr = [
    {
      회원가입: {
        href: "/signUp",
      },
    },
    {
      로그인하기: {
        href: "/login",
      },
    },
    {
      게시판: {
        href: "/#!",
      },
    },
  ];
  let user = { user_id: "123" };
  const loginNavArr = [
    {
      로그아웃: {
        event: () => {
          axios
            .post("http://localhost:8080/api/logout", user, {
              headers: {
                "Content-Type": `application/json`,
              },
            })
            .then((res) => {
              alert("로그아웃 되었습니다.");
              logOut(getUser("user"));
              navigate("/");
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
              alert("실패요");
            });
        },
      },
    },
    {
      마이페이지: {
        event: () => {
          navigate("/myPage");
        },
      },
    },
    {
      게시판: {
        href: "/#!",
      },
    },
  ];
  return (
    <nav className="navbar navbar-expand-lg main-bg-color py-2 fs-3 ">
      <div className="container-fluid px-5  main-bg-color">
        <a className="navbar-brand fs-1 text-light ms-5" href="/">
          <FontAwesomeIcon icon={faMartiniGlassEmpty} />
          <span className="mx-3">마쉴랭</span>
        </a>
        <div className="collapse navbar-collapse " id="navbarNavDropdown">
          <ul className="w-100 navbar-nav d-flex justify-content-end align-items-center ">
            {getUser("user")
              ? loginNavArr.map((data, idx) => (
                  <Li data={data} idx={idx} key={Object.keys(data)[0]} />
                ))
              : navArr.map((data, idx) => (
                  <Li data={data} idx={idx} key={Object.keys(data)[0]} />
                ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
