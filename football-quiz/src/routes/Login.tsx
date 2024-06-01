const Login: React.FC = () => {
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const username = formData.get("username");
    const password = formData.get("password");

    const response = await fetch("http://localhost:3001/login_process", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    console.log(response.json());
  };

  return (
    <>
      <h1>Sign in</h1>
      <form onSubmit={handleLogin} method="post">
        <section>
          <label htmlFor="username">Username</label>
          <input id="username" name="username" type="text" required />
        </section>
        <section>
          <label htmlFor="current-password">Password</label>
          <input
            id="current-password"
            name="password"
            type="password"
            required
          />
        </section>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
