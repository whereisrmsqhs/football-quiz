import { useState } from "react";

interface Props {
  selectId: number;
  setTeams: React.Dispatch<React.SetStateAction<string[]>>;
}

const SelectClub: React.FC<Props> = ({ selectId, setTeams }) => {
  const [search, setSearch] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event?.target.value);
    setTeams((prev) => {
      prev[selectId] = event.target.value;
      console.log(prev);
      return prev;
    });
  };
  return (
    <div>
      <input
        type="text"
        list={`club_team${selectId}`}
        value={search}
        onChange={handleChange}
      />
      <datalist id={`club_team${selectId}`}>
        <option value="">클럽을 선택하세요</option>
        <option value="AFC Bournemouth">본머스</option>
        <option value="Arsenal">아스날</option>
        <option value="Aston Villa">아스톤 빌라</option>
        <option value="Brentford">브렌트포드</option>
        <option value="Brighton">브라이튼</option>
        <option value="Burnley">번리</option>
        <option value="Chelsea">첼시</option>
        <option value="Crystal Palace">크리스탈 팰리스</option>
        <option value="Everton">에버튼</option>
        <option value="Fulham">풀럼</option>
        <option value="Newcastle United">뉴캐슬</option>
        <option value="Norwich City">노리치 시티</option>
        <option value="Nottingham Forest">노팅엄 포레스트</option>
        <option value="Manchester City">맨체스터 시티</option>
        <option value="Manchester United">맨유</option>
        <option value="Luton Town">루턴 타운</option>
        <option value="Tottenham">토트넘</option>
        <option value="West Ham United">웨스트햄 유나이티드</option>
        <option value="Wolverhampton Wanderers">울버햄튼 원더러스</option>

        <option value="Coverntry">코번트리</option>
        <option value="Leicester">레스터 시티</option>
        <option value="Swansea City">스완지 시티</option>
        <option value="Southampton">사우스햄튼</option>
        <option value="Watford">왓포드</option>
        <option value="Bristol Rovers">브리스톨 로버스</option>
        <option value="Lincoln City">링컨 시티</option>
        {/* 독일 */}
        <option value="Augsburg">아우크스부르크</option>
        <option value="Bayern Munchen">바이에른 뮌헨</option>
        <option value="Hamburg">함부르크</option>
        <option value="Hoffenheim">호펜하임</option>
        <option value="Leverkesen">레버쿠젠</option>
        <option value="RB Leipzig">RB 라이프치히</option>
        <option value="VFB Stuttgart">VfB 슈투트가르트</option>
        <option value="VfL Wolfsburg">볼프스부르크</option>
        <option value="Schalke">샬케 04</option>
        {/* 스페인 */}
        <option value="Barcelona">바르셀로나</option>
        <option value="Girona">지로나</option>
        <option value="Real Betis">레알 베티스</option>
        <option value="Sevilla">세비야</option>
        <option value="Valencia">발렌시아</option>
        <option value="Villarreal">비야레알</option>
        <option value="Eibar">에이바르</option>
        <option value="Leganes">레가네스</option>
        <option value="Real Valladolid">레알 바야돌리드</option>
        {/* 이탈리아 */}
        <option value="Atlanta">아틀란타</option>
        <option value="Cagliari Calcio">칼리아리 칼초</option>
        <option value="Empoli">엠폴리</option>
        <option value="Genoa">제노아</option>
        <option value="Hellas Verona">엘라스 베로나</option>
        <option value="Juventus">유벤투스</option>
        <option value="Salernitana">살레르니타나 1919</option>
        <option value="Sampdoria">삼프도리아</option>
        <option value="Udinese">우디네세 칼초</option>
        <option value="Perugia Calcio">페루자 칼초</option>
        <option value="Parma Calcio">파르마 칼초</option>
        <option value="Venezia">베네치아</option>
        {/* 프랑스 */}
        <option value="FC Metz">메스</option>
        <option value="Lille">릴</option>
        <option value="ParisSaintGermain">PSG</option>
        <option value="Miami">인터 마이애미</option>
        {/* 브라질 리그 */}
        <option value="Atlético Mineiro">아틀레치쿠 미네이루</option>
        <option value="Fluminense">플루미넨시</option>
        <option value="Ponte Preta">폰치 프레타</option>
        {/* 스코틀랜드 리그 */}
        <option value="Celtic">셀틱</option>
        <option value="Aberdeen">애버딘</option>
        {/* 포루투갈 리그 */}
        <option value="Sporting">스포르팅</option>
        {/* 우쿠라이나 리그 */}
        <option value="Shakhtar Donetsk">샤흐타르 도네츠크</option>
        {/* 아르헨티나 리그 */}
        <option value="Boca Juniors">보카 주니어스</option>
        {/* 네덜란드 리그 */}
        <option value="Volendam">FC 폴렌담</option>
      </datalist>
    </div>
  );
};

export default SelectClub;
