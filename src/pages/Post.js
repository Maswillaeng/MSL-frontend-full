import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquareXmark} from "@fortawesome/free-solid-svg-icons";

const Post = ({viewHandeler}) => {
    return <div
        className="container rounded d-flex flex-column justify-content-center align-items-center position-absolute top-25 h-75 shadow bg-light">
        <FontAwesomeIcon
            onClick={viewHandeler}
            className="position-absolute top-0 end-0 m-5"
            icon={faSquareXmark}
            style={{
                height: '60px',
                cursor: 'pointer'
            }}/>
    </div>
}

export default Post;