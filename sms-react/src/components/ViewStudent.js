import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ViewStudent() {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("viewStudent"));
    setStudent(data);
  }, []);

  if (!student) return <h2 style={{textAlign:"center"}}>No Data Found</h2>;

  return (
    <div className="login-container">
      <div className="form-box">
        <h2>Student Details 🎓</h2>

        <p><b>Name:</b> {student.name}</p>
        <p><b>Roll:</b> {student.roll}</p>
        <p><b>Course:</b> {student.course}</p>
        <p><b>Email:</b> {student.email}</p>

        <button onClick={() => navigate("/students")}>
          ← Back
        </button>
      </div>
    </div>
  );
}

export default ViewStudent;