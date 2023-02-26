import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faArrowRight,
    faArrowLeft,
    faCircle as faCircleS,
    faBell as faBellS,
    faThumbsUp as faThumbsUpS,
    faThumbsDown as faThumbsDownS
} from '@fortawesome/free-solid-svg-icons';
import {faCircle as faCircleR, faThumbsUp as faThumbsUpR, faBell as faBellR, faThumbsDown as faThumbsDownR} from '@fortawesome/free-regular-svg-icons';

const ProfileIcon = ({message, type, addStyle}) => {
    return <> < FontAwesomeIcon
    style = {{
                        height: '25px',
                        cursor: 'pointer',
                        marginBottom: '-5px'
                    }}
    icon = {
        message === '좋아요'
            ? type
                ? faThumbsUpS
                : faThumbsUpR
            : type
                ? faBellS
                : faBellR
    }
    className = 'me-1 '/> <span
        style={{
            color: type
                ? 'white'
                : 'black',
            cursor: 'pointer'
        }}
        className={`border border-2  p-2 rounded ${addStyle}`}>{message}</span>
</>
}
export default ProfileIcon;