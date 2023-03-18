import React, { useState, useRef, useEffect } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import {
  validationEmail,
  validationPassword,
} from "../function/utility/validation";
import { postLogin } from "../function/api/postLogin";
import { useRecoilState } from "recoil";
import { currentUserState } from "../recoil/atom";

const Login = () => {
  const navigate = useNavigate();

  //로그인 시, 회원 아이디 저장용 상태
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  //최초 접근 시, 이메일 입력칸 포커스
  useEffect(() => {
    if (currentUser !== 0) {
      alert("이미 로그인 상태입니다.");
      return navigate("/");
    }
    targetRefs.current[0].focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //유저 데이터 상태
  const [user, setUser] = useState({ email: "", password: "" });

  //경고 메세지 상태
  const [warning, setWarning] = useState([false, false]);

  //input 데이터 배열
  const userArr = [
    {
      id: "email",
      name: "이메일",
      placeholder: "이메일을 적어주세요.",
      type: "email",
      warning: "이메일을 확인해주세요.",
    },
    {
      id: "password",
      name: "비밀번호",
      placeholder: "비밀번호를 적어주세요.",
      type: "password",
      warning: "비밀번호를 확인해주세요.",
    },
  ];

  //타겟들을 설정하기 위한 useRef 배열
  const targetRefs = useRef([]);

  /**
   * 로그인 버튼 이벤트, 유효성검사
   */
  const buttonEvent = () => {
    if (!validationEmail.test(user.email)) {
      setWarning([true, false]);
      return targetRefs.current[0].focus();
    }
    if (!validationPassword.test(user.password)) {
      setWarning([false, true]);
      return targetRefs.current[1].focus();
    }
    postLogin(user)
      .then((res) => {
        setCurrentUser(res.data.result.userId);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        alert("로그인에 실패했습니다.");
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center w-100">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="card shadow  d-flex flex-column justify-content-center align-items-center mt-4 w-50 py-3"
      >
        {userArr.map((data, idx) => (
          <Input
            key={data.id}
            data={data}
            setMember={setUser}
            member={user}
            targetRefs={targetRefs}
            idx={idx}
            warning={warning}
          />
        ))}
        <Button size={"lg"} buttonEvent={buttonEvent} message={"로그인"} />
        <div className="row justify-content-center align-items-center w-50 pt-2">
          <div className="col-lg-4 col-md-12 text-center mb-3 mb-lg-0 ">
            <span className="nav-link" onClick={() => navigate("/signUp")}>
              회원가입
            </span>
          </div>
          <div className="col-lg-8 col-md-12 text-center">
            <div className="d-flex justify-content-center">
              <span className="pointer me-2">이메일 /</span>
              <span className="pointer me-2">비밀번호 찾기</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
