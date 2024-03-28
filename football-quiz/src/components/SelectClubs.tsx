import { useState } from "react";

type Regist = (club: string) => void;

interface Props {
  selectId: number;
  registClub: Regist;
}

const SelectClub: React.FC<Props> = ({ selectId }) => {
  const [team, setTeam] = useState<string>("");
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTeam(event?.target.value);
  };
  return (
    <div>
      <select id={`club_team${selectId}`} value={team} onChange={handleSelect}>
        <option value="">클럽을 선택하세요</option>
        <option value="Hamburg">함부르크</option>
        <option value="Leverkesen">레버쿠젠</option>
        <option value="Tottenham">토트넘</option>
        <option value="Chelsea">첼시</option>
        <option value="Manchester United">맨유</option>
      </select>
    </div>
  );
};

export default SelectClub;
