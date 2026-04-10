import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import AddStudent from "./components/AddStudent";
import Students from "./components/Students";
import ViewStudent from "./components/ViewStudent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<AddStudent />} />
        <Route path="/students" element={<Students />} />
        <Route path="/view" element={<ViewStudent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;