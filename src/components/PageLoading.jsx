import Loading from "./Loading";
import styled from "styled-components";
const LoadingBox = styled.div.attrs({
  className:
    "d-flex justify-content-center align-items-center position-absolute ",
})`
  height: 100vh;
  width: 100vw;
`;
const PageLoading = () => {
  return (
    <LoadingBox>
      <Loading /> <span className="ms-5 fs-3">로딩중입니다...</span>
    </LoadingBox>
  );
};

export default PageLoading;
