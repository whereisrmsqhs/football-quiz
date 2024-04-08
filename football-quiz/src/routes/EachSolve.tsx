import { useOutletContext, useParams } from "react-router-dom";
import { Key, useEffect, useState } from "react";
import React from "react";

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
  const [order, setOrder] = useState<number>(1);
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
      {loading ? (
        <div>로딩중</div>
      ) : eachInfo.length > 0 ? (
        <>
          {eachInfo[0].team.map((each, index) => (
            <React.Fragment key={each}>
              <img src={`${team_logo_path}/${each}.svg`} alt="team_logo" />
              {index !== eachInfo[0].team.length - 1 && (
                <img
                  src={process.env.PUBLIC_URL + "/assets/arrow.png"}
                  alt="arrow"
                />
              )}
            </React.Fragment>
          ))}
          <input type="text" placeholder="답안을 입력하세요" />
          <button>제출</button>
        </>
      ) : (
        <div>에러! 팀정보가 없습니다.</div>
      )}
    </div>
  );
};

export default EachSolve;
