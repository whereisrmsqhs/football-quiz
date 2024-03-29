import { useState } from "react";
import SelectClubs from "./SelectClubs";
import { eachQuizInfo } from "../routes/CreateQuiz";

type saveInfo = {
  saveEachQuizInfo: (registedClub: string, answer: string) => void;
};

const SelectClubsList: React.FC<saveInfo> = ({ saveEachQuizInfo }) => {
  const [selectId, setSelectId] = useState<number>(0);
  const [registedClub, setRegistedClub] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const answerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
  };
  const registClub = (selectedClub: string, id: number) => {
    setRegistedClub((prev) => {
      if (prev === "") {
        prev = selectedClub;
      } else {
        prev += `,${selectedClub}`;
      }
      return prev;
    });
  };
  const [selectClubs, setSelectClubs] = useState<any[]>([
    <SelectClubs selectId={selectId} registClub={registClub} />,
  ]);
  const onClubAdd = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    setSelectClubs(
      selectClubs.concat(
        <SelectClubs selectId={selectId + 1} registClub={registClub} />
      )
    );
    setSelectId(selectId + 1);
  };
  const onClubDelete = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    setSelectId(selectId - 1);
    if (selectClubs.length >= 2) {
      setSelectClubs((prev) => {
        const next = [...prev];
        next.pop();
        return next;
      });
    }
  };
  return (
    <div>
      {selectClubs}
      <button onClick={onClubAdd}>클럽 추가</button>
      <button onClick={onClubDelete}>클럽 삭제</button>
      <div>
        <input value={answer} onChange={answerChange} placeholder="정답" />
      </div>
      <button
        onClick={(event) => {
          event.preventDefault();
          saveEachQuizInfo(registedClub, answer);
          setRegistedClub("");
          setSelectClubs([]);
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
