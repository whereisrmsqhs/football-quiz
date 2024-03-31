import { useState } from "react";
import SelectClubsList from "../components/SelectClubsList";

export interface eachQuizInfo {
  team: string;
  answer: string;
}

const CreateQuiz: React.FC = () => {
  const [type, setType] = useState<string>("");
  const [registed, setRegisted] = useState<eachQuizInfo[]>([]);
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  };
  const saveEachQuizInfo = (registedClub: string, answer: string) => {
    setRegisted((registed) => {
      const newInfo = {
        team: registedClub,
        answer: answer,
      };
      return [...registed, newInfo];
    });
  };
  async function handleSubmit(
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) {
    event.preventDefault();
    // 추후 검증 로직 필요.
    const response = await fetch("http://localhost:3001/quiz/post", {
      method: "POST",
      body: JSON.stringify(registed, null, 2),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  }
  return (
    <div>
      <form action="/quiz/post" method="POST" encType="multipart/form-data">
        <label htmlFor="type">퀴즈 형식</label>
        <select name="quizType" id="type" value={type} onChange={handleSelect}>
          <option value="">퀴즈 형식을 선택해주세요.</option>
          <option value="type1">타입1 : 클럽 로고로 선수 맞추기</option>
          <option value="type2">타입2 : 포메이션으로 클럽/국대 맞추기</option>
        </select>
        <input type="submit" value="Submit" />
        {type === "type1" ? (
          <div>
            <label>퀴즈 이름</label>
            <input type="text" placeholder="제목을 적어주세요" />
            <label>퀴즈 룰 설명</label>
            <input type="text" placeholder="필요한 퀴즈 설명을 적어주세요" />
            <h2>추가될 클럽 순서는 예전 ~ 최근 클럽 순으로 추가해주세요.</h2>
            <SelectClubsList saveEachQuizInfo={saveEachQuizInfo} />
            {registed.map((quiz) => {
              return (
                <div>
                  <div>{quiz.answer}</div>
                  <div>{quiz.team}</div>
                </div>
              );
            })}
            <br />
            <input type="file" name="userfile" />
            <button type="submit">썸네일 사진 업로드</button>
            <button onClick={handleSubmit}>문제집 등록!</button>
          </div>
        ) : null}
        {type === "type2" ? <div></div> : null}
      </form>
    </div>
  );
};

export default CreateQuiz;
