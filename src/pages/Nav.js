import { useLocation } from "react-router-dom";
import Li from "../components/Li";

const Nav = () => {
  const location = useLocation();
  return <>{location.pathname !== "/boardCreate" && <MainNav />}</>;
};

const MainNav = () => {
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

  return (
    <nav className="navbar navbar-expand-lg bg-light py-2 fs-3">
      <div className="container-fluid px-5">
        <a className="navbar-brand fs-1" href="/">
          칵테일 레시피
        </a>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="w-100 navbar-nav d-flex justify-content-end align-items-center">
            {navArr.map((data, idx) => (
              <Li data={data} idx={idx} key={Object.keys(data)[0]} />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
