import Loading from "./Loading";

const PageLoading = () => {
  return (
    <div
      style={{ height: "100vh", width: "100vw" }}
      className={
        "d-flex justify-content-center align-items-center position-absolute "
      }
    >
      <Loading /> <span className="ms-5 fs-3">로딩중입니다...</span>
    </div>
  );
};

export default PageLoading;
