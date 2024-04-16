import { ChangeEvent, useContext, useEffect, useState } from "react";
import { PlayerNameContext } from "../context/PlayerNameContext";
import "../css/dropdown.scss";

type HandleUserInput = (event: ChangeEvent<HTMLInputElement>) => void;
type HandleFocus = (event: ChangeEvent<HTMLInputElement>) => void;
type HandleBlur = () => void;

interface Props {
  userAnswer: string;
  setUserAnswer: React.Dispatch<React.SetStateAction<string>>;
  handleUserInput: HandleUserInput;
  formSubmit: boolean;
  handleFocus: HandleFocus;
  handleBlur: HandleBlur;
  isFocus: boolean;
}

const DropDown: React.FC<Props> = ({
  userAnswer,
  setUserAnswer,
  handleUserInput,
  formSubmit,
  handleFocus,
  handleBlur,
  isFocus,
}) => {
  const playerName = useContext(PlayerNameContext);
  const [candidates, setCandidates] = useState<string[]>([]);
  const [candidateIndex, setCandidateIndex] = useState<number | undefined>(
    undefined
  );
  useEffect(() => {
    if (userAnswer.length >= 1) {
      setCandidates(
        playerName.filter((name) => {
          return name.includes(userAnswer);
        })
      );
    }
  }, [userAnswer]);

  const selectCandidate = (key_type: string) => {
    let move = 0;
    if (key_type === "ArrowDown") {
      move = 1;
    } else if (key_type === "ArrowUp") {
      move = -1;
    }

    if (candidateIndex === undefined) {
      setCandidateIndex(0);
      return candidates[0];
    } else {
      if (candidateIndex + move >= candidates.length) {
        setCandidateIndex(0);
        return candidates[0];
      } else if (candidateIndex + move < 0) {
        setCandidateIndex(candidates.length - 1);
        return candidates[-1];
      }

      setCandidateIndex(candidateIndex + move);
      return candidates[candidateIndex + move];
    }
  };

  const handleArrow = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (candidates.length >= 1) {
      switch (event.key) {
        case "ArrowDown":
        case "ArrowUp":
          selectCandidate(event.key);
          break;
        case "Enter":
          if (candidateIndex !== undefined)
            setUserAnswer(candidates[candidateIndex]);
          setCandidateIndex(undefined);
          break;
      }
    }
  };
  return (
    <>
      <div className="input_container">
        <input
          value={userAnswer}
          onChange={handleUserInput}
          onKeyDown={handleArrow}
          type="text"
          placeholder="답안을 입력하세요"
          readOnly={formSubmit ? true : false}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required
        />
        {userAnswer !== "" ? (
          <>
            <ul className="candidates_list">
              {candidates.map((current, index) => (
                <li
                  key={index}
                  className={index === candidateIndex ? "selected" : ""}
                >
                  {current}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <></>
        )}
      </div>
      <button type="submit">제출</button>
    </>
  );
};

export default DropDown;
