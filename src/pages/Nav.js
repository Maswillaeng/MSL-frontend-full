import { useLocation, useNavigate } from "react-router-dom";
import Li from "../components/Li"

const Nav = () => {
    const location = useLocation();
  return (
    <>
      {location.pathname === '/' && <MainNav/>}
      {location.pathname === '/login' && <MainNav />}
      {location.pathname === '/signUp' && <MainNav />}
      {location.pathname === '/board' && <MainNav />}
      {location.pathname === '/boardDetail/:id' && <MainNav />}
      {location.pathname === '/boardCreate' && <BoardCreateNav />}
    </>
  );
}

const MainNav = ()=>{
    const navArr = [
        {
            "홈으로": {
                href: "/"
            }
        }, {
            "로그인하기": {
                href: "/login"
            }
        }, {
            "회원가입": {
                href: "/signUp"
            }
        }, {
            "게시판": {
                href: "/#!"
            }
        }
    ]

    return <nav className="navbar navbar-expand-lg bg-light py-2 fs-3">
        <div className="container-fluid">
            <a className="navbar-brand fs-1" href="/">칵테일 레시피</a>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    {
                        navArr.map((data, idx) =>< Li data = {
                            data
                        }
                        idx = {
                            idx
                        }
                        key = {
                            Object.keys(data)[0]
                        } />)
                    }
                </ul>
            </div>
        </div>
    </nav>
}

const BoardCreateNav = () =>{
    const navigate=useNavigate()
    const backPage = ()=>{
        navigate(-1)
    }
    const navArr = [
        {
            "뒤로가기": {
                event :  backPage
            }
        }, {
            "글 작성": {
                event :  console.log('1')
            }
        }, {
            "완료": {
                event :  console.log('2')
            }
        }
    ]
    return <nav className="navbar navbar-expand-lg bg-light py-2 fs-3 w-100">
    <div className="container-fluid w-100">
        <div className="collapse navbar-collapse w-100" id="navbarNavDropdown">
            <ul className="navbar-nav d-flex justify-content-between align-items-center my-3 w-100 px-5 fs-1">
                {
                    navArr.map((data, idx) =>< Li 
                    data = {
                        data
                    }
                    idx = {
                        idx
                    }
                    key = {
                        Object.keys(data)[0]
                    } />)
                }
            </ul>
        </div>
    </div>
</nav>
}



export default Nav