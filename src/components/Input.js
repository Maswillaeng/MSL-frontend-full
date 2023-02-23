const Input =({setMember,data,member,targetRefs,idx}) =>{
    //인풋값 셋팅
    const inputChange = (e)=>{
        setMember({...member,[e.target.name]:e.target.value})
    }
    return <div className="d-flex p-2 my-3 ">
             <label 
              htmlFor={data}
              style={{minWidth:'100px'}}>
              {data=== 'id'? '아이디': data==='pw'? '비밀번호': data==='pwc'? '비밀번호확인':'이메일'}
              </label>
               <input type="text"
                ref={ (el) => (targetRefs.current[idx] = el) }
                placeholder={data=== 'id'? '아이디를 적어주세요.': data==='pw'? '비밀번호를 적어주세요.': data==='pwc'? '같은 비밀번호를 적어주세요.':'이메일을 적어주세요.'}
               name={data}
                onChange={(e)=>inputChange(e)}
                className='ms-5 rounded form-control'/>
    </div>
}

export default Input