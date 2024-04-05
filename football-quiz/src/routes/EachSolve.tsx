import { useParams } from "react-router-dom";
import { useQuizId } from "./QuizSolve";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const EachSolve: React.FC = () => {
  const { quizId } = useQuizId();
  const { quizOrder } = useParams();
  const [loading, setLoading] = useState(false) as [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ];
  const { order, setOrder } = useState(quizOrder);
  const { eachInfo, setEachInfo } = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3001/quiz/${quizId}/order/${order}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => setEachInfo(response));
    setLoading(false);
  }, []);
  return <div>뭐여 {quizId}</div>;
};

export default EachSolve;
