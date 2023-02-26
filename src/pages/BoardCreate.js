import React, { useState } from 'react';
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
    const [imgData,setImgData]=useState([])
    const addImgData = (src)=>{
        setImgData([...imgData,src])
    }
    const [imgNum,setImgNum] = useState(0)
    
    return <div
        className='container rounded d-flex flex-column justify-content-start align-items-center my-5 p-5 '
        style={{
            maxWidth: '70vw',
            minHeight: '100vh'
        }}>
        <TopImgBox imgData={imgData} imgNum={imgNum} setImgNum={setImgNum}/>
        <TopAddImg addImgData={addImgData}/>
        <BottomContentBox/>
    </div>
}

const TopImgBox = ({imgData, imgNum, setImgNum}) => {
    const imgCountArr = Array(imgData.length)
        .fill(1)
        .map((x, i) => x = x + i)
    const upImgNum = () => {
        setImgNum(imgNum + 1)
    }
    const downImgNum = () => {
        setImgNum(imgNum - 1)
    }
    return <div
        className='w-100 d-flex justify-content-center align-items-center flex-column'>
        <div className='w-100 d-flex justify-content-center align-items-center mb-3'>
            <div
                style={{
                    maxWidth: '70px',
                    minWidth: '70px'
                }}>
                {
                    imgNum > 0 &&< FontAwesomeIcon
                    onClick = {
                        downImgNum
                    }
                    icon = {
                        faArrowLeft
                    }
                    className = 'mx-3 '
                    style = {{
                    height: '40px',
                    cursor: 'pointer'
                }}/> }
            </div>
            <div
                className='w-25 d-flex justify-content-center align-items-center card shadow fs-5 mx-3'
                style={{
                    minHeight: '280px'
                }}>
                {
                    imgData.length === 0
                        ? '이미지를 등록해주세요.'
                        : <img
                                className=''
                                style={{
                                    maxHeight: '270px',
                                    minHeight: '270px',
                                    minWidth: '300px',
                                    maxWidth: '300px'
                                }}
                                src={imgData[imgNum]}
                                alt=""/>
                }
            </div>
            <div
                style={{
                    maxWidth: '70px',
                    minWidth: '70px'
                }}>
                {
                    imgData.length > 1 && imgNum < imgData.length - 1 && <FontAwesomeIcon
                    onClick = {
                        upImgNum
                    }
                    icon = {
                        faArrowRight
                    }
                    className = 'mx-3'
                    style = {{
                    height: '40px',
                    cursor: 'pointer'
                }}/>}
            </div>
        </div>
        <div
            style={{
                minHeight: '20px',
                maxHeight: '20px'
            }}>
            {
                imgCountArr.map(
                    (x, i) => i === imgNum
                        ? <FontAwesomeIcon icon = {
                            faCircleS
                        }
                        className = 'mx-2 mt-2' />
                        : <FontAwesomeIcon icon = {
                            faCircleR
                        }
                        className = 'mx-2 mt-2' />
                )
            }
        </div>
    </div>
}

const TopAddImg = ({addImgData}) => {
    const imgBox = Array(5)
        .fill(1)
        .map((x, i) => x = x + i)
    return <div className='w-100 d-flex justify-content-center align-items-center my-5'>
        {imgBox.map(x => <AddImg key={x} addImgData={addImgData}/>)}
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
                    className="form-control"
                    name='title'
                    id="title"
                    placeholder="제목을 적어주세요."/>
            </div>
        </div>
        <div style={{
                flex: '0.3'
            }}>
            <select className="form-select">
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
                className="form-control"
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