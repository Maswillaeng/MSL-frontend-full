import styled from "styled-components";
import Button from "./Button";

const Box = styled.div.attrs({
  className:
    "card border shadow position-fixed d-flex justify-content-center align-items-center",
})`
  height: ${(props) => (props.userData ? "10vh" : "15vh")};
  width: 16vh;
  right: 5vw;
  top: ${(props) => (props.userData ? "80vh" : "75vh")};
`;

const SupportBox = ({ moveEdit, moveDelete, userData, editUser }) => {
  return (
    <Box userData={userData}>
      {userData ? (
        <Button buttonEvent={editUser} message={"내 정보 수정"} />
      ) : (
        <>
          <Button buttonEvent={moveEdit} message={"글 수정하기"} />
          <Button buttonEvent={moveDelete} message={"글 삭제하기"} />
        </>
      )}
    </Box>
  );
};

export default SupportBox;
