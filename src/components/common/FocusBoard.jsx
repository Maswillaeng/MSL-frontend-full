import styled from "styled-components";
import BoardDetail from "../../pages/BoardDetail";

const Box = styled.div.attrs({
  className:
    "position-absolute bg-white card shadow d-flex justify-content-start align-items-center flex-column p-2",
})`
  width: 30vw;
  height: 70vh;
  z-index: 2;
  overflow-y: auto;
  overflow-x: hidden;
`;

const FocusBoard = ({ postId }) => {
  return (
    <Box>
      <BoardDetail postId={postId} />
    </Box>
  );
};

export default FocusBoard;
