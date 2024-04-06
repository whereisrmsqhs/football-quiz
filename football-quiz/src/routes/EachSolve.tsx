import { useOutletContext, useParams } from "react-router-dom";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface QuizIdType {
  quizId: string;
}

const EachSolve: React.FC = () => {
  const { quizId } = useOutletContext<QuizIdType>();
  const { quizOrder } = useParams();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(1);
  const [eachInfo, setEachInfo] = useState([]);

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
