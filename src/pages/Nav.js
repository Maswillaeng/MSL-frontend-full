import { useLocation, useNavigate } from "react-router-dom";
import Li from "../components/Li";
import getUser from "../function/getUser";
import logOut from "../function/logOut";

const Nav = () => {
  const location = useLocation();
  return <>{location.pathname !== "/boardCreate" && <MainNav />}</>;
};

const MainNav = () => {
  const navigate = useNavigate()
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

  const loginNavArr = [
    {
      로그아웃: {
        event: ()=>{
          alert('로그아웃 되었습니다.')
          logOut(getUser("user"))
          navigate('/')
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
    <nav className="navbar navbar-expand-lg bg-light py-2 fs-3">
      <div className="container-fluid px-5">
        <a className="navbar-brand fs-1" href="/">
          칵테일 레시피
        </a>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="w-100 navbar-nav d-flex justify-content-end align-items-center">
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
