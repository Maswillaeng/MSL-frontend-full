import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import {
  validationEmail,
  validationNickname,
  validationPassword,
  validationPhone,
} from "../function/utility/validation";

export default function SignUp() {
  const navigate = useNavigate();
  //프로필 이미지
  const [imgFile, setImgFile] = useState("");
  const saveImgFile = (num) => {
    const file = targetRefs.current[num].files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };
  //인풋 map 돌리기위한 배열
  const targetRefs = useRef([]);
  const inputArr = [
    {
      id: "email",
      name: "이메일",
      placeholder: "이메일을 적어주세요.",
      type: "email",
    },
    {
      id: "password",
      name: "비밀번호",
      placeholder: "비밀번호를 적어주세요.",
      type: "password",
    },
    {
      id: "pwc",
      name: "비밀번호확인",
      placeholder: "비밀번호를 적어주세요.",
      type: "password",
    },
    {
      id: "nickname",
      name: "닉네임",
      placeholder: "닉네임을 적어주세요.",
      type: "text",
    },
    {
      id: "phoneNumber",
      name: "전화번호",
      placeholder: "전화번호를 적어주세요.",
      type: "tel",
    },
    {
      id: "userImage",
      name: "이미지",
      placeholder: "이미지를 등록해주세요.",
      type: "file",
    },
    {
      id: "introduction",
      name: "자기소개",
      placeholder: "자기소개를 적어주세요.",
      type: "text",
    },
  ];
  //인풋값 저장용
  const [member, setMember] = useState({
    email: "",
    password: "",
    pwc: "",
    nickname: "",
    phoneNumber: "",
    userImage: "",
    introduction: "",
  });
  console.log(member);
  useEffect(() => {
    setMember({ ...member, userImage: imgFile });
  }, [imgFile]);
  //유효성검사
  const buttonEvent = (e) => {
    if (Object.values(member).filter((x) => x === "").length > 0) {
      e.preventDefault();
    }
    //이메일 유효성 검사
    if (!validationEmail.test(member.email)) {
      return targetRefs.current[0].focus();
    }
    if (!validationPassword.test(member.password)) {
      return targetRefs.current[1].focus();
    }
    //비번끼리 같거나, 유효성검사 걸리면
    if (
      !validationPassword.test(member.pwc) ||
      member.password !== member.pwc
    ) {
      return targetRefs.current[2].focus();
    }
    //특문금지
    if (validationNickname.test(member.nickname) || member.nickname === "") {
      return targetRefs.current[3].focus();
    }
    //휴대폰 번호 유효성검사
    if (!validationPhone.test(member.phoneNumber)) {
      return targetRefs.current[4].focus();
    }
    axios
      .post("http://localhost:8080/api/sign", member, {
        headers: {
          "Content-Type": `application/json`,
        },
      })
      .then((res) => {
        alert("회원가입을 축하합니다.");
        navigate("/");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const SignUpForm = styled.form.attrs({
    className:
      "container border border-info rounded d-flex flex-column justify-content-center align-items-center mt-4",
    action: "",
  })`
    max-width: 500px;
    min-height: 400px;
  `;

  return (
    <SignUpForm>
      {inputArr.map((data, idx) => (
        <Input
          key={data.id}
          data={data}
          setMember={setMember}
          member={member}
          targetRefs={targetRefs}
          idx={idx}
          saveImgFile={saveImgFile}
          imgFile={imgFile}
        />
      ))}
      <Button buttonEvent={buttonEvent} size={"lg"} message={"회원가입"} />
    </SignUpForm>
  );
}
