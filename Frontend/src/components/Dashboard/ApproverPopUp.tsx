import React from 'react'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import close from "../assets/close.gif"

const ApproverPopUp = () => {

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
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-70">
    <div className="bg-white p-8 rounded-lg relative w-full max-w-3xl h-auto max-h-screen overflow-y-auto">
      <div className="bg-gray-800 rounded-lg px-4 py-2 mb-4 flex justify-between items-center">
        <div className="text-white font-bold ">
          Ticket ID:{" "}
          {/* <span className="font-semibold"> {ticket.ticket_id}</span> */}
        </div>
        <button className="px-3 py-1 text-white rounded-md" 
        // onClick={onClose}
        >
          <div className="h-5 w-5">
            <img src={close} alt="" />
          </div>
        </button>
      </div>
      <div className="bg-gray-200 rounded-lg px-4 py-2 mb-4">
        <p className="font-bold mb-2">
          Issue Title:{" "}
          {/* <span className="text-gray-600 "> {ticket.issue_title}</span> */}
        </p>
        <p className="mb-2 font-bold">
          Project:{" "}
          <span className="font-semibold text-gray-600">
            {" "}
            {/* {ticket.project_name} */}
          </span>
        </p>
        <p className="mb-2 font-bold">
          Module:{" "}
          <span className="font-semibold text-gray-600">
            {" "}
            {/* {ticket.module_name} */}
          </span>
        </p>
        <p className="mb-2 font-bold">
          Category:{" "}
          <span className="font-semibold text-gray-600">
            {" "}
            {/* {ticket.category} */}
          </span>
        </p>
      </div>

      <div className="mb-6 w-full">
        <label
          htmlFor="remarks"
          className="block text-sm font-bold text-black mb-2"
        >
          Remarks:
        </label>
        <ReactQuill
        //   value={remarks}
        //   onChange={setRemarks}
          modules={modules}
          formats={formats}
          className="bg-white shadow-lg"
        /> 
      </div>

      <div className="flex justify-between">
        <button
          className="px-6 py-2 bg-green-500 text-white rounded-md mr-4"
        //   onClick={handleApprove}
        >
          Approve
        </button>
        <button
          className="px-6 py-2 bg-red-500 text-white rounded-md"
        //   onClick={handleReject}
        >
          Reject
        </button>
      </div>
    </div>
  </div>
  )
}

export default ApproverPopUp
