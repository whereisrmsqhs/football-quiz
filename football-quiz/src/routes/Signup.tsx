import { useReducer } from "react";

const initialState = {
  username: "",
  password: "",
  email: "",
  nickname: "",
  gender: "",
  birth: "",
  fan_team: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      return state;
  }
};

const Signup: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch({ type: "SET_FIELD", field: name, value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(state);
  };

  return (
    <>
      <h1>회원가입</h1>
      <form method="post">
        <section>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="아이디"
            required
          />
        </section>
        <section>
          <input
            id="current-password"
            name="password"
            type="password"
            placeholder="비밀번호"
            required
          />
        </section>
        <section>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="이메일주소"
            required
          />
        </section>
        <section>
          <input
            id="nickname"
            name="nickname"
            type="text"
            placeholder="닉네임"
            required
          />
        </section>
        <div id="sex">
          <ul>
            <li className="radio_item">
              <input type="radio" id="identityGender1"></input>
              <label htmlFor="identityGender1">남자</label>
            </li>
            <li className="radio_item">
              <input type="radio" id="identityGender2"></input>
              <label htmlFor="identityGender2">여자</label>
            </li>
          </ul>
        </div>
        <section>
          <input
            id="birth"
            name="birth"
            type="text"
            placeholder="생년월일 8자리"
            required
          />
        </section>
        <section>
          <input
            id="fan_team"
            name="fan_team"
            type="text"
            placeholder="선호 축구 클럽"
            required
          />
        </section>
        <button type="submit">인증요청</button>
      </form>
    </>
  );
};

export default Signup;
