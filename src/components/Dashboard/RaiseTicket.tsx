import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { LoginContext } from "../../LoginContext";

interface Option {
  value: string;
  label: string;
}

const RaiseTicket: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Option | null>(null);
  const [filteredModules, setFilteredModules] = useState<Option[]>([]);
  const [selectedModule, setSelectedModule] = useState<Option | null>(null);
  const [filteredCategories, setFilteredCategories] = useState<Option[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Option | null>(null);
  const [contact, setContact] = useState("");
  const [employees, setEmployees] = useState<Option[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Option | null>(null);
  const [issueTitle, setIssueTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projects, setProjects] = useState<Option[]>([]);
  const [contactError, setContactError] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  const navigate = useNavigate();

  const { user } = useContext(LoginContext);
  const { user_id, user_name, user_email, location, comp_name } = user;



  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/employees");
        setEmployees(
          response.data.map((userName: string) => ({
            value: userName,
            label: userName,
          }))
        );
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

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
      setSelectedCategory(null);
    } else {
      setFilteredModules([]);
      setSelectedModule(null);
      setSelectedCategory(null);
    }
  }, [selectedProject]);

  const fetchCategories = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/categories",
        {
          moduleName: selectedModule?.value,
        }
      );
      setFilteredCategories(
        response.data.map((categoryName: any) => ({
          value: categoryName.cat_name,
          label: categoryName.cat_name,
        }))
      );
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    if (selectedModule) {
      fetchCategories();
      setFilteredCategories([]);
      setSelectedCategory(null);
    } else {
      setFilteredCategories([]);
      setSelectedCategory(null);
    }
  }, [selectedModule]);

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      width: "50vh",
    }),
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (/^\d*$/.test(input) && input.length <= 10) {
      setContact(input);
    }
  };

  const modules = {
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

  const formats = [
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

  const debouncedOnChange = _.debounce((event: any, editor: any) => {
    const data = editor.getData();
    setDescription(data);
  }, 500);

  const handleSubmit = async () => {
    const contactRegex = /^\d{10}$/;
    if (
      !selectedProject ||
      !selectedModule ||
      !selectedCategory ||
      !contact ||
      !issueTitle ||
      !description
    ) {
      alert("Please fill in all compulsory fields marked with *");
      return;
    }

    if (!contactRegex.test(contact)) {
      setContactError("Contact number must be 10 digits");
      return;
    } else {
      setContactError("");
    }

    const issuerUserId = user_id;
    const projectId = selectedProject.value;
    const moduleId = selectedModule.value;
    const categoryId = selectedCategory.value;
    const contactNo = contact;
    const issueSubject = issueTitle;
    const issueDesc = description;
    const createdBy = user_id;
    const raiserName = user_name;
    const raiserEmail = user_email;
    const onBehalfName = selectedEmployee ? selectedEmployee.value : null;
    const locnName = location;
    const companyName = comp_name;

    let imageFileName = null ;

    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await axios.post('http://localhost:5000/Uploads', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        imageFileName = response.data.filename;

        console.log('File uploaded successfully:', response.data);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }


    try {
      const response = await axios.post("http://localhost:5000/submit", {
        issuerUserId,
        projectId,
        moduleId,
        categoryId,
        contactNo,
        issueSubject,
        issueDesc,
        createdBy,
        raiserName,
        raiserEmail,
        onBehalfName,
        locnName,
        companyName,
        imageFileName,
      });
 
      alert("Ticket Raised Successfully, Thank You!")
      navigate("/dashboard");
    } catch (error) {
      alert("Error Submitting Ticket")
      console.error("Error submitting ticket:", error);  
    }
  };

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
     
    } else {
      setSelectedFile(null);
  
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-[fangsong]">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex-grow flex">
        {showSidebar && <Sidebar />}
        <div className="flex-grow bg-gray-100 p-4 flex flex-col">
          <div className="box flex-grow overflow-y-auto">
            <h1 className="text-blue-500 font-semibold text-3xl text-center mb-4">
              Raise a New Ticket
            </h1>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="w-full sm:w-auto mb-4 p- sm:mb-0">
                <label htmlFor="behalf" className="block mb-1">
                  On Behalf:
                </label>
                <Select
                  value={selectedEmployee}
                  onChange={(option: Option | null) =>
                    setSelectedEmployee(option)
                  }
                  options={employees}
                  placeholder="--Select an employee--"
                  styles={customStyles}
                />
              </div>
              <div className="w-full sm:w-auto mb-4 sm:mb-0 flex">
                <div className="mr-4">
                  <label htmlFor="project" className="block mb-1">
                    Project<span className="text-red-500">*</span>:
                  </label>
                  <Select
                    value={selectedProject}
                    onChange={(option: Option | null) =>
                      setSelectedProject(option)
                    }
                    options={projects}
                    placeholder="--Search a project--"
                    styles={customStyles}
                  />
                </div>
                <div className="mr-4">
                  <label htmlFor="module" className="block mb-1">
                    Module<span className="text-red-500">*</span>:
                  </label>
                  <Select
                    value={selectedModule}
                    onChange={(option: Option | null) =>
                      setSelectedModule(option)
                    }
                    options={filteredModules}
                    placeholder="--Search a module--"
                    styles={customStyles}
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block mb-1">
                    Category<span className="text-red-500">*</span>:
                  </label>
                  <Select
                    value={selectedCategory}
                    onChange={(option: Option | null) =>
                      setSelectedCategory(option)
                    }
                    options={filteredCategories}
                    placeholder="--Search a category--"
                    styles={customStyles}
                  />
                </div>
              </div>
              <div className="w-full px-1 mb-4 sm:mb-0">
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
              <div className="w-full mb-4 px-1 sm:mb-0">
                <label htmlFor="issueTitle" className="block mb-1">
                  Issue Title<span className="text-red-500">*</span>:
                </label>
                <input
                  type="text"
                  id="issueTitle"
                  value={issueTitle}
                  onChange={(e) => setIssueTitle(e.target.value)}
                  placeholder="Enter Issue Title"
                  className="border-gray-300 border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:border-blue-500"
                />
              </div>
              <div className="w-full mt-2 mb-1">
                <label htmlFor="description" className="block mb-1">
                  Description<span className="text-red-500">*</span>:
                </label>
                <ReactQuill
                  value={description}
                  onChange={setDescription}
                  modules={modules}
                  formats={formats}
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
                   className="border-gray-300 border bg-white rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:border-blue-500"
                   onChange={handleImage}
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
export default RaiseTicket;
