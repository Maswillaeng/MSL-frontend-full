export const validationEmail = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

//8글자 이상 영문 1개 포함, 특문 1개 포함,숫자 1개라도 포함
export const validationPassword =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

//특수문자면 true가 나오는 정규식 
export const validationNickname = /[^a-zA-Z0-9ㄱ-힣]/g;

//앞자리 3글자 중간 4글자 맨뒤 4글자
export const validationPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/
