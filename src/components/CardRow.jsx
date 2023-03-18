import Card from "./Card";
import styled from "styled-components";

const CardRowBox = styled.div.attrs({
  className: "row mt-3 mb-5 ",
})``;

const CardRow = ({ cardList }) => {
  return (
    <CardRowBox>
      {cardList.map((data, i) => (
        <Card data={data} key={data.createAt + i} />
      ))}
    </CardRowBox>
  );
};

export default CardRow;
