import React, { Component } from "react";
import { variables } from "./Variables";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

export class Department extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departments: [],
      modalTitle: "",
      DepartmentId: "",
      DepartmentName: "",
      isModalOpen: false, // Added state to control modal visibility
    };
  }

  refreshList() {
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

  changeDepartmentName = (e) => {
    this.setState({ DepartmentName: e.target.value });
  };

  addClick() {
    this.setState({
      modalTitle: "Add Department",
      DepartmentId: 0,
      DepartmentName: "",
      isModalOpen: true, // Show modal on Add
    });
  }

  editClick(dep) {
    this.setState({
      modalTitle: "Edit Department",
      DepartmentId: dep.depId,
      DepartmentName: dep.depName,
      isModalOpen: true, // Show modal on Edit
    });
  }

  createClick() {
    fetch(variables.API_URL + "department", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        DepartmentName: this.state.DepartmentName,
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
  }

  updateClick() {
    fetch(variables.API_URL + "department", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        DepartmentId: this.state.DepartmentId,
        DepartmentName: this.state.DepartmentName,
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
  }

  deleteClick(id) {
    if (window.confirm("Are You Surre?")) {
      fetch(variables.API_URL + "department/" + id, {
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
      departments,
      modalTitle,
      DepartmentId,
      DepartmentName,
      isModalOpen,
    } = this.state;
    return (
      <div className="mb-10">
        <h3 className="p-5 text-xl font-semibold">This is Department Page</h3>

        <button
          type="button"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg m-2 float-right hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => this.addClick()}
        >
          Add Department
        </button>

        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead className="text-center">
            <tr className="bg-blue-200">
              <th className="px-6 py-3 text-md font-medium text-gray-600">
                Department Id
              </th>
              <th className="px-6 py-3 text-md font-medium text-gray-600">
                Department Name
              </th>
              <th className="px-6 py-3 text-md font-medium text-gray-600">
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dep) => (
              <tr key={dep.depId} className="border-t border-b border-gray-200">
                <td className="px-6 py-4 text-sm text-gray-700">{dep.depId}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {dep.depName}
                </td>
                <td className="px-6 py-4">
                  <button
                    type="button"
                    onClick={() => this.editClick(dep)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-600 rounded px-3 py-1 mr-2 focus:outline-none"
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button
                    type="button"
                    onClick={() => this.deleteClick(dep.depId)}
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
                    <span className="text-gray-700 mr-2">Department Name</span>
                    <input
                      type="text"
                      className="form-input py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={DepartmentName}
                      onChange={this.changeDepartmentName}
                    />
                  </div>
                </div>
                <div className="modal-footer flex justify-end p-4 border-t border-gray-300">
                  {DepartmentId === 0 ? (
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
