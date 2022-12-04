import axios from "axios";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { authActions } from "store/auth";
import loginSchema from "validation/login.validation";
import validate from "validation/validate";

const initialLoginInputs = {
  email: "",
  password: "",
};

const Login = () => {
  const [loginInputs, setLoginInputs] = useState(initialLoginInputs);
  const [inputError, setInputError] = useState({
    email: false,
    password: false,
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const handleInputChange = (event) => {
    let copyOfLoginInputs = JSON.parse(JSON.stringify(loginInputs));
    copyOfLoginInputs[event.target.id] = event.target.value;
    setLoginInputs(copyOfLoginInputs);
  };

  const removeErrorAlerts = (event) => {
    let copyOfInputError = JSON.parse(JSON.stringify(inputError));
    copyOfInputError[event.target.id] = false;
    setInputError(copyOfInputError);
  };

  const handleFormSumbit = (event) => {
    event.preventDefault();

    const { error } = validate(loginInputs, loginSchema);
    if (error) {
      setInputError((current) => {
        let copyOfInputError = JSON.parse(JSON.stringify(current));
        for (let field of error.details) {
          /* "field" is either "email" of "password". the word comes from the Joi error object */
          copyOfInputError[field.path[0]] = true;
        }
        return copyOfInputError;
      });
      return;
    }

    axios
      .post("/users/login", loginInputs)
      .then((response) => {
        console.log("login was successful!", response);
        localStorage.setItem("token", response.data.token);

        /* sending the content of the token to a redux variable */
        let tokenData = jwt_decode(response.data.token);
        dispatch(authActions.login(tokenData));

        axios
          .get("/users/userInfo")
          .then((response) => {
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
        if (tokenData.biz) {
          history.push("/myshows");
        } else {
          history.push("/allshows");
        }
      })
      .catch((error) => {
        toast.error(
          `an error occured when sending data to the server: ${error.response.data}`,
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
  };

  return (
    <Fragment>
      <h1>אנא התחבר</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            value={loginInputs.email}
            onChange={handleInputChange}
            onFocus={removeErrorAlerts}
          />
          {inputError.email ? (
            <p style={{ color: "red" }}>not a valid email</p>
          ) : (
            ""
          )}
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={loginInputs.password}
            onChange={handleInputChange}
            onFocus={removeErrorAlerts}
          />
          {inputError.password ? (
            <p style={{ color: "red" }}>
              password must contain at least one lowercase letter, one uppercase
              letter, at least one digit, and minimum 8 characters
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="mb-3">
          <p>
            not registered? <Link to="/register">register here</Link>
          </p>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleFormSumbit}
        >
          Submit
        </button>
      </form>
    </Fragment>
  );
};

export default Login;
