import Card from "./Card";
import styled from "styled-components";

const CardRowBox = styled.div.attrs({
  className: "row mt-3 mb-5 h-100",
})`
`;

const CardRow = ({ cardList }) => {
  return (
    <CardRowBox>
      {cardList.map((x) => (
        <Card data={x} key={x.post_id} />
      ))}
    </CardRowBox>
  );
};

export default CardRow;
