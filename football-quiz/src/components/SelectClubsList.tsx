import { useState } from "react";
import SelectClubs from "./SelectClubs";

const SelectClubsList: React.FC = () => {
  const [selectId, setSelectId] = useState<number>(1);
  const [registedClub, setRegistedClub] = useState<string[]>([]);
  const registClub = (selectedClub: string) => {
    setRegistedClub([...registedClub, selectedClub]);
  };
  const [selectClubs, setSelectClubs] = useState<any[]>([
    <SelectClubs selectId={selectId} onSelectChange={registClub} />,
  ]);
  const onClubAdd = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    setSelectId(selectId + 1);
    setSelectClubs(
      selectClubs.concat(
        <SelectClubs selectId={selectId} onSelectChange={registClub} />
      )
    );
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
        <input placeholder="정답" />
      </div>
    </div>
  );
};

export default SelectClubsList;
