import { useState } from "react";
import axios from "axios";
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const handlePasswordChange = (ev) => {
    setPassword(ev.target.value);
  };
  const handleSubmit = (ev) => {
    ev.preventDefault();
    axios
      .post("/auth/resetpassword", { password })
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
          New password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputEmail1"
          onChange={handlePasswordChange}
          value={password}
        />
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};
export default ResetPassword;
