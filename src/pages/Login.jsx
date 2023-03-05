import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import loginCookie from "../function/cookie/loginCookie";
import { useNavigate } from "react-router-dom";
import {
  validationEmail,
  validationPassword,
} from "../function/utility/validation";
import { getLogin } from "../function/api/getLogin";

const Login = () => {
  const navigate = useNavigate();

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

  //로그인 버튼 이벤트, 유효성검사
  const buttonEvent = (e) => {
    if (!validationEmail.test(user.email)) {
      setWarning([true, false]);
      return targetRefs.current[0].focus();
    }
    if (!validationPassword.test(user.password)) {
      setWarning([false, true]);
      return targetRefs.current[1].focus();
    }
    getLogin(user)
      .then(() => {
        loginCookie(user.email);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        alert("로그인에 실패했습니다.");
      });
  };

  //최초 접근 시, 이메일 입력칸 포커스
  useEffect(() => {
    targetRefs.current[0].focus();
  }, []);

  return (
    <div className="container d-flex justify-content-center align-items-center w-50">
      <form className="border border-info rounded d-flex flex-column justify-content-center align-items-center mt-4 w-50 pt-3">
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
        <div className="d-flex justify-content-center align-items-center w-100">
          <div className="mx-5">
            <a className="nav-link" href="/signUp">
              회원가입
            </a>
          </div>
          <div className="my-3">
            <span className="pointer">이메일</span>
            <span className="pointer">비밀번호 찾기</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
