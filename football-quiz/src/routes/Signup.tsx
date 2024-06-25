import { ChangeEvent, FormEvent, useReducer } from "react";
// FormState 타입 정의
interface FormState {
  username: string;
  id_check: boolean;
  password: string;
  password_check: string;
  email: string;
  nickname: string;
  gender: string;
  birth: string;
  fan_team: string;
}

// Action 타입 정의
type Action = { type: "SET_FIELD"; field: keyof FormState; value: string };

const initialState: FormState = {
  username: "",
  id_check: true,
  password: "",
  password_check: "",
  email: "",
  nickname: "",
  gender: "",
  birth: "",
  fan_team: "",
};

const reducer = (state: FormState, action: Action): FormState => {
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    dispatch({ type: "SET_FIELD", field: name as keyof FormState, value });
  };

  const isStateEmpty = (state: FormState): boolean => {
    for (let key in state) {
      if (state.hasOwnProperty(key)) {
        const value = state[key as keyof FormState];
        if (value === "") {
          return true;
        }
      }
    }
    return false;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(state);

    if (isStateEmpty(state)) {
      console.log("비어있는 정보가 있음");
      return;
    }

    const year = state.birth.slice(0, 4);
    const month = state.birth.slice(4, 6);
    const day = state.birth.slice(6, 8);

    state.birth = `${year}-${month}-${day}`;

    const response = await fetch("http://localhost:3001/signup_process", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ state }),
    });
    console.log(response.text());
  };

  const checkUserId = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/check_user_id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: state.username }),
      });
      console.log(response.json());
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit} method="post">
        <section>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="아이디"
            value={state.username}
            onChange={handleChange}
          />
        </section>
        <button onClick={checkUserId}>중복체크</button>
        <section>
          <input
            id="current-password"
            name="password"
            type="password"
            placeholder="비밀번호"
            value={state.password}
            onChange={handleChange}
          />
        </section>
        <section>
          <input
            id="current-password"
            name="password_check"
            type="password"
            placeholder="비밀번호 확인"
            value={state.password_check}
            onChange={handleChange}
          />
        </section>
        <section>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="이메일주소"
            value={state.email}
            onChange={handleChange}
          />
        </section>
        <section>
          <input
            id="nickname"
            name="nickname"
            type="text"
            placeholder="닉네임"
            value={state.nickname}
            onChange={handleChange}
          />
        </section>
        <div id="gender">
          <ul>
            <li className="radio_item">
              <input
                type="radio"
                id="identityGender1"
                name="gender"
                value="male"
                checked={state.gender === "male"}
                onChange={handleChange}
              ></input>
              <label htmlFor="identityGender1">남자</label>
            </li>
            <li className="radio_item">
              <input
                type="radio"
                id="identityGender2"
                name="gender"
                value="female"
                checked={state.gender === "female"}
                onChange={handleChange}
              ></input>
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
            value={state.birth}
            onChange={handleChange}
          />
        </section>
        <section>
          <input
            id="fan_team"
            name="fan_team"
            type="text"
            placeholder="선호 축구 클럽"
            value={state.fan_team}
            onChange={handleChange}
          />
        </section>
        <button type="submit">인증요청</button>
      </form>
    </>
  );
};

export default Signup;
