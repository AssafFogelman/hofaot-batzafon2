import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faSquareUpRight } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as WazeSVG } from "../assets/imgs/waze.svg";
import { SiWaze } from "react-icons/si";
import { CgWebsite } from "react-icons/cg";

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useRef, useState } from "react";

const ShowCard = ({ show, deleteCard, canEdit }) => {
  return (
    <div className="col d-flex justify-content-center">
      <div className="card" style={{ width: "18rem" }}>
        <div className="position-absolute" style={{ color: "#eee" }}>
          {show.performanceDate}
        </div>
        <img
          src={show.image.url}
          className="card-img-top"
          alt={show.image.alt}
        />
        <div className="card-body">
          <h5 className="card-title">{show.performanceTitle}</h5>
          <h6 className="card-title">{show.subTitle}</h6>
          <p className="card-text">{show.description}</p>
          <h6 className="card-title">שם המועדון: {show.bizName}</h6>
          <div className="d-flex justify-content-around">
            <a href={"tel:" + show.phone} className="btn btn-secondary">
              <FontAwesomeIcon icon={faPhone} />
            </a>
            <a href={show.wazeLocation} className="btn btn-info">
              {/* <FontAwesomeIcon icon={faLocationDot} /> */}
              <SiWaze className="mb-1" />
              {/* <WazeSVG height={"100%"} /> */}
            </a>
            <a href={show.bizUrl} className="btn btn-success">
              {/* <FontAwesomeIcon icon={faSquareUpRight} /> */}
              <CgWebsite className="mb-1" />
            </a>
          </div>
          {/* only if the "canEdit" property is enabled, can the buttons be seen */}
          {canEdit ? (
            <div className="d-flex justify-content-around mt-2">
              <Link
                to={`/editshow/?showcard=${JSON.stringify(show)}`}
                className="btn btn-warning"
              >
                <FontAwesomeIcon icon={faUserPen} />
              </Link>
              <button
                className="btn btn-danger"
                onClick={() => {
                  deleteCard(show._id);
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowCard;
