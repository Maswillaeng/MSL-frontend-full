import Li from "../components/Li"

const Nav = () => {
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

export default Nav