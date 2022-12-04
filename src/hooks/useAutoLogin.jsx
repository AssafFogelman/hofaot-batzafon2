import axios from "axios";
import jwt_decode from "jwt-decode";
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
        console.log("no tokenData was entered");
        return false;
      }

      let { data } = await axios.get("/users/userInfo");

      dispatch(authActions.saveUserInfo(data));
      dispatch(authActions.login(tokenData));
      console.log("auto login was successful!");
      return true;
    } catch (error) {
      console.log("there was a problem with the auto-login", error);
      return false;
    }
  };
  return autoLogin;
};

export default useAutoLogin;
