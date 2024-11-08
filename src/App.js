import "./App.css";

import { Home } from "./Home";
import { Department } from "./Department";
import { Employee } from "./Employee";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App container mx-auto px-5">
        <h3 className="flex justify-center m-5 text-2xl font-semibold text-blue-800">
          Employee Management System
        </h3>

        <nav className="bg-gray-100 dark:bg-gray-100 p-5">
          <ul className="flex space-x-4">
            <li className="m-1">
              <NavLink
                className="px-4 py-2 text-blue-600 bg-white border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition"
                to="/home"
              >
                Home
              </NavLink>
            </li>
            <li className="m-1">
              <NavLink
                className="px-4 py-2 text-blue-600 bg-white border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition"
                to="/department"
              >
                Department
              </NavLink>
            </li>
            <li className="m-1">
              <NavLink
                className="px-4 py-2 text-blue-600 bg-white border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition"
                to="/employee"
              >
                Employee
              </NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/department" element={<Department />} />
          <Route path="/employee" element={<Employee />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
