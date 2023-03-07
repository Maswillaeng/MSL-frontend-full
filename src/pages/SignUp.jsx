import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import {
  validationEmail,
  validationNickname,
  validationPassword,
  validationPhone,
} from "../function/utility/validation";
import members from "../dummy/members";
import { realTimeValidation } from "../function/utility/realTimeValidation";
import { postSignUp } from "../function/api/postSignUp";
import getUserCookie from "../function/cookie/getUserCookie";

const SignUp = () => {
  const navigate = useNavigate();

  //최초 접근 시, 이메일 입력칸 포커스
  useEffect(() => {
    if (getUserCookie("user")) {
      alert("이미 로그인 상태입니다.");
      return navigate("/");
    }
    targetRefs.current[0].focus();
  }, []);

  //프로필 이미지 상태
  const [imgFile, setImgFile] = useState("");

  //프로필 이미지를 저장하기 위한 이벤트
  const saveImgFile = (num) => {
    const file = targetRefs.current[num].files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
      setMember({ ...member, userImage: reader.result });
    };
  };

  //input들을 target 설정해주기 위한 ref
  const targetRefs = useRef([]);

  //input 데이터들을 가진 배열
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
      placeholder: "",
      type: "file",
    },
    {
      id: "introduction",
      name: "자기소개",
      placeholder: "자기소개를 적어주세요.",
      type: "text",
    },
  ];

  //인풋값 저장용 상태
  const [member, setMember] = useState({
    email: "",
    password: "",
    pwc: "",
    nickname: "",
    phoneNumber: "",
    userImage: "/img/마쉴랭.PNG",
    introduction: "",
  });

  //실시간 유효성 검사 메세지
  const [warning, setWarning] = useState({});
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      console.log("디바운싱");
      //서버에 api 요청을 모아서 1번만 해야하기때문에 입력을 멈췄을 때, realTimeValidation 함수만 1번 실행되면 된다.
      setWarning(realTimeValidation(member));
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [member]);

  /**
   * 폼 제출 시, 마지막 유효성 검사
   */
  const buttonEvent = () => {
    if (
      !validationEmail.test(member.email) ||
      members.filter((x) => x.email === member.email).length !== 0
    )
      return targetRefs.current[0].focus();

    if (!validationPassword.test(member.password))
      return targetRefs.current[1].focus();

    if (member.password !== member.pwc) return targetRefs.current[2].focus();

    if (
      members.filter((x) => x.nickname === member.nickname).length !== 0 ||
      validationNickname.test(member.nickname) ||
      member.nickname === ""
    )
      return targetRefs.current[3].focus();

    if (!validationPhone.test(member.phoneNumber))
      return targetRefs.current[4].focus();

    postSignUp(member)
      .then((res) => {
        alert("회원가입을 축하합니다.");
        navigate("/");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center w-100">
      <form className="border border-info rounded d-flex flex-column justify-content-center align-items-center mt-4 w-50 pt-3">
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
            warning={warning}
          />
        ))}
        <Button buttonEvent={buttonEvent} size={"lg"} message={"회원가입"} />
      </form>
    </div>
  );
};

export default SignUp;
