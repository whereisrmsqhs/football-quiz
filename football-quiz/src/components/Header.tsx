import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faBars,
  faFutbol,
  faLandmark,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../css/header.scss";
import { useState } from "react";

const Header: React.FC = () => {
  const [toggleBtn, settoggleBtn] = useState(false);
  const onToggleClick = () => {
    settoggleBtn(!toggleBtn);
  };
  return (
    <div>
      <nav className="navbar">
        <div className="navbar__logo">
          <FontAwesomeIcon icon={faFutbol as IconProp} />
          <Link to={"/"}>
            <span>축잘알 퀴즈</span>
          </Link>
        </div>
        <ul className={toggleBtn ? "navbar__menu active" : "navbar__menu"}>
          <li>
            <Link to={"/"}>메인</Link>
          </li>
          <li>
            <Link to={"/quizMain"}>퀴즈풀기</Link>
          </li>
          <li>
            <Link to={"/community"}>게시판</Link>
          </li>
          <li>
            <Link to={"/contact"}>문의</Link>
          </li>
        </ul>
        <ul className={toggleBtn ? "navbar__icon active" : "navbar__icon"}>
          <FontAwesomeIcon icon={faGithub as IconProp} />
          <FontAwesomeIcon icon={faLandmark as IconProp} />
        </ul>
        <a href="#!" className="navbar__toggleBtn" onClick={onToggleClick}>
          <FontAwesomeIcon icon={faBars as IconProp} />
        </a>
      </nav>
      <hr />
    </div>
  );
};

export default Header;
