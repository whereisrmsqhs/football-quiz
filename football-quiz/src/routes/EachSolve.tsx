import { useOutletContext, useParams } from "react-router-dom";
import { Key, useEffect, useState } from "react";

interface QuizIdType {
  quizId: string;
}
interface EachInfoType {
  id: Key | null | undefined;
  team: string[];
  answer: string;
}

const team_logo_path = "http://localhost:3001/club_logos/";

const EachSolve: React.FC = () => {
  const { quizId } = useOutletContext<QuizIdType>();
  const { order: quizOrder } = useParams();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<string | undefined>(quizOrder);
  const [eachInfo, setEachInfo] = useState<EachInfoType[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3001/quiz/${quizId}/each/${order}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => setEachInfo(response));
    setLoading(false);
  }, []);

  return (
    <div>
      {eachInfo.map((each) => (
        <div key={each.id}>
          {each.team.map((logo) => (
            <img src={`${team_logo_path}/${logo}.svg`} alt="team_logo" />
          ))}
          {each.answer}
        </div>
      ))}
    </div>
  );
};

export default EachSolve;
