import { useState } from "react";
import axios from "axios";
import validate from "validation/validate";
import forgotPasswordSchema from "validation/forgotPassword.validation";
const ForgotPassword = () => {
  const [email, setEmail] = useState({ email: "" });
  const [emailError, setEmailError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleEmailChange = (ev) => {
    setEmail({ email: ev.target.value });
  };

  const removeErrorAlerts = () => {
    setEmailError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { error, value: validatedValue } = validate(
      email,
      forgotPasswordSchema
    );
    if (error) {
      setEmailError(true);
      return;
    }
    axios
      .post("/users/forgotpassword/", validatedValue)
      .then(({ data }) => {
        //a message that says that a link was sent to the users email address
        setSuccess(true);
        console.log(data);
      })
      .catch((err) => {
        setEmailError(true);
        console.log(err);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={handleEmailChange}
          value={email.email}
          onFocus={removeErrorAlerts}
        />
        {emailError ? <p style={{ color: "red" }}>not a valid email</p> : ""}
        {success ? (
          <p style={{ color: "DarkGreen" }}>
            a link for resetting your password has been sent to your email
            address. the link is valid for 1 hour.
          </p>
        ) : (
          ""
        )}
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};
export default ForgotPassword;
