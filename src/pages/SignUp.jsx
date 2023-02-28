import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";

export default function SignUp() {
  const navigate = useNavigate()
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
  const targetRefs = useRef([]);
  //폼 제출 여부 파악용
  const [formCheck, setFormCheck] = useState(false);
  //제출되면 다시 false로
  useEffect(() => {
    setFormCheck(false);
  }, [formCheck]);
  //유효성검사
  const buttonEvent = (e) => {
    if (Object.values(member).filter((x) => x === "").length > 0) {
      e.preventDefault();
    }
    if (member.email === "") {
      return targetRefs.current[0].focus();
    }
    if (member.password === "") {
      return targetRefs.current[1].focus();
    }
    if (member.pwc === "" || member.password !== member.pwc) {
      return targetRefs.current[2].focus();
    }
    if (member.nickname === "") {
      return targetRefs.current[3].focus();
    }
    if (member.phoneNumber === "") {
      return targetRefs.current[4].focus();
    }
    if (member.userImage === "") {
      return targetRefs.current[5].focus();
    }
    if (member.introduction === "") {
      return targetRefs.current[6].focus();
    }
    axios
      .post("http://localhost:8080/api/sign", member, {
        headers: {
          "Content-Type": `application/json`,
        },
      })
      .then((res) => {
        alert('회원가입을 축하합니다.')
        navigate('/')
        console.log(res);
      });
    setFormCheck(true);
  };

  return (
    <form
      className="container border border-info rounded d-flex flex-column justify-content-center align-items-center mt-4"
      style={{
        maxWidth: "500px",
        minHeight: "400px",
      }}
      action=""
    >
      {inputArr.map((data, idx) => (
        <Input
          key={data}
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
    </form>
  );
}
