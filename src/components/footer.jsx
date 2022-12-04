import { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useAddCardsToSite from "hooks/useAddCardsToSite";

const Footer = () => {
  const addCardsToSite = useAddCardsToSite();
  let year = new Date().getFullYear();
  return (
    <Fragment>
      <footer className="mt-3">
        {/* <!-- Copyright --> */}
        <div
          className="text-center p-2 position-relative"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          <small>© {year} Copyright: Assaf Fogelman</small>
          <button
            className="position-absolute end-0 opacity-0"
            onClick={addCardsToSite}
          >
            הוסף כרטיסים ומשתמשים!
          </button>
        </div>
        {/* <!-- Copyright --> */}
      </footer>
      {/* <!-- Footer --> */}
    </Fragment>
  );
};

export default Footer;
