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

const initialState = [
  { text: "너가 진짜 xxx팬이라고???", top: randomTop(), delay: 0 },
  {
    text: "이번 시즌 챔스 우승은 누가할것 같은데?",
    top: randomTop(),
    delay: 0,
  },
  { text: "작년 발롱도르 위너가 누구였음?", top: randomTop(), delay: 0 },
  { text: "어제 손흥민 골 몇골 넣었는데?", top: randomTop(), delay: 0 },
  { text: "이번 시즌 가장 유망한 선수는?", top: randomTop(), delay: 0 },
  { text: "xx팀 감독이 누군데?", top: randomTop(), delay: 0 },
  { text: "초대 챔피언스리그 우승팀은?", top: randomTop(), delay: 0 },
  { text: "너가 감스트보다 모를것 같은데?", top: randomTop(), delay: 0 },
  { text: "여기 퀴즈 다 맞추면 인정!", top: randomTop(), delay: 0 },
];

const Home: React.FC = () => {
  const [sentenceInfo, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    // dispatch({ type: "INIT", index: 0 });
    console.log(sentenceInfo);
  }, []);

  const sentenceVariants = sentenceInfo.map(
    (sentence: { text: string; top: number; delay: number }) => ({
      start: {
        x: 0,
        y: `${sentence.top}vh`, // 각 문장마다 다른 y값 설정
      },
    })
  );

  return (
    <div className="main">
      <div className="main__moving-sentences">
        {/* {sentenceInfo.map(
          (
            sentence: { top: number; text: string; delay: number },
            index: number
          ) => (
            <motion.div
              style={{ position: "absolute" }}
              key={index}
              initial="start"
              animate={{ x: window.innerWidth - 100, opacity: [0, 1, 0] }}
              transition={{
                duration: 5,
                delay: 1,
                repeat: 100,
                ease: "easeOut",
                repeatDelay: 1,
                onComplete: () => {
                  dispatch({ type: "UPDATE", index: index });
                },
              }}
              variants={sentenceVariants[index]}
            >
              {sentence.text}
            </motion.div>
          )
        )} */}
      </div>
      <div className="main__content">
        <div className="main__content__intro">
          {/* <h1>"너가 그렇게 축구를 잘알어?"</h1>
          <div>부터 시작된 본격 축구 지식 겨루기 사이트</div>
          <div>진짜로 축구를 잘아는지 축덕력 레이더!</div>
          <div>잔말말고 그냥 해봐!</div> */}
        </div>
        <Link to="/quiz">
          <button className="main__content__solve">퀴즈풀기</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
