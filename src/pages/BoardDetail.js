import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRight, faArrowLeft, faCircle as faCircleS, faThumbsUp as faThumbsUpS, faThumbsDown as faThumbsDownS} from '@fortawesome/free-solid-svg-icons';
import {faCircle as faCircleR, faThumbsUp as faThumbsUpR, faBell, faThumbsDown as faThumbsDownR} from '@fortawesome/free-regular-svg-icons';
import React, {useEffect, useState} from 'react';
import Comment from '../components/Comment';
import Button from '../components/Button';
import {useNavigate,useLocation} from 'react-router-dom';
import members from '../dummy/members';
import ProfileIcon from '../components/ProfileIcon';

export default function BoardDetail() {
    const location = useLocation()
    const [login, setLogin] = useState(true)
    useEffect(()=>{
        //네비타고 들어왔을때 페이지 최상단으로 셋팅되도록 해줘야함
    },[])
    return <div
        className='container rounded d-flex flex-column justify-content-start align-items-center my-5 p-5'
        style={{
            maxWidth: '60vw'
        }}>
        <div className='w-100 mb-5'>
            <TopImgBox data={location.state.data}/>
            <TopProfileBox data={location.state.data}/>
            <TopContentBox data={location.state.data}/>
        </div>
        <BottomCommentBox login={login}/>
    </div>
}

const TopImgBox = ({data}) => {
    //이미지 개수만큼 생성할 state만들어야할듯
    const circleArr = Array(data.imgSrc.length).fill(1)
    const [currentImg, setCurrentImg] = useState(0)
    const upCurrentImg = ()=>{
        if(currentImg<data.imgSrc.length-1){
            setCurrentImg(currentImg+1)
        }
    }
    const downCurrentImg = ()=>{
        if(currentImg>0){
        setCurrentImg(currentImg-1)
        }
    }
    return <div
        className='w-100 d-flex justify-content-center align-items-center flex-column'>
        <div className='d-flex justify-content-center align-items-center'>
            <div style={{minWidth:'70px',}}>
            {currentImg!==0 &&<FontAwesomeIcon
                icon={faArrowLeft}
                onClick={downCurrentImg}
                className='mx-3 '
                style={{
                    height: '40px',
                    cursor:'pointer'
                }}/>} 
            </div>
            <div>
            <img
                className='img-thumbnail'
                style={{
                    minHeight:'350px',
                    maxHeight:'350px',
                    minWidth: '500px',
                    maxWidth: '500px',
                }}
                src={data.imgSrc[currentImg]}
                alt="1"/>
            </div>
            <div style={{minWidth:'70px',}}>
            {currentImg<data.imgSrc.length-1 &&<FontAwesomeIcon
                icon={faArrowRight}
                onClick={upCurrentImg}
                className='mx-3 '
                style={{
                    height: '40px',
                    cursor:'pointer'
                }}/>} 
            </div>            
        </div>
        <div>
            {
                circleArr.map(
                    (x, i) => currentImg === i
                        ? <FontAwesomeIcon icon={faCircleS} className='mx-2 mt-2' key={i}/>
                        : <FontAwesomeIcon icon={faCircleR} className='mx-2 mt-2' key={i}/>
                )
            }
        </div>
    </div>
}

const TopProfileBox = ({data}) => {
    const [like,setLike]=useState(false)
    const likeHandler =()=>{
        setLike(!like)
    }
    const [subscribe,setSubscribe]=useState(false)
    const subscribeHandler =()=>{
        setSubscribe(!subscribe)
    }
    const userImgae = members.filter(x=>x.nickname===data.nickname)[0].userImage
    const userSubscribe = members.filter(x=>x.nickname===data.nickname)[0].subscribeCount
    return <div className='w-100 d-flex justify-content-center align-items-center'>
        <div className=' mt-5 '>
            <img
                className='rounded-circle'
                style={{
                    height: '70px'
                }}
                src={userImgae}
                alt="detailThumbnail"/>
        </div>
        <div className='ms-2 mt-5 me-5'>
            <div >
                {data.nickname}
            </div>
            <div className='d-flex justify-content-center align-items-center'>
                구독자 {userSubscribe}명
            </div>
        </div>
        <div
            className='mx-5 mt-5 d-flex justify-content-start align-items-start flex-column'>
            <div className='mb-4' onClick={likeHandler}>
                <ProfileIcon message={'좋아요'} type={like} addStyle={like ? 'bg-primary border-primary' : 'border-primary'}/>
            </div>
            <div onClick={subscribeHandler}>
                <ProfileIcon message={'구독하기'} type={subscribe} addStyle={subscribe ? 'bg-danger border-danger ms-1' : 'border-danger ms-1'}/>
            </div>
        </div>
    </div>
}

const TopContentBox = ({data}) => {
    return <div
        className='d-flex flex-column justify-content-center align-items-center my-5'>
        <div className='w-50'>
            <h1>{data.title}
            </h1>
        </div>
        <div
            className='w-50 mb-4 d-flex flex-column justify-content-end align-items-end'>
            {data.createAt}
        </div>
        <div className='w-50'>
            {data.content}
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
