import { useState } from "react";

type Regist = (club: string, id: number) => void;

interface Props {
  selectId: number;
  registClub: Regist;
}

const SelectClub: React.FC<Props> = ({ selectId, registClub }) => {
  const [team, setTeam] = useState<string>("");
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTeam(event?.target.value);
    registClub(event.target.value, selectId);
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
        <option value="Barcelona">바르셀로나</option>
        <option value="ParisSaintGermain">PSG</option>
        <option value="Miami">인터 마이애미</option>
      </select>
    </div>
  );
};

export default SelectClub;
