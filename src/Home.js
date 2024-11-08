import React, { Component } from "react";

export class Home extends Component {
  render() {
    return (
      <div className="flex flex-col items-center ">
        <h3 className="mt-10 mb-10 text-3xl font-semibold">Home Page</h3>
        <p className="p-5 text-lg bg-slate-100">
          This is an Employee Management System, built with React for the
          frontend and ASP.NET Core for the backend. It helps manage employee
          information such as adding, updating, and removing employees, as well
          as handling their departments, salaries, and other details. The system
          is user-friendly and ensures smooth communication between the frontend
          and backend.
        </p>
        <img src="workplace.jpg" className="m-5 py-10 w-[400px] h-full" />
      </div>
    );
  }
}
