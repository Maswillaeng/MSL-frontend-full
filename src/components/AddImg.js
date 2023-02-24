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

const AddImg = () => {
    return <div
        className='flex-grow-1 d-flex justify-content-center align-items-center card m-3'
        style={{
            minHeight: '200px',
            cursor:'pointer'
        }}>
        <div className='p-1 w-100 d-flex justify-content-center align-items-center'>
            <FontAwesomeIcon
                icon={faPlus}
                style={{
                    height: '50px',
                }}/>
        </div>
    </div>
}

export default AddImg