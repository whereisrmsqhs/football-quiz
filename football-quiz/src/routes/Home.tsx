import { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import { MotionValue, motion } from "framer-motion";
import "../css/home.scss";

interface SentenceType {
  top: number;
  text: string;
  delay: number;
}

interface ActionType {
  type: string;
  index: number;
}

const randomTop = () => Math.floor(Math.random() * 100);

const reducer = (state: SentenceType[], action: ActionType): SentenceType[] => {
  if (action.type === "INIT") {
    return state.map((each) => ({
      ...each,
      top: Math.floor(Math.random() * 100),
      delay: Math.floor(Math.random() * 10),
    }));
  } else {
    const updatedState = [...state];
    updatedState[action.index] = {
      ...updatedState[action.index],
      top: Math.floor(Math.random() * 100),
      delay: Math.floor(Math.random() * 10),
    };
    return updatedState;
  }
};

const Home: React.FC = () => {
  return (
    <div className="main">
      <img
        className="background"
        src={process.env.PUBLIC_URL + "/assets/background1.jpg"}
      />
      <div className="masthead">
        <div className="masthead__intro">
          <h1>- 축잘알 퀴즈 -</h1>
          <h1>축잘알과 축알못들의 시험대</h1>
          <hr />
          <div></div>
          <div>평소 알기 어려웠던 나와 친구의 축덕력을 테스트해보자!</div>
        </div>
      </div>
      <div className="main__content">
        <Link to="/quiz">
          <button className="main__content__solve">퀴즈풀기</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
