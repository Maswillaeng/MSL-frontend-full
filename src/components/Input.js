const Input = ({setMember, data, member, targetRefs, idx}) => {
    //인풋값 셋팅
    const inputChange = (e) => {
        setMember({
            ...member,
            [e.target.name]: e.target.value
        })
    }
    return <div className="d-flex p-2 my-3 ">
        <label
            className="pt-2"
            htmlFor={data}
            style={{
                minWidth: '100px'
            }}>
            {
                data === 'email'
                    ? '이메일'
                    : data === 'password'
                        ? '비밀번호'
                        : data === 'pwc'
                            ? '비밀번호확인'
                            : data === 'nickname'
                                ? '닉네임'
                                : data === 'phoneNumber'
                                    ? '전화번호'
                                    : data === 'userImage'
                                        ? '이미지'
                                        : data === 'introduction' && '자기소개'

            }
        </label>
        <input
            type={data === 'email'
                ? 'email'
                : data === 'password' || data === 'pwc'
                    ? 'password'
                    : 'text'}
            ref={(el) => (targetRefs.current[idx] = el)}
            placeholder={data === 'email'
                ? '이메일을 적어주세요.'
                : data === 'password' || data === 'pwc'
                    ? '비밀번호를 적어주세요.'
                    : data === 'nickname'
                        ? '닉네임을 적어주세요.'
                        : data === 'phoneNumber'
                            ? '전화번호를 적어주세요.'
                            : data === 'userImage'
                                ? '이미지를 등록해주세요.'
                                : data === 'introduction' && '자기소개를 등록해주세요.'
}
            name={data}
            onChange={(e) => inputChange(e)}
            className='ms-5 rounded form-control'/>
    </div>
}

export default Input