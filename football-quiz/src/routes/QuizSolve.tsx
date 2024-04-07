import { response } from "express";
import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";

type QuizIdType = { quizId: string | null };

interface QuizInfo {
  pk: number;
  name: string;
  type: string;
  thumbnail: string;
  quiz_rule: string;
  user_id: number;
}

const QuizSolve: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [quizInfo, setQuizInfo] = useState<QuizInfo>();
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
  return (
    <div>
      <h1>퀴즈풀어보자</h1>
      {loading ? (
        <div>로딩중...</div>
      ) : (
        <div>
          <h2>퀴즈 제목 : {quizInfo?.name}</h2>
          <article>{quizInfo?.quiz_rule}</article>
          {quizId !== undefined ? (
            <Outlet context={{ quizId }} />
          ) : (
            <div>에러가 발생했습니다.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizSolve;
