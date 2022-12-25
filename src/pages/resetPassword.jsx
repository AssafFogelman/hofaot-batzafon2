import { useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import validate from "validation/validate";
import resetPasswordSchema from "validation/resetPassword.validation";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { authActions } from "store/auth";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [samePassword, setSamePassword] = useState(false);
  const [invalidToken, setInvalidToken] = useState(false);
  const [success, setSuccess] = useState(false);
  const history = useHistory();
  const { token } = useParams();
  const dispatch = useDispatch();

  const handlePasswordChange = (ev) => {
    setPassword(ev.target.value);
  };

  const clearErrorMessages = (ev) => {
    setSamePassword(false);
    setPasswordError(false);
    setInvalidToken(false);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    // joi validaton
    const { error, value: validatedValue } = validate(
      { password },
      resetPasswordSchema
    );
    if (error) {
      setPasswordError(true);
      return;
    }

    axios
      //we send the token so that the "new password setting" route in the server will be secured.
      .post("/users/resetpassword/" + token, validatedValue)
      .then(({ data }) => {
        setSuccess(true);
        console.log("login was successful!", data);

        //storing the token to the local storage
        localStorage.setItem("token", data.token);

        // sending the content of the token to a redux variable
        let tokenData = jwt_decode(data.token);

        //storing basic user token data in redux
        dispatch(authActions.login(tokenData));

        //retreiving expanded user data
        axios
          .get("/users/userInfo")
          .then((response) => {
            //storing expanded user data in redux
            dispatch(authActions.saveUserInfo(response.data));
          })
          .catch((error) => {
            toast.error(
              `an error occured when retrieving user info from the server: ${error.response.data}`,
              {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              }
            );
          });

        console.log(data);

        setTimeout(() => {
          if (tokenData.biz) {
            history.push("/myshows");
          } else {
            history.push("/allshows");
          }
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) setInvalidToken(true);
        if (err.response.data.error.errorCode === 409) setSamePassword(true);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          New password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputEmail1"
          onChange={handlePasswordChange}
          onFocus={clearErrorMessages}
          value={password}
        />
      </div>
      {passwordError ? (
        <p style={{ color: "red" }}>
          password must contain at least one lowercase letter, one uppercase
          letter, one digit, and minimum 8 characters. It allows special
          characters
        </p>
      ) : (
        ""
      )}
      {samePassword ? (
        <p style={{ color: "red" }}>
          this is the password you already have! pick a new one
        </p>
      ) : (
        ""
      )}
      {invalidToken ? (
        <p style={{ color: "red" }}>
          the token is probably outdated. try again
        </p>
      ) : (
        ""
      )}
      {success ? (
        <p style={{ color: "DarkGreen" }}>
          The password has been changed successfully. You are being redirected
          to the main page
        </p>
      ) : (
        ""
      )}
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};
export default ResetPassword;
