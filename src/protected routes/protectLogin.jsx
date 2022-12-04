import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectLogin = ({ component: Page, ...rest }) => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  return (
    <Route
      {...rest}
      render={(props) => (loggedIn ? <Page {...props} /> : <Redirect to="/" />)}
    />
  );
};

export default ProtectLogin;
