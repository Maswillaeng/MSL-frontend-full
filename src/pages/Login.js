import axios from 'axios';
import React, {useState, useRef, useEffect} from 'react';
import Button from '../components/Button';
import Input from '../components/Input';

export default function Login() {
    const [user, setUser] = useState({email: '', password: ''})
    const userArr = ['email', 'password']
    const targetRefs = useRef([]);
    //유효성검사
    const buttonEvent = (e) => {
        if (Object.values(user).filter(x => x === '').length > 0) {
            e.preventDefault();
        }
        if (user.email === '') {
            return targetRefs
                .current[0]
                .focus()
        }
        if (user.password === '') {
            return targetRefs
                .current[1]
                .focus()
        }
        axios
            .post('http://localhost:8080/api/sign', 'member', {
                headers: {
                    "Content-Type": `application/json`
                }
            })
            .then((res) => {
                console.log(res);
            })
        setFormCheck(true)
    }
    //폼 제출 체크용
    const [formCheck, setFormCheck] = useState(false)
    //제출되면 다시 false로
    useEffect(() => {
        setFormCheck(false)
    }, [formCheck])
    return <form
        className='container border border-info rounded d-flex flex-column justify-content-center align-items-center mt-5'
        action='/'
        style={{
            maxWidth: '500px',
            minHeight: '200px'
        }}>
        {
            userArr.map((data, idx) =>< Input key = {
                data
            }
            data = {
                data
            }
            setMember = {
                setUser
            }
            member = {
                user
            }
            targetRefs = {
                targetRefs
            }
            idx = {
                idx
            } />)
        }
        <Button size={'lg'} buttonEvent={buttonEvent} message={'로그인'}/>
        <div className='d-flex justify-content-center align-items-center w-100'>
            <div className='mx-5'>
                <a className='nav-link' href="/signUp">회원가입</a>
            </div>
            <div className='my-3'>
                <span style={{
                        cursor: 'pointer'
                    }}>이메일
                </span>
                /
                <span style={{
                        cursor: 'pointer'
                    }}>
                    비밀번호 찾기</span>
            </div>
        </div>
    </form>
}
