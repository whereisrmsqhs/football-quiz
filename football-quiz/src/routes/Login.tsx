import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserid(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(userid);

    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: userid, password: password }),
      credentials: "include",
    });

    const data = await response.json();

    console.log(data);
    alert("로그인 성공!");
    login();

    navigate("/");
  };

  console.log(userid);

  return (
    <>
      <h1>로그인</h1>
      <form onSubmit={handleLogin} method="post">
        <section>
          <label htmlFor="username">아이디</label>
          <input
            id="username"
            name="username"
            type="text"
            value={userid}
            onChange={handleId}
            required
          />
        </section>
        <section>
          <label htmlFor="current-password">비밀번호</label>
          <input
            id="current-password"
            name="password"
            type="password"
            value={password}
            onChange={handlePassword}
            required
          />
        </section>
        <button type="submit">로그인</button>
      </form>
    </>
  );
};

export default Login;
