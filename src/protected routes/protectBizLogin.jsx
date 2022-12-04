import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectBizLogin = ({ component: Page, ...rest }) => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const dataFromToken = useSelector((state) => state.auth.tokenData);

  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn && dataFromToken && dataFromToken.biz ? (
          <Page {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default ProtectBizLogin;
