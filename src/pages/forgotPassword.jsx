import { useState } from "react";
import axios from "axios";
import validate from "validation/validate";
import forgotPasswordSchema from "validation/forgotPassword.validation";
const ForgotPassword = () => {
  const [email, setEmail] = useState({ email: "" });
  const [emailError, setEmailError] = useState(false);

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
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};
export default ForgotPassword;
