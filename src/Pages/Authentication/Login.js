import { useState } from 'react';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function loginUser() {
    try {
      const res = await fetch("http://localhost:10004/wp-json/jwt-auth/v1/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "/";
      } else {
        const plainMsg = data.message.replace(/<\/?[^>]+(>|$)/g, "");
        setMessage(plainMsg);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="App">
    <main className="App-main">
      <form className='login-form' onSubmit={(e) => {e.preventDefault(); loginUser()}}>
        {message && <p className='error-message'>{message}</p>}
        <label>
          Username:
          <input type="text" name="username" required value={username} onChange={((e) => setUsername(e.target.value))} />
        </label>
        <label>
          Password:
          <input type="password" name="password" required value={password} onChange={((e) => setPassword(e.target.value))} />
        </label>
        <button type="submit">Login</button>
      </form>
    </main>
  </div>
  );
}

export default Login;