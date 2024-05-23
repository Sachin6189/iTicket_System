import React from "react";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


const RaiseTicket = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const customStyles = {
    control: (provided : any) => ({
      ...provided,
      width: "50vh",
    }),
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

  return (
    <div className="flex flex-col min-h-screen font-[fangsong]">
      {/* <Navbar toggleSidebar={toggleSidebar} /> */}
      <div className="flex-grow flex">
        {/* {showSidebar && <Sidebar />} */}
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
                //   value={selectedEmployee}
                //   onChange={setSelectedEmployee}
                  options={options}
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
                    // value={selectedProject}
                    // onChange={setSelectedProject}
                    options={options}
                    placeholder="--Select a project--"
                    styles={customStyles}
                  />
                </div>
                <div className="mr-4">
                  <label htmlFor="module" className="block mb-1">
                    Module<span className="text-red-500">*</span>:
                  </label>
                  <Select
                    // value={selectedModule}
                    // onChange={setSelectedModule}
                    options={options}
                    placeholder="--Select a module--"
                    styles={customStyles}
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block mb-1">
                    Category<span className="text-red-500">*</span>:
                  </label>
                  <Select
                    // value={selectedCategory}
                    // onChange={setSelectedCategory}
                    options={options}
                    placeholder="--Select a category--"
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
                //   value={contact}
                //   onChange={handleContactChange}
                  placeholder="Enter Contact Number"
                  className="border-gray-300 border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:border-blue-500"
                />
                {/* {contactError && (
                  <p className="text-red-500 text-sm mt-1">{contactError}</p>
                )} */}
              </div>
              <div className="w-full mb-4 px-1 sm:mb-0">
                <label htmlFor="issueTitle" className="block mb-1">
                  Issue Title<span className="text-red-500">*</span>:
                </label>
                <input
                  type="text"
                  id="issueTitle"
                //   value={issueTitle}
                //   onChange={(e) => setIssueTitle(e.target.value)}
                  placeholder="Enter Issue Title"
                  className="border-gray-300 border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:border-blue-500"
                />
              </div>
              <div className="w-full mt-2 mb-1">
                <label htmlFor="description" className="block mb-1">
                  Description<span className="text-red-500">*</span>:
                </label>
                <ReactQuill
                //   value={description}
                //   onChange={setDescription}
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
                  className="border-gray-300 border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:border-blue-500"
                //   onChange={handleImageChange}
                />
              </div>
              <div className="flex justify-center mt-1">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-6 py-2 mr-4 rounded"
                //   onClick={handleSubmit}
                >
                  Submit
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold px-6 py-2 rounded"
                //   onClick={handleCancel}
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
