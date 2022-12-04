import axios from "axios";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { authActions } from "store/auth";
import businessRegisterationSchema from "validation/register_biz.validation";
import validate from "validation/validate";

const initialregBizInputs = {
  name: "",
  email: "",
  password: "",
  biz: true,
  phone: "",
  bizUrl: "",
  wazeLocation: "",
};

const RegisterBusiness = () => {
  const [regBizInputs, setRegBizInputs] = useState(initialregBizInputs);
  const [inputError, setInputError] = useState({
    name: false,
    email: false,
    password: false,
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const handleInputChange = (event) => {
    let copyOfRegBizInputs = JSON.parse(JSON.stringify(regBizInputs));
    copyOfRegBizInputs[event.target.id] = event.target.value;
    setRegBizInputs(copyOfRegBizInputs);
  };

  const removeErrorAlerts = (event) => {
    let copyOfInputError = JSON.parse(JSON.stringify(inputError));
    copyOfInputError[event.target.id] = false;
    setInputError(copyOfInputError);
  };

  const handleFormSumbit = (event) => {
    event.preventDefault();

    /* user-side Joi vlidation */
    const { error } = validate(regBizInputs, businessRegisterationSchema);
    if (error) {
      console.log("there was an error", error.details);
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
    axios
      .post("/users/register", regBizInputs)
      .then((response) => {
        /* logging in in order to get the token */
        axios
          .post("/users/login", {
            email: regBizInputs.email,
            password: regBizInputs.password,
          })
          .then((response) => {
            console.log("login was successful!", response);
            localStorage.setItem("token", response.data.token);
            /* sending the content of the token to a redux variable */
            let tokenData = jwt_decode(response.data.token);
            dispatch(authActions.login(tokenData));

            /* saving user data in redux */
            let copyOfRegBizInputs = {
              ...regBizInputs,
              _id: tokenData._id,
              isAdmin: tokenData.isAdmin,
            };

            dispatch(authActions.saveUserInfo(copyOfRegBizInputs));
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

        /* send to add show page */
        history.push("/addshow");
      })
      .catch((error) => {
        console.log("error", error);
        toast.error(
          `an error occured when sending data to the server for regestering: ${error.response.data}`,
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
      <h1>רישום עסק</h1>
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
            value={regBizInputs.name}
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
            value={regBizInputs.email}
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
            value={regBizInputs.password}
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
          <label htmlFor="exampleInputPhone1" className="form-label">
            Phone number for ticket selling
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            value={regBizInputs.phone}
            onChange={handleInputChange}
            onFocus={removeErrorAlerts}
          />
          {inputError.phone ? (
            <p style={{ color: "red" }}>not a valid phone number</p>
          ) : (
            ""
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputBizUrl1" className="form-label">
            business web site address
          </label>
          <input
            type="text"
            className="form-control"
            id="bizUrl"
            value={regBizInputs.bizUrl}
            onChange={handleInputChange}
            onFocus={removeErrorAlerts}
          />
          {inputError.bizUrl ? (
            <p style={{ color: "red" }}>not a valid web address</p>
          ) : (
            ""
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputWazeLocation1" className="form-label">
            Waze directional address
          </label>
          <input
            type="text"
            className="form-control"
            id="wazeLocation"
            value={regBizInputs.wazeLocation}
            onChange={handleInputChange}
            onFocus={removeErrorAlerts}
          />
          {inputError.wazeLocation ? (
            <p style={{ color: "red" }}>this is not a valid waze address</p>
          ) : (
            <Fragment>
              <p>
                example:
                "https://www.waze.com/en/live-map/directions?latlng=32.72154705202104%2C35.245213508605964"
              </p>
              <p>or: "https://waze.com/ul/hsvcm56cys"</p>
            </Fragment>
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

export default RegisterBusiness;
