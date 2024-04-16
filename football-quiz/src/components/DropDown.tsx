import { useContext, useEffect, useState } from "react";
import { PlayerNameContext } from "../context/PlayerNameContext";
import "../css/dropdown.scss";

interface Props {
  userAnswer: string;
}

const DropDown: React.FC<Props> = ({ userAnswer }) => {
  const playerName = useContext(PlayerNameContext);
  const [candidates, setCandidates] = useState<string[]>([]);
  useEffect(() => {
    if (userAnswer.length >= 1) {
      setCandidates(
        playerName.filter((name) => {
          return name.includes(userAnswer);
        })
      );
    }
  }, [userAnswer]);
  return (
    <>
      <ul className="candidates_list">
        {candidates.map((current) => (
          <li>{current}</li>
        ))}
      </ul>
    </>
  );
};

export default DropDown;
