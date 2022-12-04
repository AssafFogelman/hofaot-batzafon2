import axios from "axios";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { authActions } from "store/auth";
import loginSchema from "validation/login.validation";
import userRegisterSchema from "validation/register_user.validation";
import validate from "validation/validate";

const initialregUserInputs = {
  name: "",
  email: "",
  password: "",
  biz: false,
};

const RegisterUser = () => {
  const [regUserInputs, setRegUserInputs] = useState(initialregUserInputs);
  const [inputError, setInputError] = useState({
    name: false,
    email: false,
    password: false,
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const handleInputChange = (event) => {
    let copyOfRegUserInputs = JSON.parse(JSON.stringify(regUserInputs));
    copyOfRegUserInputs[event.target.id] = event.target.value;
    setRegUserInputs(copyOfRegUserInputs);
  };

  const removeErrorAlerts = (event) => {
    let copyOfInputError = JSON.parse(JSON.stringify(inputError));
    copyOfInputError[event.target.id] = false;
    setInputError(copyOfInputError);
  };

  const handleFormSumbit = (event) => {
    event.preventDefault();
    console.log("we got to handleFormSumbit");
    /* user-side Joi vlidation */
    const { error } = validate(regUserInputs, userRegisterSchema);
    console.log("error", error);
    if (error) {
      setInputError((current) => {
        let copyOfInputError = JSON.parse(JSON.stringify(current));
        for (let field of error.details) {
          /* "field" is either "name", "email" or "password". the word comes from the Joi error object */
          copyOfInputError[field.path[0]] = true;
        }
        return copyOfInputError;
      });
      return;
    }
    console.log("regUserInputs", regUserInputs);
    axios
      .post("/users/register", regUserInputs)
      .then((response) => {
        /* logging in in order to get the token */
        console.log("response", response);
        axios
          .post("/users/login", {
            email: regUserInputs.email,
            password: regUserInputs.password,
          })
          .then((response) => {
            console.log("login was successful!", response);
            localStorage.setItem("token", response.data.token);
            /* sending the content of the token to a redux variable */
            let tokenData = jwt_decode(response.data.token);
            dispatch(authActions.login(tokenData));

            /* saving user data in redux */
            let copyOfRegUserInputs = {
              ...regUserInputs,
              _id: tokenData._id,
              isAdmin: tokenData.isAdmin,
            };

            dispatch(authActions.saveUserInfo(copyOfRegUserInputs));
          })
          .catch((error) => {
            console.log("error", error);
            toast.error(
              `an error occured when sending data to the server for logging-in: ${error.response.data}`,
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

        /* send to all shows page */
        history.push("/allshows");
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
      <h1>רישום משתמש</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputName1" className="form-label">
            Full name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="nameHelp"
            value={regUserInputs.name}
            onChange={handleInputChange}
            onFocus={removeErrorAlerts}
          />
          {inputError.name ? (
            <p style={{ color: "red" }}>not a valid name</p>
          ) : (
            ""
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            value={regUserInputs.email}
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
            value={regUserInputs.password}
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

export default RegisterUser;
