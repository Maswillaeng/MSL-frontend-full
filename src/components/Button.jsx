const Button = ({ size, buttonEvent, message, addStyle = "" }) => {
  return (
    <div className={`d-flex justify-content-center my-2`}>
      <button
        type="submit"
        onClick={buttonEvent}
        className={`btn btn-${size} ${addStyle}  text-light`}
        id="btn-bg-color"
      >
        {message}
      </button>
    </div>
  );
};
export default Button;
