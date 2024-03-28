import { useState } from "react";
import SelectClubsList from "../components/SelectClubsList";

interface eachQuizInfo {
  team: string[];
  answer: string;
}

const CreateQuiz: React.FC = () => {
  const [type, setType] = useState<string>("");
  const [registed, setRegisted] = useState<eachQuizInfo[]>([]);
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  };
  return (
    <div>
      <form>
        <label htmlFor="type">퀴즈 형식</label>
        <select name="quizType" id="type" value={type} onChange={handleSelect}>
          <option value="">퀴즈 형식을 선택해주세요.</option>
          <option value="type1">타입1 : 클럽 로고로 선수 맞추기</option>
          <option value="type2">타입2 : 포메이션으로 클럽/국대 맞추기</option>
        </select>
        <input type="submit" value="Submit" />
        {type === "type1" ? (
          <div>
            <h2>추가될 클럽 순서는 예전 ~ 최근 클럽 순으로 추가해주세요.</h2>
            <SelectClubsList />
            <button>문제 등록</button>
            {registed.map((quiz) => {
              return (
                <div>
                  <div>{quiz.answer}</div>
                  <div>{quiz.team}</div>
                </div>
              );
            })}
            <br />
            <button>문제집 등록!</button>
          </div>
        ) : null}
        {type === "type2" ? <div></div> : null}
      </form>
    </div>
  );
};

export default CreateQuiz;
