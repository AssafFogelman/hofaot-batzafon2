import Footer from "components/footer";
import NavBar from "components/navBar";
import useAutoLogin from "hooks/useAutoLogin";
import AboutUs from "pages/aboutUs";
import AddShow from "pages/addShow";
import AllShows from "pages/allShows";
import EditShow from "pages/editShow";
import HomePage from "pages/homepage";
import Login from "pages/login";
import MyShows from "pages/myShows";
import PageNotFound from "pages/pageNotFound";
import RegisterBusiness from "pages/registerBusiness";
import RegisterUser from "pages/registerUser";
import ProtectBizLogin from "protected routes/protectBizLogin";
import ProtectLogin from "protected routes/protectLogin";
import { Fragment, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import { ToastContainer } from "react-toastify";
import jwt_decode from "jwt-decode";
import "./App.scss";
import { useSelector } from "react-redux";
import ForgotPassword from "pages/forgotPassword";
import ResetPassword from "pages/resetPassword";

function App() {
  const [inLoggingProcess, setInLoggingProcess] = useState(true);
  const autoLogin = useAutoLogin();
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  useEffect(() => {
    (async () => {
      //if there is no token, we open the site as an unlogged user.
      if (!localStorage.getItem("token")) {
        setInLoggingProcess(false);
        return;
      }
      let isloggedIn = await autoLogin(
        jwt_decode(localStorage.getItem("token"))
      );
      if (isloggedIn === false) {
        setInLoggingProcess(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (loggedIn === true && inLoggingProcess === true) {
      setInLoggingProcess(false);
    }
  }, [loggedIn]);

  return (
    <Fragment>
      <div className="container">
        <ToastContainer />
        <div className="siteContent">
          {/* siteContent is css styling for the footer to stay at the bottom of a short page */}
          <NavBar />
          {!inLoggingProcess && (
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/registeruser" component={RegisterUser} />
              <Route path="/registerbusiness" component={RegisterBusiness} />
              <ProtectLogin path="/allShows" component={AllShows} />
              <Route path="/login" component={Login} />
              <ProtectBizLogin path="/addshow" component={AddShow} />
              <ProtectBizLogin path="/editshow" component={EditShow} />
              <ProtectBizLogin path="/myshows" component={MyShows} />
              <Route path="/forgotpassword" component={ForgotPassword} />
              <Route path="/resetpassword" component={ResetPassword} />
              <Route path="/aboutus" component={AboutUs} />
              <Route path="*" component={PageNotFound} />
            </Switch>
          )}
        </div>
        <Footer />
      </div>
    </Fragment>
  );
}

export default App;
