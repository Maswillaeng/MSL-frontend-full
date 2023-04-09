import { useLocation } from "react-router-dom";
import SignUp from "./SignUp";

const Edit = () => {
  const location = useLocation();
  const introduction = location.state.currentUser.introduction;
  const userImage = location.state.currentUser.userImage;
  const userId = location.state.currentUser.userId;
  return <SignUp introduction={introduction} userImage={userImage} userId={userId}/>;
};

export default Edit;
