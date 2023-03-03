import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell as faBellS,
  faThumbsUp as faThumbsUpS,
} from "@fortawesome/free-solid-svg-icons";
import {
  faThumbsUp as faThumbsUpR,
  faBell as faBellR,
} from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";

const ProfileIcon = ({ message, type, addStyle }) => {
  const MessageSpan = styled.span.attrs({
    className: `border border-2  p-2 rounded ${addStyle} pointer`,
  })`
    color: ${(props) => (props.type ? "white" : "black")};
  `;
  return (
    <>
      <FontAwesomeIcon
        icon={
          message === "추천"
            ? type
              ? faThumbsUpS
              : faThumbsUpR
            : type
            ? faBellS
            : faBellR
        }
        className="me-1 profile-icon pointer"
      />
      <MessageSpan type={type}>{message}</MessageSpan>
    </>
  );
};
export default ProfileIcon;
