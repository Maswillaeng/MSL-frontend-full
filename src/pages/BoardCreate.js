import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faArrowRight,
    faArrowLeft,
    faCircle as faCircleS,
    faThumbsUp as faThumbsUpS,
    faThumbsDown as faThumbsDownS,
    faPlus
} from '@fortawesome/free-solid-svg-icons';
import {faCircle as faCircleR, faThumbsUp as faThumbsUpR, faBell, faThumbsDown as faThumbsDownR} from '@fortawesome/free-regular-svg-icons';
import AddImg from '../components/AddImg';

const BoardCreate = () => {
    return <div
        className='container rounded d-flex flex-column justify-content-start align-items-center my-5 p-5 '
        style={{
            maxWidth: '70vw',
            minHeight: '100vh'
        }}>
        <TopImgBox/>
        <TopAddImg/>
        <BottomContentBox/>
    </div>
}

const TopImgBox = () => {
    return <div
        className='w-100 d-flex justify-content-center align-items-center flex-column'>
        <div className='w-100 d-flex justify-content-center align-items-center mb-3'>
            <FontAwesomeIcon
                icon={faArrowLeft}
                className='mx-3 '
                style={{
                    height: '40px',
                    cursor: 'pointer'
                }}/>
            <div
                className='w-25 d-flex justify-content-center align-items-center card shadow fs-5 mx-3'
                style={{
                    minHeight: '250px'
                }}>
                대표 이미지를 등록해주세요.
            </div>
            <FontAwesomeIcon
                icon={faArrowRight}
                className='mx-3'
                style={{
                    height: '40px',
                    cursor: 'pointer'
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

const TopAddImg = () => {
    const imgBox = Array(5)
        .fill(1)
        .map((x, i) => x = x + i)
    return <div className='w-100 d-flex justify-content-center align-items-center my-5'>
        {imgBox.map(x => <AddImg key={x}/>)}
    </div>
}

const BottomContentBox = () =>{
    return <div
    className='w-100 d-flex justify-content-center align-items-center flex-column my-5'>
    <div className='w-50 d-flex justify-content-center align-items-center my-5'>
        <div 
        className='me-5'
        style={{
                flex: '0.7'
            }}>
            <div>
                <input
                    type="email"
                    class="form-control"
                    name='title'
                    id="title"
                    placeholder="제목을 적어주세요."/>
            </div>
        </div>
        <div style={{
                flex: '0.3'
            }}>
            <select class="form-select">
                <option selected="selected">카테고리</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
        </div>
    </div>
    <div className=' mb-5 w-50'>
        <div >
            <textarea
                placeholder='레시피에 대한 설명을 적어주세요.'
                class="form-control"
                style={{
                    resize: 'none'
                }}
                id="content"
                rows="8"></textarea>
        </div>
    </div>
</div>
}

export default BoardCreate