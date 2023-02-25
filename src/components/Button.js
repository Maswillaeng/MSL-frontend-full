const Button = ({size, buttonEvent, message,addStyle=''}) => {
    return <div className={`d-flex justify-content-center my-3`}>
        <button onClick={buttonEvent} className={`btn btn-secondary btn-${size} ${addStyle}`}>{message}</button>
    </div>
}
export default Button;