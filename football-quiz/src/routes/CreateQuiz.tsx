import { useEffect, useRef, useState } from "react";
import SelectClubsList from "../components/SelectClubsList";
import "../css/createquiz.scss";
import { PlayerNameContext } from "../context/PlayerNameContext";

export interface eachQuizInfo {
  team: string;
  answer: string;
}

const CreateQuiz: React.FC = () => {
  const title = useRef<any>(null);
  const explain = useRef<any>(null);
  const thumbnail = useRef<any>(null);
  const [type, setType] = useState<string>("");
  const [difficulty, setDifficulty] = useState<number>(3);
  const [registed, setRegisted] = useState<eachQuizInfo[]>([]);
  const [hover, setHover] = useState<boolean[]>([]);
  const [playerList, setPlayerList] = useState<string[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3001/playerList`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        setPlayerList(response);
      });
  }, []);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  };
  const saveEachQuizInfo = (teams: string[], answer: string) => {
    const registedClub = teams.join(",");
    setRegisted((registed) => {
      const newInfo = {
        team: registedClub,
        answer: answer,
      };
      return [...registed, newInfo];
    });
  };
  async function handleType1Submit(
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) {
    event.preventDefault();
    // 추후 검증 로직 필요.
    const formData = new FormData();
    formData.append("quiz_type", type);
    formData.append("quiz_title", title.current?.value);
    formData.append("quiz_explain", explain.current?.value);
    formData.append("quiz_thumbnail", thumbnail.current?.files[0]);
    formData.append("quiz_info", JSON.stringify(registed));
    formData.append("difficulty", String(difficulty));
    const response = await fetch("http://localhost:3001/quiz/post", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    alert("퀴즈 업로드 성공!");
  }
  const handleDifficultyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value);
    setDifficulty(value);
  };

  const handleMouseOver = (index: number) => {
    setHover((prev) => {
      const temp: boolean[] = [...prev];
      temp[index] = true;
      return temp;
    });
  };

  const handleMouseOut = (index: number) => {
    setHover((prev) => {
      const temp: boolean[] = [...prev];
      temp[index] = false;
      return temp;
    });
  };

  const deletePlayerInfo = (index: number) => {
    setRegisted((prev) => {
      if (prev.length === 1) return [];
      return prev.splice(index, 1);
    });
  };

  return (
    <PlayerNameContext.Provider value={playerList}>
      <div className="container">
        <img
          className="background"
          alt="background_image"
          src={process.env.PUBLIC_URL + "/assets/background1.jpg"}
        />
        <form className="postForm">
          <div className="type_select">
            <label htmlFor="type">퀴즈 형식</label>
            <select
              name="quizType"
              id="type"
              value={type}
              onChange={handleSelect}
            >
              <option value="">퀴즈 형식을 선택해주세요.</option>
              <option value="type1">타입1 : 클럽 로고로 선수 맞추기</option>
              <option value="type2" disabled>
                타입2 : 포메이션으로 클럽/국대 맞추기
              </option>
            </select>
          </div>
          {type === "type1" ? (
            <div className="type1_form">
              <div className="type1_quiz_name">
                <label>제목</label>
                <input
                  ref={title}
                  type="text"
                  placeholder="제목을 적어주세요"
                />
              </div>
              <hr />
              <div className="type1_quiz_rule">
                <label>룰 설명</label>
                <textarea
                  className="rule_container"
                  ref={explain}
                  placeholder="필요한 퀴즈 설명을 적어주세요"
                />
              </div>
              <hr />
              <div className="type1_difficulty">
                <label>난이도</label>
                <input
                  type="radio"
                  name="difficulty"
                  value={1}
                  checked={difficulty === 1}
                  onChange={handleDifficultyChange}
                />{" "}
                뉴비
                <input
                  type="radio"
                  name="difficulty"
                  value={2}
                  checked={difficulty === 2}
                  onChange={handleDifficultyChange}
                />{" "}
                쉬움
                <input
                  type="radio"
                  name="difficulty"
                  value={3}
                  checked={difficulty === 3}
                  onChange={handleDifficultyChange}
                />{" "}
                근본
                <input
                  type="radio"
                  name="difficulty"
                  value={4}
                  checked={difficulty === 4}
                  onChange={handleDifficultyChange}
                />{" "}
                축덕
                <input
                  type="radio"
                  name="difficulty"
                  value={5}
                  checked={difficulty === 5}
                  onChange={handleDifficultyChange}
                />{" "}
                교수님
              </div>
              <hr />
              <h2>추가될 클럽 순서는 예전 ~ 최근 클럽 순으로 추가해주세요.</h2>
              <SelectClubsList saveEachQuizInfo={saveEachQuizInfo} />
              {registed.length !== 0 ? (
                <span>
                  {registed.map((quiz, index) => {
                    return (
                      <div
                        key={index}
                        className="quiz_registed"
                        onMouseOver={() => handleMouseOver(index)}
                        onMouseLeave={() => handleMouseOut(index)}
                      >
                        <div>{quiz.answer}</div>
                        <div>{quiz.team}</div>
                        {hover[index] ? (
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              deletePlayerInfo(index);
                            }}
                          >
                            삭제
                          </button>
                        ) : (
                          <></>
                        )}
                      </div>
                    );
                  })}
                </span>
              ) : (
                <></>
              )}
              <br />
              <input ref={thumbnail} type="file" name="userfile" />
              <button onClick={handleType1Submit}>문제집 등록!</button>
            </div>
          ) : null}
          {type === "type2" ? (
            <div>
              <label>퀴즈 이름</label>
              <input ref={title} type="text" placeholder="제목을 적어주세요" />
              <label>퀴즈 룰 설명</label>
              <input
                ref={explain}
                type="text"
                placeholder="필요한 퀴즈 설명을 적어주세요"
              />
              <label>퀴즈 난이도 설정 (개발중)</label>
              {/* <SelectFormation /> */}
            </div>
          ) : null}
        </form>
      </div>
    </PlayerNameContext.Provider>
  );
};

export default CreateQuiz;
