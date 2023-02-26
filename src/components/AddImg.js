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
import {useRef, useState} from 'react';

const AddImg = ({addImgData}) => {
    const [imgFile, setImgFile] = useState("");
    const target = useRef(null)
    const uploadClick = () => {
        target
            .current
            .click();
    }
    const saveImgFile = () => {
        const file = target
            .current
            .files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImgFile(reader.result);
            addImgData(reader.result);
        };
    };
    return <div
        onClick={uploadClick}
        className='flex-grow-1 d-flex justify-content-center align-items-center card m-3 w-100'
        style={{
            maxHeight:'210px',
            minHeight:'210px',
            minWidth:'210px',
            maxWidth:'210px',
            cursor: 'pointer'
        }}>
        {imgFile&& 
        <img 
        className=''
        style={{
            maxHeight:'190px',
            minHeight:'190px',
            minWidth:'190px',
            maxWidth:'190px',
        }}
        src={imgFile} alt=""/>}
        <input
            ref={target}
            type="file"
            accept="image/*"
            style={{
                display: 'none'
            }}
            onChange={saveImgFile}/>
        <div className='p-1 w-100 d-flex justify-content-center align-items-center'>
            {
                !imgFile &&< FontAwesomeIcon
                icon = {
                    faPlus
                }
                style = {{
                    height: '50px'
                }}/>}
        </div>
    </div>
}

export default AddImg