import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/students")
      .then(res => setStudents(res.data));
  }, []);

  let courses = students.map(s => s.course);
  let uniqueCourses = [...new Set(courses)];

  return (
    <div className="container">

      <div className="sidebar">
        <h2>SMS Admin</h2>

        <button className="link-btn" onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button className="link-btn" onClick={() => navigate("/students")}>Students</button>
      </div>

      <div className="main">
        <h1>Dashboard 📊</h1>

        <div className="cards">
          <div className="card blue">
            <h4>Total Students</h4>
            <p>{students.length}</p>
          </div>

          <div className="card green">
            <h4>Total Courses</h4>
            <p>{uniqueCourses.length}</p>
          </div>
        </div>

        <h2>Recent Students</h2>

        <table>
          <tbody>
            {students.slice(-5).reverse().map((s) => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.course}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
}

export default Dashboard;