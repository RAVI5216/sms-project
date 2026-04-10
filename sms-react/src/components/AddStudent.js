import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function AddStudent() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");

  async function handleSave() {
    if (!name || !roll || !course || !email) {
      alert("Fill all fields!");
      return;
    }

    await axios.post("http://localhost:5000/addStudent", {
      name,
      roll,
      course,
      email
    });

    alert("Student Added!");
    navigate("/students");
  }

  return (
    <div className="login-container">
      <div className="form-box">
        <h2>Add Student 🎓</h2>

        <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input placeholder="Roll" onChange={(e) => setRoll(e.target.value)} />
        <input placeholder="Course" onChange={(e) => setCourse(e.target.value)} />
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default AddStudent;