import React, { useState } from "react";
import Select, { StylesConfig } from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

interface Option {
  value: string;
  label: string;
}

const RaiseAccessRequest: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Option | null>(null);
  const [selectedModule, setSelectedModule] = useState<Option | null>(null);
  const [selectedAccessRole, setSelectedAccessRole] = useState<Option | null>(
    null
  );
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (/^\d*$/.test(input) && input.length <= 10) {
      setContact(input);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  const handleSubmit = () => {
    const formData = {
      selectedProject,
      selectedModule,
      selectedAccessRole,
      contact,
      description,
    };
    console.log(formData);
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
  ];

  const customStyles: StylesConfig<Option, false> = {
    control: (provided) => ({
      ...provided,
      width: "100%",
    }),
  };

  // Mock data for dropdowns, replace with actual data fetching logic
  const projects: Option[] = [{ value: "project1", label: "Project 1" }];
  const moduleOptions: Option[] = [{ value: "module1", label: "Module 1" }];
  const accessRoles: Option[] = [{ value: "role1", label: "Role 1" }];

  return (
    <div className="flex flex-col min-h-screen font-[fangsong]">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex-grow flex">
        {showSidebar && <Sidebar />}
        <div className="flex-grow bg-gray-100 p-4 flex flex-col">
          <div className="box flex-grow overflow-y-auto">
            <h1 className="text-blue-500 font-semibold text-3xl text-center mb-4">
              Raise a New Access Request
            </h1>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="w-full flex flex-col sm:flex-row sm:items-end mb-4">
                <div className="w-full sm:w-1/2 mr-0 sm:mr-4 mb-4 sm:mb-0">
                  <label htmlFor="project" className="block mb-1">
                    Project<span className="text-red-500">*</span>:
                  </label>
                  <Select<Option, false>
                    id="project"
                    value={selectedProject}
                    onChange={(option) => setSelectedProject(option)}
                    options={projects}
                    placeholder="--Search a project--"
                    styles={customStyles}
                  />
                </div>
                <div className="w-full sm:w-1/2">
                  <label htmlFor="module" className="block mb-1">
                    Module<span className="text-red-500">*</span>:
                  </label>
                  <Select<Option, false>
                    id="module"
                    value={selectedModule}
                    onChange={(option) => setSelectedModule(option)}
                    options={moduleOptions}
                    placeholder="--Search a module--"
                    styles={customStyles}
                  />
                </div>
              </div>

              <div className="w-full flex flex-col sm:flex-row sm:items-end mb-4">
                <div className="w-full sm:w-1/2 mr-0 sm:mr-4 mb-4 sm:mb-0">
                  <label htmlFor="accessRole" className="block mb-1">
                    Access Role<span className="text-red-500">*</span>:
                  </label>
                  <Select<Option, false>
                    id="accessRole"
                    value={selectedAccessRole}
                    onChange={(option) => setSelectedAccessRole(option)}
                    options={accessRoles}
                    placeholder="--Search an access role--"
                    styles={customStyles}
                  />
                </div>
                <div className="w-full sm:w-1/2">
                  <label htmlFor="contact" className="block mb-1">
                    Contact<span className="text-red-500">*</span>:
                  </label>
                  <input
                    type="text"
                    id="contact"
                    value={contact}
                    onChange={handleContactChange}
                    placeholder="Enter Contact Number"
                    className="border-gray-300 border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="w-full mt-2 mb-1">
                <label htmlFor="description" className="block mb-1">
                  Access Request Description
                  <span className="text-red-500">*</span>:{" "}
                  <span className="text-blue-500 text-xs">
                    Details on the reason(s) for raising request
                  </span>
                </label>
                <ReactQuill
                  value={description}
                  onChange={setDescription}
                  modules={quillModules}
                  formats={quillFormats}
                  className="bg-white"
                />
              </div>
              <div className="w-full mt-1 mb-1">
                <label htmlFor="uploadFile" className="block mb-1">
                  Upload File:
                </label>
                <input
                  type="file"
                  id="uploadFile"
                  onChange={handleFileChange}
                  className="border-gray-300 border bg-white rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-center mt-1">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-6 py-2 mr-4 rounded"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold px-6 py-2 rounded"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-0 left-0 w-full bg-gray-200 border-t border-gray-300 flex justify-between items-center px-4 py-2">
        <div className="text-sm">
          <div className="font-[fangsong]">
            Copyright &copy; 2024{" "}
            <a
              href="https://www.tatamotors.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-semibold cursor-pointer"
            >
              Tata Motors Limited.
            </a>{" "}
            All Rights Reserved.
            <p className="text-xs">Use Chrome OR Firefox for a better view.</p>
          </div>
        </div>
        <div className="text-sm font-[fangsong]">Version 2.0</div>
      </div>
    </div>
  );
};

export default RaiseAccessRequest;
