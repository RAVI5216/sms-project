import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    let user = JSON.parse(localStorage.getItem("user"));

    if (user && email === user.email && password === user.password) {
      localStorage.setItem("loggedIn", true);
      navigate("/dashboard");
    } else {
      alert("Invalid Login");
    }
  }

  return (
    <div className="login-container">
      <div className="form-box">
        <h2>Welcome Back 👋</h2>

        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

        <button onClick={handleLogin}>Login</button>

        <p onClick={() => navigate("/register")} style={{cursor:"pointer"}}>
          Don't have account? Register
        </p>
      </div>
    </div>
  );
}

export default Login;