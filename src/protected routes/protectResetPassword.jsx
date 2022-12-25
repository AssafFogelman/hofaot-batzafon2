import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectResetPassword = ({ component: Page, ...rest }) => {
  const token = rest.computedMatch.params.token;
  const [tokenValid, setTokenValid] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    checkTokenValidity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkTokenValidity = async () => {
    try {
      await axios.get("/users/resetpassword/" + token);
      //if axios gets status 401 (invalid token), it will throw an error to the catch automatically
      setTokenValid(true);
      setLoaded(true);
      // return <Route {...rest} render={(props) => <Page {...props} />} />;
    } catch (error) {
      //there was a problem with the token verification
      setLoaded(true);
      // return <Route {...rest} render={(props) => <Redirect to="/403" />} />;
    }
  };

  return !loaded ? (
    <h2>Loading...</h2>
  ) : (
    <Route
      {...rest}
      render={(props) =>
        tokenValid ? <Page {...props} /> : <Redirect to="/403" />
      }
    />
  );
};

export default ProtectResetPassword;
