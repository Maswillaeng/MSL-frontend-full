import styled from "styled-components";

const SkeletonUiBox = styled.div.attrs({
  className:
    "p-2 border bg-light d-flex flex-column align-items-center shadow pointer",
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
    <div className="col-3">
      <SkeletonUiBox>
        <TitleBox></TitleBox>
      </SkeletonUiBox>
    </div>
  );
};

export default SkeletonUi;
