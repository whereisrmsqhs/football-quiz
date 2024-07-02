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
import { useAuth } from "../context/AuthContext";

const Header: React.FC = () => {
  const [toggleBtn, settoggleBtn] = useState(false);
  const { isLoggedIn } = useAuth();

  const onToggleClick = () => {
    settoggleBtn(!toggleBtn);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar__logo">
          <FontAwesomeIcon icon={faFutbol as IconProp} />
          <Link to={"/"}>
            <span>
              <strong> 축잘알 퀴즈</strong>
            </span>
          </Link>
        </div>
        <ul className={toggleBtn ? "navbar__menu active" : "navbar__menu"}>
          <Link to={"/"}>
            <li>메인</li>
          </Link>
          <Link to={"/quiz"}>
            <li>퀴즈풀기</li>
          </Link>
          <Link to={"/community"}>
            <li>게시판</li>
          </Link>
          <Link to={"/contact"}>
            <li>문의</li>
          </Link>
        </ul>
        {isLoggedIn ? <div>로그아웃</div> : <div>로그인</div>}
        <ul className={toggleBtn ? "navbar__icon active" : "navbar__icon"}>
          <FontAwesomeIcon icon={faGithub as IconProp} />
          <FontAwesomeIcon icon={faLandmark as IconProp} />
        </ul>
        <a href="#!" className="navbar__toggleBtn" onClick={onToggleClick}>
          <FontAwesomeIcon icon={faBars as IconProp} />
        </a>
      </nav>
    </div>
  );
};

export default Header;
