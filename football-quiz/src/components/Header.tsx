import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faGithub } from "@fortawesome/free-solid-svg-icons";

const Header: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <i className="fa-regular fa-futbol"></i>
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
        {/* <FontAwesomeIcon icon={faGithub} /> */}
        <i className="fa-solid fa-landmark"></i>
      </ul>
      <a href="#!" className="navbar__toggleBtn">
        <i className="fa-solid fa-bars"></i>
      </a>
    </nav>
  );
};

export default Header;
