import styled from "styled-components";
import Button from "./Button";

const Box = styled.div.attrs({
  className:
    "card border shadow position-fixed d-flex justify-content-center align-items-center",
})`
  height: 15vh;
  width: 16vh;
  right: 5vw;
  top: 75vh;
`;

// const AbsoluteBox = styled.div.attrs({
//     className: "card border border-2 border-dark position-absolute",
// })`
//   height: 200px;
//   width: 200px;
// `;

const SupportBox = ({ moveEdit, moveDelete }) => {
  return (
    <Box>
      <Button buttonEvent={moveEdit} message={"글 수정하기"} />
      <Button buttonEvent={moveDelete} message={"글 삭제하기"} />
    </Box>
  );
};

export default SupportBox;
