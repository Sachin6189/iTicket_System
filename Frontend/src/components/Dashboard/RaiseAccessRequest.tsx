import React, { useState,useEffect } from "react";
import Select, { StylesConfig } from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Option {
  value: string;
  label: string;
}

const RaiseAccessRequest: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Option | null>(null);
  const [projects, setProjects] = useState<Option[]>([]);
  const [filteredModules, setFilteredModules] = useState<Option[]>([]);
  const [selectedModule, setSelectedModule] = useState<Option | null>(null);
  const [filteredAccess, setFilteredAccess] = useState<Option[]>([]);
  const [selectedAccess, setSelectedAccess] = useState<Option | null>(null);
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

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/projects");
      setProjects(
        response.data.map((project: any) => ({
          value: project.proj_name,
          label: project.proj_name,
        }))
      );
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchModules = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/modules", {
        projectName: selectedProject?.value,
      });

      setFilteredModules(
        response.data.map((moduleName: any) => ({
          value: moduleName.mod_name,
          label: moduleName.mod_name,
        }))
      );
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  };

  useEffect(() => {
    if (selectedProject) {
      fetchModules();
      setFilteredModules([]);
      setSelectedModule(null);
      setSelectedAccess(null);
    } else {
      setFilteredModules([]);
      setSelectedModule(null);
      setSelectedAccess(null);
    }
  }, [selectedProject]);

  const fetchAccess = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/access",
        {
          moduleName: selectedModule?.value,
        }
      );
      setFilteredAccess(
        response.data.map((AccessName: any) => ({
          value: AccessName.access_name,
          label: AccessName.access_name,
          }))
          );
        // console.log(response)
    } catch (error) {
      console.error("Error fetching access role:", error);
    }
  };

  useEffect(() => {
    if (selectedModule) {
      fetchAccess();
      setFilteredAccess([]);
      setSelectedAccess(null);
    } else {
      setFilteredAccess([]);
      setSelectedAccess(null);
    }
  }, [selectedModule]);

  const handleSubmit = () => {
    
    if (
      !selectedProject ||
      !selectedModule ||
      !selectedAccess ||
      !contact ||
      !description
    ) {
      alert("Please fill in all compulsory fields marked with *");
      return;
    }

    const formData = {
      selectedProject,
      selectedModule,
      selectedAccess,
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
                    options={filteredModules}
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
                    value={selectedAccess}
                    onChange={(option) => setSelectedAccess(option)}
                    options={filteredAccess}
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
