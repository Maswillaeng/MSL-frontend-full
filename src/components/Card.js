import {useNavigate} from "react-router-dom"

const Card = ({data}) => {
    console.log(data)
    const navigate = useNavigate()
    const detail = () => {
        navigate(`/boardDetail/${data}`)
    }
    const imgSrc = 'https://blog.kakaocdn.net/dn/bpgcLh/btqDpgZy521/qnY4WLpC8YSEiG1UWavVk0/img.jpg'
    return <div className="col-3">
        <div
            className="p-2 border bg-light d-flex flex-column align-items-center shadow"
            onClick={detail}
            style={{
                minHeight: '400px',
                maxHeight: "400px",
                cursor: 'pointer'
            }}>
            <div className='mb-5'>
                <img className='img-fluid' src={imgSrc} alt="1"/>
            </div>
            <div
                className='mt-4'
                style={{
                    overflow: 'hidden'
                }}>
                맛있는 칵테일레시피입니다 오렌지로 만드는 칵테일 레시피!!
            </div>
        </div>
    </div>
}

export default Card