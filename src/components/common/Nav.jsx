import { useLocation, useNavigate } from "react-router-dom";
import Li from "./Li";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMartiniGlassEmpty } from "@fortawesome/free-solid-svg-icons";
import { postLogOut } from "../../function/api/log";
import { useRecoilState } from "recoil";
import { currentUserState, lastSliceNumState } from "../../recoil/atom";
import { useCallback, useEffect } from "react";
import { getIdCookie, deleteIdCookie } from "../../function/cookie/cookie";

const Nav = () => {
  //boardCreate만 다른 네비바를 갖기 위해 작성
  const location = useLocation();
  return <>{location.pathname !== "/boardCreate" && <MainNav />}</>;
};

const MainNav = () => {
  const navigate = useNavigate();

  //무한 스크롤 카운트 상태
  const [, setLastSliceNum] = useRecoilState(lastSliceNumState);

  /**
   *무한스크롤 카운트를 1로 바꾸고 메인 페이지로 이동하는 이벤트
   */
  const moveMain = useCallback(() => {
    setLastSliceNum(1); //전역으로 무한스크롤을 관리하다보니 다시 1로 리셋
    navigate("/");
  }, [navigate, setLastSliceNum]);

  //로그인 체크 상태
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  //로그인 상태가 아니라면 발동하는 이펙트
  useEffect(() => {
    if (getIdCookie() !== currentUser) {
      alert("다시 로그인을 부탁드려요.");
      return window.location.replace("/");
    }
  }, [currentUser, navigate]);

  //로그아웃했을 때, li 데이터들을 가진 배열
  const navArr = [
    {
      회원가입: {
        event: () => {
          navigate("/signUp");
        },
      },
    },
    {
      로그인하기: {
        event: () => {
          navigate("/login");
        },
      },
    },
    {
      게시판: {
        href: "/#!",
      },
    },
  ];

  //로그인했을 때, li 데이터들을 가진 배열
  const loginNavArr = [
    {
      로그아웃: {
        event: () => {
          postLogOut()
            .then(() => {
              alert("로그아웃 되었습니다.");
              deleteIdCookie();
              setCurrentUser(0);
              navigate("/");
            })
            .catch((err) => {
              console.log(err);
              alert("잠시 후 다시 시도해주세요.");
            });
        },
      },
    },
    {
      마이페이지: {
        event: () => {
          navigate(`/myPage/${getIdCookie()}`);
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
        <div className="navbar-brand fs-1 text-light ms-5">
          <FontAwesomeIcon icon={faMartiniGlassEmpty} />
          <span className="mx-3 pointer" onClick={moveMain}>
            마쉴랭
          </span>
        </div>
        <div className="navbar-collapse" id="navbarNavDropdown">
          <ul className="w-100 navbar-nav d-flex justify-content-end align-items-center">
            {getIdCookie() !== 0
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
