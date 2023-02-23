import React, { useState,useRef } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';

export default function Login() {
  const [user,setUser]=useState({id:'',pw:''})
  const userArr = ['id','pw']
  const targetRefs = useRef([]);
  const buttonEvent = (e)=>{
    if(Object.values(user).filter(x=>x==='').length>0){
      e.preventDefault();
    }
    if(user.id===''){
      return targetRefs.current[0].focus()
    }
    if(user.pw===''){
      return targetRefs.current[1].focus()
    }
  }
  return <form className='container border border-info rounded d-flex flex-column justify-content-center align-items-center mt-5'
  action='/'
  style={{maxWidth:'500px',minHeight:'200px'}}>
    {userArr.map((data,idx)=><Input key={data} data={data} setMember={setUser} member={user} targetRefs={targetRefs} idx={idx}/>)}
    <Button size={'lg'} buttonEvent={buttonEvent}/>
  </form>
}
