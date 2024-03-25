import "../css/home.scss";
import "./moving-sentence";

const Home: React.FC = () => {
  return (
    <div className="main">
      <div className="main__moving-sentences">
        <span>너가 진짜 xxx팬이라고???</span>
        <span>이번 시즌 챔스 우승은 누가할것 같은데?</span>
        <span>작년 발롱도르 위너가 누구였음?</span>
        <span>어제 손흥민 골 몇골 넣었는데?</span>
        <span>이번 시즌 가장 유망한 선수는?</span>
        <span>xx팀 감독이 누군데?</span>
        <span>초대 챔피언스리그 우승팀은?</span>
        <span>너가 감스트보다 모를것 같은데?</span>
        <span>여기 퀴즈 다 맞추면 인정!</span>
      </div>
      <div className="main__content">
        <div className="main__content__intro">
          <h1>"너가 그렇게 축구를 잘알어?"</h1>
          <div>부터 시작된 본격 축구 지식 겨루기 사이트</div>
          <div>진짜로 축구를 잘아는지 축덕력 레이더!</div>
          <div>잔말말고 그냥 해봐!</div>
        </div>
        <button className="main__content__solve">퀴즈풀기</button>
      </div>
    </div>
  );
};

export default Home;
