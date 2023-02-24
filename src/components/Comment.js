import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRight, faArrowLeft, faCircle as faCircleS, faThumbsUp as faThumbsUpS, faThumbsDown as faThumbsDownS} from '@fortawesome/free-solid-svg-icons';
import {faCircle as faCircleR, faThumbsUp as faThumbsUpR, faBell, faThumbsDown as faThumbsDownR} from '@fortawesome/free-regular-svg-icons';

const Comment = () => {
    return <div
        className='w-100 d-flex justify-content-center align-items-center flex-column'>
        <div
            className='w-75 d-flex justify-content-start align-items-center'
            style={{
                marginLeft: '-50px',
                marginBottom: '-35px'
            }}>
            <div>
                <img
                    className='rounded-circle'
                    style={{
                        height: '50px'
                    }}
                    src={'https://avatars.githubusercontent.com/u/117655658?v=4'}
                    alt="1"/>
            </div>
            <div className='ms-2 me-5 w-100 '>
                <div>
                    닉넴
                </div>
                <div>
                    2023-02-24
                </div>
            </div>
            <div
                className='w-75 d-flex justify-content-start align-items-start ms-5 flex-column'
                style={{
                    marginRight: '-150px'
                }}>
                <div className='mb-2'>
                    <FontAwesomeIcon
                        style={{
                            height: '25px',
                            cursor: 'pointer',
                            marginBottom: '-5px'
                        }}
                        icon={faThumbsUpR}
                        className='me-2 '/>
                    125
                </div>
                <div>
                    <FontAwesomeIcon
                        style={{
                            height: '25px',
                            cursor: 'pointer',
                            marginBottom: '-5px'
                        }}
                        icon={faThumbsDownR}
                        className='me-2 '/>
                    12
                </div>
            </div>
        </div>
        <div className='w-100 d-flex justify-content-start align-items-center p-5'>
            이거 진짜 맛있어 보이네요.
        </div>
    </div>
}

export default Comment