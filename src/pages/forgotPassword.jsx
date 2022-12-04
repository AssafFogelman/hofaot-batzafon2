import { useState } from "react";
import axios from "axios";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const handleEmailChange = (ev) => {
    setEmail(ev.target.value);
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    axios
      .post("/auth/forgotpassword", { email })
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => {
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
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={handleEmailChange}
          value={email}
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};
export default ForgotPassword;
