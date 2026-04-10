import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Students() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/students")
      .then(res => setStudents(res.data));
  }, []);

  async function deleteStudent(id) {
    await axios.delete(`http://localhost:5000/delete/${id}`);
    setStudents(prev => prev.filter(s => s._id !== id));
  }

  return (
    <div className="container">

      <div className="sidebar">
        <h2>SMS Admin</h2>

        <button className="link-btn" onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button className="link-btn" onClick={() => navigate("/add")}>Add Student</button>
      </div>

      <div className="main">
        <h1>Students 👨‍🎓</h1>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll</th>
              <th>Course</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.roll}</td>
                <td>{s.course}</td>
                <td>{s.email}</td>
                <td>
                  <button className="action-btn delete" onClick={() => deleteStudent(s._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}

export default Students;