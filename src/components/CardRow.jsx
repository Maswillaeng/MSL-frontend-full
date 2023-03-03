import Card from "./Card";
import styled from "styled-components";
const CardRow = ({ cardList }) => {
  const CardRowBox = styled.div.attrs({
    className: "row g-5 mt-3 mb-5",
  })`
    min-height: 450px;
    max-height: 450px;
  `;
  return (
    <CardRowBox>
      {cardList.map((x) => (
        <Card data={x} key={x.post_id} />
      ))}
    </CardRowBox>
  );
};

export default CardRow;
