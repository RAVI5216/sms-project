import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleRegister() {
    if (!name || !email || !password) {
      alert("Fill all fields!");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ name, email, password }));
    alert("Registered Successfully!");
    navigate("/");
  }

  return (
    <div className="center-box">
      <h2>Register</h2>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleRegister}>Register</button>

      <a onClick={() => navigate("/")}>Already have account? Login</a>
    </div>
  );
}

export default Register;