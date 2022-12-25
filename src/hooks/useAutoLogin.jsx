import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "store/auth";

const useAutoLogin = () => {
  const dispatch = useDispatch();
  const autoLogin = async (tokenData) => {
    // the function receives a token, sends an axios GET request to verify that the user exists.
    //if there is no token, then it returns false.
    // if he isn't registered, it returns false.
    //it dispatches the userData.
    // and it dispatches the tokenData.
    try {
      if (!tokenData) {
        //no tokenData was entered
        return false;
      }

      let { data } = await axios.get("/users/userInfo");

      dispatch(authActions.saveUserInfo(data));
      dispatch(authActions.login(tokenData));
      return true;
    } catch (error) {
      return false;
    }
  };
  return autoLogin;
};

export default useAutoLogin;
