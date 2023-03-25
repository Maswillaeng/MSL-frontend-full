// 아무글자 + @ + . + 2~3글자
export const validationEmail = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

//8글자 이상 영문 1개 포함, 특문 1개 포함,숫자 1개라도 포함
export const validationPassword =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

//특수문자면 true가 나오는 정규식
export const validationNickname = /[^a-zA-Z0-9ㄱ-힣]/g;

//앞자리 3글자 중간 4글자 맨뒤 4글자
export const validationPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

/**
 * 실시간 유효성 검사 이벤트
 */
export const realTimeValidation = (members, member) => {
  let message = {};
  if (members.filter((x) => x.email === member.email).length !== 0) {
    message = { email: "이미 사용중인 이메일입니다." };
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
