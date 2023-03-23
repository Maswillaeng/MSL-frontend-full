import styled from "styled-components";

const PageBox = styled.div.attrs({
  className: "border border-2 border-light mx-2 pointer",
})`
  width: 20px;
  height: 20px;
  background-color: ${(props) =>
    props.currentCircle === props.idx ? "white" : ""};
  border-radius: 50%;
`;

const Circle = ({ currentCircle, idx, goRight }) => {
  return <PageBox onClick={goRight} currentCircle={currentCircle} idx={idx} />;
};

export default Circle;
