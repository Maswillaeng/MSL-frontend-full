import Card from "./Card";

const CardRow = ({ cardList }) => {
  return (
    <div
      className="row g-5 mt-3 mb-5"
      style={{
        minHeight: "450px",
        maxHeight: "450px",
      }}
    >
      {cardList.map((x) => (
        <Card data={x} key={x.post_id} />
      ))}
    </div>
  );
};

export default CardRow;
