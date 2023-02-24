const Button = ({size, buttonEvent, message}) => {
    return <div className="d-flex justify-content-center my-3">
        <button onClick={buttonEvent} className={`btn btn-secondary btn-${size}`}>{message}</button>
    </div>
}
export default Button;