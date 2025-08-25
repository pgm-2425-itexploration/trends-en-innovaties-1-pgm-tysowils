import { useState } from 'react';

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function registerUser() {
    try {
      const res = await fetch("http://localhost:10004/wp-json/wp/v2/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      if (data.id) {
        window.location.href = "/login";
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
      <form className='login-form' onSubmit={(e) => { e.preventDefault(); registerUser()}}>
        {message && <p className='error-message'>{message}</p>}
        <label>
          Username:
          <input type="text" name="username" required value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Register</button>
      </form>
    </main>
    </div>
  );
}

export default Register;