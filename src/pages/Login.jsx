import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import login from "../function/cookie/login";
import { useNavigate } from "react-router-dom";
import {
  validationEmail,
  validationPassword,
} from "../function/utility/validation";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const [danger, setDanger] = useState([false, false]);
  const userArr = [
    {
      id: "email",
      name: "이메일",
      placeholder: "이메일을 적어주세요.",
      type: "email",
      danger: "이메일을 확인해주세요.",
    },
    {
      id: "password",
      name: "비밀번호",
      placeholder: "비밀번호를 적어주세요.",
      type: "password",
      danger: "비밀번호를 확인해주세요.",
    },
  ];

  //타겟들을 설정하기 위한 useRef 배열
  const targetRefs = useRef([]);
  //유효성검사
  const buttonEvent = (e) => {
    if (!validationEmail.test(user.email)) {
      setDanger([true, false]);
      return targetRefs.current[0].focus();
    }
    if (!validationPassword.test(user.password)) {
      setDanger([false, true]);
      return targetRefs.current[1].focus();
    }
    axios
      .post("http://localhost:8080/login", user, {
        headers: {
          "Content-Type": `application/json`,
        },
        withCredentials: true,
      })
      .then((res) => {
        login(user.email);
        navigate("/");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        alert("로그인에 실패했습니다.");
      });
  };

  return (
    <form
      className="container border border-info rounded d-flex flex-column justify-content-center align-items-center mt-4"
      id="form-login"
    >
      {userArr.map((data, idx) => (
        <Input
          key={data.id}
          data={data}
          setMember={setUser}
          member={user}
          targetRefs={targetRefs}
          idx={idx}
          danger={danger}
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
  );
};

export default Login;
