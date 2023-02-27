import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";

export default function SignUp() {
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
    "email",
    "password",
    "pwc",
    "nickname",
    "phoneNumber",
    "userImage",
    "introduction",
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
        .post('http://localhost:8080/api/sign', member, {
            headers: {
                "Content-Type": `application/json`
            }
        })
        .then((res) => {
            console.log(res);
        })
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
