import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faBars,
  faFutbol,
  faLandmark,
} from "@fortawesome/free-solid-svg-icons";

const Header: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <FontAwesomeIcon icon={faFutbol as IconProp} />
        <a href="#!">축잘알 퀴즈</a>
      </div>
      <ul className="navbar__menu">
        <li>
          <a href="/">메인</a>
        </li>
        <li>
          <a href="/quizMain">퀴즈풀기</a>
        </li>
        <li>
          <a href="/community">게시판</a>
        </li>
        <li>
          <a href="/contanct">문의</a>
        </li>
      </ul>
      <ul className="navbar__icon">
        <FontAwesomeIcon icon={faGithub as IconProp} />
        <FontAwesomeIcon icon={faLandmark as IconProp} />
      </ul>
      <a href="#!" className="navbar__toggleBtn">
        <FontAwesomeIcon icon={faBars as IconProp} />
      </a>
    </nav>
  );
};

export default Header;
