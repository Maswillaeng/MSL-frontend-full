const Button = ({ size, buttonEvent, message, addStyle = "" }) => {
  return (
    <div className={`d-flex justify-content-center my-3`}>
      <button
        type="button"
        onClick={buttonEvent}
        className={`btn btn-${size} ${addStyle}  text-light`}
        style={{backgroundColor:'#AA233C'}}

      >
        {message}
      </button>
    </div>
  );
};
export default Button;
