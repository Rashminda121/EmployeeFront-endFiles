import React, { Component } from "react";
import { variables } from "./Variables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

export class Employee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
      departments: [],
      modalTitle: "",
      EmployeeId: "",
      FirstName: "",
      LastName: "",
      Email: "",
      Dob: "",
      Age: "",
      Salary: "",
      Department: "",
      isModalOpen: false, // Added state to control modal visibility
    };
  }

  refreshList() {
    fetch(variables.API_URL + "employee")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ employees: data });
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });

    fetch(variables.API_URL + "department")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ departments: data });
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  changeFirstName = (e) => {
    this.setState({ FirstName: e.target.value });
  };
  changeLastName = (e) => {
    this.setState({ LastName: e.target.value });
  };
  changeEmail = (e) => {
    this.setState({ Email: e.target.value });
  };

  changeDob = (e) => {
    const dob = new Date(e.target.value); // Convert date of birth to Date object
    const age = Math.floor(
      (Date.now() - dob.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
    ); // Calculate age in years
    this.setState({ Dob: e.target.value, Age: age });
  };

  changeSalary = (e) => {
    const salary = parseFloat(e.target.value).toFixed(2);
    this.setState({ Salary: salary });
  };

  changeDepartment = (e) => {
    this.setState({ Department: e.target.value });
  };

  addClick() {
    this.setState({
      modalTitle: "Add Employee",
      EmployeeId: 0,
      FirstName: "",
      LastName: "",
      Email: "",
      Dob: "",
      Age: "",
      Salary: "",
      Department: "",
      isModalOpen: true, // Show modal on Add
    });
  }

  editClick(emp) {
    const dob = new Date(emp.dob); // Convert date of birth to Date object
    const age = Math.floor(
      (Date.now() - dob.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
    );
    this.setState({
      modalTitle: "Edit Employee",

      EmployeeId: emp.empId,
      FirstName: emp.empFirstName,
      LastName: emp.empLastName,
      Email: emp.email,
      Dob: emp.dob,
      Age: age,
      Salary: emp.salary,
      Department: emp.department,

      isModalOpen: true, // Show modal on Edit
    });
  }

  createClick() {
    const salary = parseFloat(this.state.Salary);
    if (
      (this.state.Email.includes("@") &&
        this.state.FirstName &&
        this.state.LastName &&
        this.state.Dob &&
        isNaN(salary)) ||
      (salary <= 0 && this.state.Department)
    ) {
      fetch(variables.API_URL + "employee", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          FirstName: this.state.FirstName,
          LastName: this.state.LastName,
          Email: this.state.Email,
          Dob: this.state.Dob,
          Age: this.state.Age,
          Salary: this.state.Salary,
          Department: this.state.Department,
        }),
      }).then((res) =>
        res.json().then(
          (result) => {
            alert(result);
            this.refreshList();
          },
          (error) => {
            alert("Failed");
          }
        )
      );
      this.setState({ isModalOpen: false });
    } else {
      alert("Missing Fields or Invalid data!");
    }
  }

  updateClick() {
    const salary = parseFloat(this.state.Salary);
    if (
      (this.state.Email.includes("@") &&
        this.state.FirstName &&
        this.state.LastName &&
        this.state.Dob &&
        isNaN(salary)) ||
      (salary <= 0 && this.state.Department)
    ) {
      fetch(variables.API_URL + "employee", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          EmployeeId: this.state.EmployeeId,
          FirstName: this.state.FirstName,
          LastName: this.state.LastName,
          Email: this.state.Email,
          Dob: this.state.Dob,
          Age: this.state.Age,
          Salary: this.state.Salary,
          Department: this.state.Department,
        }),
      }).then((res) =>
        res.json().then(
          (result) => {
            alert(result);
            this.refreshList();
          },
          (error) => {
            alert("Failed");
          }
        )
      );
      this.setState({ isModalOpen: false });
    } else {
      alert("Missing Fields or Invalid data!");
    }
  }

  deleteClick(id) {
    if (window.confirm("Are You Surre?")) {
      fetch(variables.API_URL + "employee/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then((res) =>
        res.json().then(
          (result) => {
            alert(result);
            this.refreshList();
          },
          (error) => {
            alert("Failed");
          }
        )
      );
      this.setState({ isModalOpen: false });
    }
  }

  closeModal = () => {
    this.setState({ isModalOpen: false }); // Close modal
  };

  render() {
    const {
      employees,
      departments,
      modalTitle,
      EmployeeId,
      FirstName,
      LastName,
      Email,
      Dob,
      Age,
      Salary,
      Department,
      isModalOpen,
    } = this.state;
    return (
      <div className="mb-10">
        <h3 className="p-5 text-xl font-semibold">This is Employee Page</h3>

        <button
          type="button"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg m-2 float-right hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => this.addClick()}
        >
          Add Employee
        </button>

        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead className="text-center">
            <tr className="bg-blue-200">
              <th className="px-6 py-3 text-md font-medium text-gray-600">
                Employee Id
              </th>
              <th className="px-6 py-3 text-md font-medium text-gray-600">
                First Name
              </th>
              <th className="px-6 py-3 text-md font-medium text-gray-600">
                Last Name
              </th>
              <th className="px-6 py-3 text-md font-medium text-gray-600">
                Email
              </th>
              <th className="px-6 py-3 text-md font-medium text-gray-600">
                Dob
              </th>
              <th className="px-6 py-3 text-md font-medium text-gray-600">
                Age
              </th>
              <th className="px-6 py-3 text-md font-medium text-gray-600">
                Salary(Rs)
              </th>
              <th className="px-6 py-3 text-md font-medium text-gray-600">
                Department
              </th>
              <th className="px-6 py-3 text-md font-medium text-gray-600">
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.empId} className="border-t border-b border-gray-200">
                <td className="px-6 py-4 text-sm text-gray-700">{emp.empId}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {emp.empFirstName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {emp.empLastName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{emp.email}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{emp.dob}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{emp.age}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {parseFloat(emp.salary).toFixed(2)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {emp.department}
                </td>
                <td className="px-6 py-4">
                  <button
                    type="button"
                    onClick={() => this.editClick(emp)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-600 rounded px-3 py-1 mr-2 focus:outline-none"
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button
                    type="button"
                    onClick={() => this.deleteClick(emp.empId)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-600 rounded px-3 py-1 focus:outline-none"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
            <div className="bg-white rounded-lg w-full max-w-xl md:max-w-2xl max-h-[300px] md:max-h-[500px] mx-4 overflow-scroll">
              <div className="modal-content">
                <div className="modal-header flex justify-between items-center p-4 border-b border-gray-300">
                  <h5 className="text-xl font-semibold">{modalTitle}</h5>
                  <button
                    type="button"
                    className="text-gray-600 hover:text-gray-800 focus:outline-none"
                    onClick={this.closeModal} // Close modal
                  >
                    <span className="text-2xl">&times;</span>
                  </button>
                </div>
                <div className="modal-body p-4">
                  <div className="flex items-center mb-4">
                    <span className="text-gray-700 mr-2">First Name</span>
                    <input
                      type="text"
                      className="form-input py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={FirstName}
                      onChange={this.changeFirstName}
                    />
                  </div>
                </div>
                <div className="modal-body p-4">
                  <div className="flex items-center mb-4">
                    <span className="text-gray-700 mr-2">Last Name</span>
                    <input
                      type="text"
                      className="form-input py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={LastName}
                      onChange={this.changeLastName}
                    />
                  </div>
                </div>
                <div className="modal-body p-4">
                  <div className="flex items-center mb-4">
                    <span className="text-gray-700 mr-2">Email</span>
                    <input
                      type="email"
                      className="form-input py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={Email}
                      onChange={this.changeEmail}
                    />
                  </div>
                </div>
                <div className="modal-body p-4">
                  <div className="flex items-center mb-4">
                    <span className="text-gray-700 mr-2">Date of Birth</span>
                    <input
                      type="date"
                      className="form-input py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={Dob}
                      onChange={this.changeDob}
                    />
                  </div>
                </div>

                <div className="modal-body p-4">
                  <div className="flex items-center mb-4">
                    <span className="text-gray-700 mr-2">Salary</span>
                    <input
                      type="number"
                      className="form-input py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={parseFloat(Salary).toFixed(2)}
                      onChange={this.changeSalary}
                    />
                  </div>
                </div>
                <div className="modal-body p-4">
                  <div className="flex items-center mb-4">
                    <span className="text-gray-700 mr-2">Department</span>
                    <select
                      className="form-input py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      onChange={this.changeDepartment}
                      value={Department}
                    >
                      {departments.map((dep) => (
                        <option key={dep.depId} value={dep.depName}>
                          {dep.depName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="modal-footer flex justify-end p-4 border-t border-gray-300">
                  {EmployeeId === 0 ? (
                    <button
                      type="button"
                      onClick={() => this.createClick()}
                      className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Create
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => this.updateClick()}
                      className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Update
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
