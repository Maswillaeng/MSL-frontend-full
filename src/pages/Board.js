import React from 'react';

export default function Board() {
  return <div className='container border border-dark rounded d-flex flex-column justify-content-center align-items-center my-5'
  style={{maxWidth:'90vw',minHeight:'100vh'}}>
    <BoardTop/>
    <BoardMiddle/>
    <BoardBottom/>
  </div>
}

const BoardTop = ()=>{
 return <div className={`border border-dark d-flex flex-column justify-content-flex w-100 mt-5`} >
      <h1 className='ps-5'>전체글보기</h1>
</div>
}
const BoardMiddle = ()=>{
 return <div className={`border border-dark d-flex flex-column justify-content-center align-items-center w-100 mt-5 flex-grow-1`} >
      중단
</div>
}
const BoardBottom = ()=>{
 return <div className={`border border-dark d-flex flex-column justify-content-center align-items-center w-100 mt-5 mb-5`} >
     하단
</div>
}