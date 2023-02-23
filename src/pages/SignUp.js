import React, { useRef, useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';

export default function SignUp() {
  const inputArr = ['id','pw','pwc','email']
  const [member,setMember]= useState({id:'',pw:'',pwc:'',email:''})
  const targetRefs = useRef([]);
  const buttonEvent = (e)=>{
    if(Object.values(member).filter(x=>x==='').length>0){
      e.preventDefault();
    }
    if(member.id===''){
      return targetRefs.current[0].focus()
    }
    if(member.pw===''){
      return targetRefs.current[1].focus()
    }
    if(member.pwc===''||member.pw!==member.pwc){
      return targetRefs.current[2].focus()
    }
    if(member.email===''){
      return targetRefs.current[3].focus()
    }
  }
  return <form className='container border border-info rounded d-flex flex-column justify-content-center align-items-center mt-5'
   style={{maxWidth:'500px',minHeight:'400px'}}   action='/'>
    {inputArr.map((data,idx)=><Input key={data} data={data} setMember={setMember} member={member} targetRefs={targetRefs} idx={idx} />)}
  <Button buttonEvent={buttonEvent} size={'lg'}/>
  </form>
}
