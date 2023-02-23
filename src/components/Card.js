const Card = ()=>{
    const imgSrc = 'https://blog.kakaocdn.net/dn/bpgcLh/btqDpgZy521/qnY4WLpC8YSEiG1UWavVk0/img.jpg'
    return<div className="col-3">
   <div className="p-3 border bg-light d-flex flex-column align-items-center shadow" style={{minHeight:'300px',maxHeight:"300px"}}>
      <div className='mb-4'>
            <img className='img-fluid' src={imgSrc} alt=""/>
        </div>
        <div  style={{overflow:'hidden'}}>
        맛있는 칵테일!!!!ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
        </div>
      </div>
  </div>
}

export default Card