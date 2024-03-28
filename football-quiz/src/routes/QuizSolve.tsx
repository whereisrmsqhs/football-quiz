import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const QuizSolve: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [quizInfo, setQuizInfo] = useState();
  const { quizId } = useParams();
  // useEffect(() => {
  //   fetch(`http://localhost:3001/quiz/${quizId}`, {
  //     method: "GET",
  //   })
  //     .then((response) => response.json())
  //     .then((response) => setQuizInfo(response));
  //   setLoading(false);
  // }, []);
  return (
    <div>
      <h1>퀴즈풀어보자</h1>
    </div>
  );
};

export default QuizSolve;
