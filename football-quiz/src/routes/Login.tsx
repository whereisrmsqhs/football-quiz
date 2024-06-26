import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);
      const username = formData.get("username");
      const password = formData.get("password");

      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
        navigate("/");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <h1>로그인</h1>
      <form onSubmit={handleLogin} method="post">
        <section>
          <label htmlFor="username">아이디</label>
          <input id="username" name="username" type="text" required />
        </section>
        <section>
          <label htmlFor="current-password">비밀번호</label>
          <input
            id="current-password"
            name="password"
            type="password"
            required
          />
        </section>
        <button type="submit">로그인</button>
      </form>
    </>
  );
};

export default Login;
