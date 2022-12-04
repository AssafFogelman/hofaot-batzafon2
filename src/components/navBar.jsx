import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { authActions } from "store/auth";
import logo from "../assets/imgs/hofaot-batzafon-logo.png";
const { Fragment } = require("react");

let navBarNormalOptions = [
  {
    label: "The Shows",
    url: "/allshows",
  },

  {
    label: "About Us",
    url: "/aboutus",
  },
];

let navBarBizOptions = [
  {
    label: "My Shows",
    url: "/myshows",
  },
  {
    label: "Add Show",
    url: "/addshow",
  },
];

const NavBar = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const tokenData = useSelector((state) => state.auth.tokenData);
  const serverUserData = useSelector((state) => state.auth.serverUserData);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(authActions.logout());
    localStorage.clear();
    history.push("/");
  };
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              style={{ height: "60px" }}
              src={logo}
              alt="hofaot-batzafon-logo"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {loggedIn &&
                tokenData.biz &&
                navBarBizOptions.map((menuItem, index) => {
                  return (
                    <li className="nav-item" key={menuItem.label + index}>
                      <Link
                        to={menuItem.url}
                        className="nav-link active"
                        aria-current="page"
                      >
                        {menuItem.label}
                      </Link>
                    </li>
                  );
                })}
              {loggedIn &&
                navBarNormalOptions.map((menuItem, index) => {
                  return (
                    <li className="nav-item" key={menuItem.label + index}>
                      <Link
                        to={menuItem.url}
                        className="nav-link active"
                        aria-current="page"
                      >
                        {menuItem.label}
                      </Link>
                    </li>
                  );
                })}
            </ul>
            <div className="d-flex justify-content-between align-items-center">
              {loggedIn ? (
                <Fragment>
                  <div className="mx-3">hello {serverUserData.name}!</div>

                  <button
                    className="btn btn-outline-success"
                    onClick={handleLogout}
                  >
                    Log out
                  </button>
                </Fragment>
              ) : (
                <Fragment>
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item dropdown">
                      <Link
                        className="nav-link dropdown-toggle"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Register
                      </Link>
                      <ul className="dropdown-menu">
                        <li>
                          <Link to="/registeruser" className="dropdown-item">
                            Register User
                          </Link>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <Link to="RegisterBusiness" className="dropdown-item">
                            Register Business
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <Link className="btn btn-outline-success" to="/login">
                    Login
                  </Link>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default NavBar;
