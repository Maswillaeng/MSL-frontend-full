import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRight, faArrowLeft, faCircle as faCircleS, faThumbsUp as faThumbsUpS, faThumbsDown as faThumbsDownS} from '@fortawesome/free-solid-svg-icons';
import {faCircle as faCircleR, faThumbsUp as faThumbsUpR, faBell, faThumbsDown as faThumbsDownR} from '@fortawesome/free-regular-svg-icons';
import React, {useState} from 'react';
import Comment from '../components/Comment';
import Button from '../components/Button';
import {useNavigate} from 'react-router-dom';

export default function BoardDetail() {
    const [login, setLogin] = useState(true)
    return <div
        className='container rounded d-flex flex-column justify-content-start align-items-center my-5 p-5'
        style={{
            maxWidth: '60vw'
        }}>
        <div className='w-100 mb-5'>
            <TopImgBox/>
            <TopProfileBox/>
            <TopContentBox/>
        </div>
        <BottomCommentBox login={login}/>
    </div>
}

const TopImgBox = () => {
    const imgSrc = 'https://blog.kakaocdn.net/dn/bpgcLh/btqDpgZy521/qnY4WLpC8YSEiG1UWavVk0/img.jpg'
    //이미지 개수만큼 생성할 state만들어야할듯
    return <div
        className='w-100 d-flex justify-content-center align-items-center flex-column'>
        <div>
            <FontAwesomeIcon
                icon={faArrowLeft}
                className='mx-3 '
                style={{
                    height: '40px'
                }}/>
            <img
                className='rounded img-thumbnail'
                style={{
                    width: '500px'
                }}
                src={imgSrc}
                alt="1"/>
            <FontAwesomeIcon
                icon={faArrowRight}
                className='mx-3'
                style={{
                    height: '40px'
                }}/>
        </div>
        <div>
            <FontAwesomeIcon icon={faCircleS} className='mx-2 mt-2'/>
            <FontAwesomeIcon icon={faCircleR} className='mx-2 mt-2'/>
            <FontAwesomeIcon icon={faCircleR} className='mx-2 mt-2'/>
            <FontAwesomeIcon icon={faCircleR} className='mx-2 mt-2'/>
            <FontAwesomeIcon icon={faCircleR} className='mx-2 mt-2'/>
        </div>
    </div>
}

const TopProfileBox = () => {
    return <div className='w-100 d-flex justify-content-center align-items-center'>
        <div className=' mt-5 '>
            <img
                className='rounded-circle'
                style={{
                    height: '70px'
                }}
                src={'https://avatars.githubusercontent.com/u/117655658?v=4'}
                alt="1"/>
        </div>
        <div className='ms-2 mt-5 me-5'>
            <div >
                shdomi8599
            </div>
            <div className='d-flex justify-content-center align-items-center'>
                구독자 35명
            </div>
        </div>
        <div
            className='mx-5 mt-5 d-flex justify-content-start align-items-start flex-column'>
            <div className='mb-3'>
                <FontAwesomeIcon
                    style={{
                        height: '25px',
                        cursor: 'pointer',
                        marginBottom: '-5px'
                    }}
                    icon={faThumbsUpR}
                    className='me-2 '/>
                <span
                    style={{
                        color: 'white',
                        cursor: 'pointer'
                    }}
                    className='bg-primary p-2 rounded'>좋아요</span>
            </div>
            <div >
                <FontAwesomeIcon
                    style={{
                        height: '25px',
                        cursor: 'pointer',
                        marginBottom: '-5px'
                    }}
                    icon={faBell}
                    className='me-2'/>
                <span
                    style={{
                        color: 'white',
                        cursor: 'pointer'
                    }}
                    className='bg-danger p-2 rounded'>구독하기</span>
            </div>
        </div>
    </div>
}

const TopContentBox = () => {
    return <div
        className='d-flex flex-column justify-content-center align-items-center my-5'>
        <div className='w-50'>
            <h1>맛있는 칵테일레시피입니다
            </h1>
        </div>
        <div
            className='w-50 mb-4 d-flex flex-column justify-content-end align-items-end'>
            2023-02-24
        </div>
        <div className='w-50'>
            ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
        </div>
    </div>
}

const BottomCommentBox = ({login}) => {
    const navigate = useNavigate()
    //댓글 핸들러
    const [onComment, setOnComment] = useState(false)
    const onCommentHandeler = () => {
        setOnComment(!onComment)
    }
    //비회원일때 로그인창으로 이동
    const buttonEvent = () => {
        navigate('/login')
    }
    const [commentText, setCommentText] = useState('')
    const detectCommentText = (e) => {
        setCommentText(e.target.value)
    }
    return <> 
    < div className = 'w-50 d-flex flex-column justify-content-start align-items-center' > <div className='w-100 d-flex justify-content-start align-items-center mb-5'>
            댓글:4개
        </div>
        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>
    </div>
    <div
        className='w-50 d-flex justify-content-start align-items-center mb-5 shadow rounded p-4'>
        {
        login
            ? <> < div className = 'w-100 d-flex justify-content-center align-items-center flex-column' > <button
                    onClick={onCommentHandeler}
                    className="btn btn-primary mb-2 w-50"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseExample"
                    aria-expanded="false"
                    aria-controls="collapseExample">
                    {
                        onComment
                            ? '댓글 취소하기'
                            : '댓글 작성하기'
                    }
                </button>
                <div className="collapse mt-3 w-100" id="collapseExample">
                    <div className="mb-3 w-100">
                        <label htmlFor="comment" className="form-label ">
                            <img
                                className='rounded-circle'
                                style={{
                                    height: '30px'
                                }}
                                src={'https://avatars.githubusercontent.com/u/117655658?v=4'}
                                alt="1"/>
                            <span className='ms-1'>shdomi8599</span>
                        </label>
                        <textarea
                            value={commentText}
                            onChange={detectCommentText}
                            className="form-control"
                            id="comment"
                            rows="5"
                            style={{
                                resize: 'none'
                            }}></textarea>
                    </div>
                    <div className='w-100 d-flex justify-content-between align-items-center'>
                        <div>
                            {commentText.length}/300
                        </div>
                        <div>
                            <Button message={'등록'} size={'sm'}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
            : <> < div className = 'flex-grow-1' > 글을 작성하시려면 로그인 해주세요 </div>
      <div>
        <Button buttonEvent={buttonEvent} message={'로그인'}/>
           </div>
        </>
    } </div>
    </>
}
