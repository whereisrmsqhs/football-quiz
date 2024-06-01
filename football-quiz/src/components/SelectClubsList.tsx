import { ChangeEvent, useState } from "react";
import SelectClubs from "./SelectClubs";
import { eachQuizInfo } from "../routes/CreateQuiz";
import "../css/selectclubslist.scss";
import DropDown from "./DropDown";

type saveInfo = {
  saveEachQuizInfo: (teams: string[], answer: string) => void;
};

const SelectClubsList: React.FC<saveInfo> = ({ saveEachQuizInfo }) => {
  const [selectId, setSelectId] = useState<number>(0);
  // const [registedClub, setRegistedClub] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [teams, setTeams] = useState<string[]>([]);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [formSubmit, setFormSubmit] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const answerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
  };

  const [selectClubs, setSelectClubs] = useState<any[]>([
    <SelectClubs selectId={selectId} setTeams={setTeams} />,
  ]);
  const onClubAdd = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    setSelectClubs(
      selectClubs.concat(
        <SelectClubs selectId={selectId + 1} setTeams={setTeams} />
      )
    );
    setSelectId(selectId + 1);
  };
  const onClubDelete = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    setSelectId(selectId - 1);
    setTeams((prev) => {
      const next = [...prev];
      next.pop();
      return next;
    });
    if (selectClubs.length >= 2) {
      setSelectClubs((prev) => {
        const next = [...prev];
        next.pop();
        return next;
      });
    }
  };
  const handleUserInput = (event: ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(event.target.value);
  };
  const handleFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFocus(true);
  };
  const handleBlur = () => {
    setIsFocus(false);
  };

  return (
    <div>
      {selectClubs}
      <button onClick={onClubAdd}>클럽 추가</button>
      <button onClick={onClubDelete}>클럽 삭제</button>
      <div>
        {/* input대신에 DropDown 기능이 추가해야됨 */}
        <DropDown
          userAnswer={answer}
          setUserAnswer={setUserAnswer}
          handleUserInput={answerChange}
          formSubmit={formSubmit}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          isFocus={isFocus}
        />
      </div>
      <button
        onClick={(event) => {
          event.preventDefault();
          saveEachQuizInfo(teams, answer);
          setSelectClubs([]);
          setTeams([]);
          setAnswer("");
          setSelectId(-1);
        }}
      >
        문제 등록
      </button>
    </div>
  );
};

export default SelectClubsList;
