const Button =({size,buttonEvent})=>{
    return <div className="d-flex justify-content-center my-3">
        <button onClick={buttonEvent} className={`btn btn-secondary btn-${size}`}>확인</button>
    </div>
}
export default Button;