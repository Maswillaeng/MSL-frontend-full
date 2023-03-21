import styled from "styled-components";

const SkeletonUiBox = styled.div.attrs({
  className: "border bg-light d-flex flex-column align-items-center shadow",
})`
  min-height: 370px;
`;

const TitleBox = styled.div.attrs({
  className: "mt-2 mb-5 mx-2 border ",
})`
  width: 260px;
  height: 170px;
`;

const SkeletonUi = () => {
  return (
    <div className="col-lg-3 col-md-6 col-sm-12 d-flex justify-content-center mb-3 py-3">
      <SkeletonUiBox>
        <TitleBox></TitleBox>
      </SkeletonUiBox>
    </div>
  );
};

export default SkeletonUi;
