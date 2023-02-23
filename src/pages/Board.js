import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Card from '../components/Card';
import { faSquareCaretLeft,faSquareCaretRight } from "@fortawesome/free-solid-svg-icons";
import dummyData from '../dummy/dummyData';

export default function Board() {
  return <div className='container  rounded d-flex flex-column justify-content-center align-items-center my-5'
  style={{maxWidth:'90vw',minHeight:'100vh'}}>
    <BoardTop/>
    <BoardMiddle/>
    <BoardBottom/>
  </div>
}

const BoardTop = ()=>{
 return <div className={` d-flex flex-column justify-content-flex w-100 mt-5`} >
      <h1 className='ps-5'>전체글보기</h1>
      
</div>
}
const BoardMiddle = ()=>{
  const cardList = Array(8).fill(1)
 return <div className={` d-flex flex-column justify-content-center align-items-center w-100 mt-5 flex-grow-1`} >
  <div className="container text-center">
  <div className="row g-5">
    {cardList.map((x,i)=><Card key={i}/>)}
  </div>
</div>
</div>
}
const BoardBottom = ()=>{
 return <div className={` d-flex justify-content-center align-items-center w-100 mt-5 mb-5 fs-3`} >
      <FontAwesomeIcon icon={faSquareCaretLeft} className='mx-5' style={{height:'30px'}}/>
      1
      <FontAwesomeIcon icon={faSquareCaretRight} className='mx-5' style={{height:'30px'}}/>
</div>
}