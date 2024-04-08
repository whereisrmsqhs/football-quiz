import { useOutletContext } from "react-router-dom";
import { ChangeEvent, Key, useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<number>(1);
  const [eachInfo, setEachInfo] = useState<EachInfoType[]>([]); // 서버로부터 받아오는 퀴즈 정보
  const [userAnswer, setUserAnswer] = useState("");
  const [currentPoint, setCurrentPoint] = useState(0);
  const [formSubmit, setFormSubmit] = useState(false);
  const [sendMessage, setSendMessage] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3001/quiz/${quizId}/solve/${order}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        setEachInfo((current) => [...current, ...response]);
        console.log(eachInfo);
      });
    setLoading(false);
  }, [order]);

  const handleUserInput = (event: ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(event.target.value);
  };

  const checkUserAnswer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userAnswer == eachInfo[0].answer) {
      setSendMessage("정답입니다!");
      setCurrentPoint(currentPoint + 1);
    } else {
      setSendMessage("틀렸습니다!");
    }

    setFormSubmit(true);
  };

  const handleNextQuizBtn = () => {
    setEachInfo(eachInfo.slice(1));
    setUserAnswer("");
    setFormSubmit(false);
    setOrder(order + 1);
  };

  return (
    <div>
      {loading ? (
        <div>로딩중</div>
      ) : eachInfo.length > 0 ? (
        <>
          <div>내 점수: {currentPoint} / 2</div>
          {eachInfo[0].team &&
            eachInfo[0].team.map((each, index) => (
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
          {formSubmit ? (
            <div>
              <div>{sendMessage}</div>
              <div>정답: {eachInfo[0].answer}</div>
              <button onClick={handleNextQuizBtn}>다음</button>
            </div>
          ) : (
            <form onSubmit={checkUserAnswer}>
              <input
                value={userAnswer}
                onChange={handleUserInput}
                type="text"
                placeholder="답안을 입력하세요"
              />
              <button type="submit">제출</button>
            </form>
          )}
        </>
      ) : (
        <div>에러! 팀정보가 없습니다.</div>
      )}
    </div>
  );
};

export default EachSolve;
