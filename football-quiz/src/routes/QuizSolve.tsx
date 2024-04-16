import { response } from "express";
import { useEffect, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "../css/quizsolve.scss";
import { PlayerNameContext } from "../context/PlayerNameContext";

type QuizIdType = { quizId: string | null };

interface QuizInfo {
  pk: number;
  name: string;
  type: string;
  thumbnail: string;
  quiz_rule: string;
  user_id: number;
  difficulty: string;
  recommends: number;
  total_quiz: number;
}

const QuizSolve: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [quizInfo, setQuizInfo] = useState<QuizInfo>();
  const [quizStart, setQuizStart] = useState(false);
  const [playerList, setPlayerList] = useState<string[]>([]);
  const { quizId } = useParams();
  useEffect(() => {
    fetch(`http://localhost:3001/quiz/${quizId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        setQuizInfo(response);
      });
    setLoading(false);
  }, [quizId]);

  useEffect(() => {
    fetch(`http://localhost:3001/playerList`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        setPlayerList(response);
      });
  }, []);

  const handleStartBtn = () => {
    setQuizStart(true);
  };
  return (
    <PlayerNameContext.Provider value={playerList}>
      <div className="solve_container">
        <img
          className="background"
          alt="background_image"
          src={process.env.PUBLIC_URL + "/assets/background1.jpg"}
        />
        <div className="solve_container_description">
          {loading ? (
            <div>로딩중...</div>
          ) : (
            <div>
              <h1>{quizInfo?.name}</h1>
              <div className="quiz_num">총 문제: {quizInfo?.total_quiz}</div>
              {quizStart ? (
                <></>
              ) : (
                <>
                  <article>{quizInfo?.quiz_rule}</article>
                  <Link to={`/quiz/${quizId}/solve`}>
                    <button onClick={handleStartBtn}>시작</button>
                  </Link>
                </>
              )}
              {quizId !== undefined ? (
                <Outlet context={{ quizId }} />
              ) : (
                <div>에러가 발생했습니다.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </PlayerNameContext.Provider>
  );
};

export default QuizSolve;
