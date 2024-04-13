import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/quiz.scss";

const img_url = "http://localhost:3001";
interface QuizBlock {
  id: number;
  title: string;
  brief_explain: string;
  thumbnail: string;
}

const Quiz: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [quizList, setQuizList] = useState<QuizBlock[]>();
  useEffect(() => {
    fetch("http://localhost:3001/quiz", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => setQuizList(response));
    setLoading(false);
  }, []);
  return (
    <div className="quiz_list">
      <img
        className="background"
        src={process.env.PUBLIC_URL + "/assets/background1.jpg"}
      />
      <header>
        <h1>도전!</h1>
        <h2>문제 풀어보기</h2>
      </header>
      {loading ? (
        <div>로딩중...</div>
      ) : (
        <div className="quiz_list_container">
          {quizList?.map((quiz) => (
            <Link to={`/quiz/${quiz.id}`}>
              <div className="each_quiz_container">
                <img src={`${img_url}/${quiz.thumbnail}`} alt="썸네일" />
                <div className="each_quiz_info">
                  <div className="each_quiz_title">{quiz.title}</div>
                  <div className="each_quiz_explain">{quiz.brief_explain}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Quiz;
