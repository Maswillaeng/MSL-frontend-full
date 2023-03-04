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

const MessageSpan = styled.span`
  color: ${(props) => (props.state ? "white" : "black")};
`;
const ProfileIcon = ({ message, state, addStyle }) => {
  return (
    <>
      <FontAwesomeIcon
        icon={
          message === "추천"
            ? state
              ? faThumbsUpS
              : faThumbsUpR
            : state
            ? faBellS
            : faBellR
        }
        className="me-1 profile-icon pointer"
      />
      <MessageSpan
        className={`border border-2  p-2 rounded ${addStyle} pointer`}
        state={state}
      >
        {message}
      </MessageSpan>
    </>
  );
};
export default ProfileIcon;
