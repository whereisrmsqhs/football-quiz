import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../css/home.scss";

interface SentenceType {
  top: number;
  text: string;
  delay: number;
}

const Home: React.FC = () => {
  const [sentences, setSentences] = useState<SentenceType[]>([
    { text: "너가 진짜 xxx팬이라고???", top: 0, delay: 0 },
    { text: "이번 시즌 챔스 우승은 누가할것 같은데?", top: 0, delay: 0 },
    { text: "작년 발롱도르 위너가 누구였음?", top: 0, delay: 0 },
    { text: "어제 손흥민 골 몇골 넣었는데?", top: 0, delay: 0 },
    { text: "이번 시즌 가장 유망한 선수는?", top: 0, delay: 0 },
    { text: "xx팀 감독이 누군데?", top: 0, delay: 0 },
    { text: "초대 챔피언스리그 우승팀은?", top: 0, delay: 0 },
    { text: "너가 감스트보다 모를것 같은데?", top: 0, delay: 0 },
    { text: "여기 퀴즈 다 맞추면 인정!", top: 0, delay: 0 },
  ]);

  return (
    <div className="main">
      <div className="main__moving-sentences">
        {sentences.map((sentence, index) => (
          <motion.div
            key={index}
            initial={{ x: 0, y: `${Math.floor(Math.random() * 10)}vh` }} // 초기 위치를 왼쪽 끝으로 설정
            animate={{ x: window.innerWidth - 100, opacity: [0, 1, 0] }} // 오른쪽으로 이동하여 최종 위치를 화면 중앙으로 설정
            transition={{
              duration: 5,
              delay: 1,
              repeat: Infinity,
              repeatDelay: 1,
            }} // 애니메이션 지속 시간 설정 (예: 2초)
          >
            {sentence.text}
          </motion.div>
        ))}
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
