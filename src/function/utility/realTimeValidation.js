import members from "../../dummy/members";
import {
  validationNickname,
  validationPassword,
  validationPhone,
} from "./validation";

export const realTimeValidation = (member) => {
  let message = {};
  if (members.filter((x) => x.email === member.email).length !== 0) {
    message = { ...message, email: "이미 사용중인 이메일입니다." };
  }
  if (!validationPassword.test(member.password) && member.password !== "") {
    message = {
      ...message,
      password: "8글자 이상 영문, 숫자, 특수문자를 사용하세요.",
    };
  }
  if (member.pwc !== "" && member.password !== member.pwc) {
    message = { ...message, pwc: "비밀번호가 다릅니다." };
  }
  if (
    members.filter((x) => x.nickname === member.nickname).length !== 0 &&
    member.nickname !== ""
  ) {
    message = { ...message, nickname: "이미 사용중인 닉네임입니다." };
  }
  if (validationNickname.test(member.nickname) && member.nickname !== "") {
    message = { ...message, nickname: "특수문자 사용이 제한됩니다." };
  }
  if (!validationPhone.test(member.phoneNumber) && member.phoneNumber !== "") {
    message = { ...message, phoneNumber: "올바른 휴대폰 번호를 적어주세요." };
  }
  return message;
};
