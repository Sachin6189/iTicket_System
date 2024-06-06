import React, { useState, useEffect } from "react";
import axios from "axios";
import close from "../../components/assets/close.gif";
import downloadImg from "../../components/assets/downloadImg.gif";
import userlogo from "../../components/assets/flaticon3.png";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import _ from "lodash";
import Select from "react-select";

interface Option {
  value: string;
  label: string;
}

interface IssueTag {
  tag_name: string;
}

interface Status {
  status_name: string;
}

const ReplyTicket = ({ ticket, onClose }: { ticket: any; onClose: any }) => {
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState<Option[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<Option | null>(null);
  const [issueTags, setIssueTags] = useState<string[]>([]);

  const handleReplyClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSave = () => {
    console.log("something");
  };

  const fetchStatus = async () => {
    try {
      const response = await axios.get<Status[]>(
        "http://localhost:5000/api/ticket-status"
      );
      setStatus(
        response.data.map((item) => ({
          value: item.status_name,
          label: item.status_name,
        }))
      );
    } catch (error) {
      console.error("Error fetching status:", error);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchIssueTags = async () => {
    try {
      const response = await axios.get<IssueTag[]>("http://localhost:5000/api/issue-tags");
      const tags = response.data.map((tag) => tag.tag_name);
      setIssueTags(tags);
    } catch (error) {
      console.error("Error fetching issue tags:", error);
    }
  };

  useEffect(() => {
    fetchIssueTags();
  }, []);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-full w-full lg:w-3/4 md:w-5/6 border-2 border-gray-500">
        <div className="max-h-[99vh] overflow-y-auto">
          <div className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-700 text-white flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              Ticket Number: {ticket.ticket_id}
            </h2>
            <button
              className="px-2 py-1 rounded-full hover:bg-red-500 transition-colors duration-500 h-10 w-10"
              onClick={onClose}
            >
              <img src={close} alt="close" />
            </button>
          </div>
          <div className="px-6 py-4">
            <div className="bg-gray-100 rounded-lg p-4 mb-4 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Issue Title: {ticket.issue_subject}
              </h3>
              <p className="text-gray-600 text-base mb-2">
                Project: {ticket.project_name}
              </p>
              <p className="text-gray-600 text-base mb-2">
                Module: {ticket.module_name}
              </p>
              <p className="text-gray-600 text-base">
                Category: {ticket.category_name}
              </p>
            </div>
            <div>
              <div>
                <div className="mt-2 bg-red-500 w-48 pl-2 rounded-lg">
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {new Date(ticket.created).toLocaleString("en-IN", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </h4>
                </div>
                <div className="flex gap-3 py-4 items-center">
                  <img
                    src={userlogo}
                    alt=""
                    className="h-10 w-10 rounded-full"
                  />
                  <span className="text-xl font-semibold text-gray-800 gap-5">
                    <span className="font-medium">
                      {ticket.raiser_name} {ticket.created_by}
                    </span>
                  </span>
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded-md shadow-md">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Description:
                  </h3>
                  <p
                    className="text-gray-600 font-sans"
                    dangerouslySetInnerHTML={{ __html: ticket.issue_desc }}
                  ></p>
                </div>
                <div className="flex items-center mt-4">
                  {/* {imageData && (
                    <h3 className="text-lg font-semibold text-gray-800 mr-2">
                      File:
                    </h3>
                  )}
                  {imageData && (
                    <button
                      className="px-2 py-2 h-10 w-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full"
                      onClick={handleDownload}
                    >
                      <img src={downloadImg} alt="" />
                    </button>
                  )} */}
                </div>
              </div>
            </div>
            <div>
              {/* {issue && issue.approvalData && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Approval Details:
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Approver ID: {approver_id}
                  </p>
                  <p className="text-gray-600 mb-2">
                    Remarks:{" "}
                    <div
                      className="text-gray-600 mb-2"
                      dangerouslySetInnerHTML={{ __html: remarks }}
                    ></div>
                  </p>
                  <p className="text-gray-600 mb-2">
                    Approval Status: {approval_status}
                  </p>
                  <p className="text-gray-600">
                    Approval Time:{" "}
                    {approval_time &&
                      new Date(approval_time).toLocaleString("en-IN", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                  </p>
                </div>
              )} */}
            </div>
          </div>

          <div>
            <div className="px-6 bg-gray-100 py-4 flex justify-end">
              <button
                className={`bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded ${
                  showForm ? "hidden" : ""
                }`}
                onClick={handleReplyClick}
              >
                Reply
              </button>
            </div>
          </div>
          <div>
            {showForm && (
              <div className="bg-gray-100 shadow-xl rounded-md border my-6 mx-6">
                <div className="p-6 flex flex-wrap">
                  <div className="mb-4 flex-1 mr-4 mt-1">
                    <label
                      htmlFor="ticketStatus"
                      className="flex text-sm font-medium text-gray-700"
                    >
                      Ticket Status:
                    </label>
                    <Select
                      value={selectedStatus}
                      onChange={(option: Option | null) =>
                        setSelectedStatus(option)
                      }
                      options={status}
                      placeholder="Select ticket status"
                    />
                  </div>
                  <div className="mb-4 flex-1">
                    <label
                      htmlFor="ccList"
                      className="flex text-sm font-medium text-gray-700"
                    >
                      CC List:
                    </label>
                    <input
                      // type="text"
                      // id="ccList"
                      // value={ccList}
                      // onChange={(e) => setCcList(e.target.value)}
                      className="mt-1 flex w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="w-full"></div>
                  <div className="mb-4 flex-1 mr-4">
                    <label
                      htmlFor="solutionTime"
                      className="flex text-sm font-medium text-gray-700"
                    >
                      Solution Time
                      <span className="text-xs text-blue-500">
                        (in minutes)
                      </span>
                      :
                    </label>
                    <input
                      // type="text"
                      // id="solutionTime"
                      // value={solutionTime}
                      // onChange={handleSolutionTimeChange}
                      className="mt-1 flex w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="mb-4 flex-1">
                    <label
                      htmlFor="department"
                      className="flex text-sm font-medium text-gray-700"
                    >
                      Tag Issue Type:
                    </label>
                    <select id="issueType" className="mt-1 flex w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option value="">Select Issue Type</option>
              {issueTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
                  </div>
                  <div className="mb-4 w-full flex items-center">
                    <label
                      htmlFor="approvalRequired"
                      className="block text-sm font-medium text-gray-700 mr-2"
                    >
                      Approval Required:
                    </label>
                    <input
                      type="checkbox"
                      id="approvalRequired"
                      // checked={approvalRequired}
                      // onChange={handleApprovalChange}
                      className="mt-1 form-checkbox h-5 w-5 text-indigo-600"
                    />
                  </div>
                  <div className="mb-4 w-full">
                    <Select
                      // value={selectedOption}
                      // onChange={handleOptionChange}
                      isClearable
                      isSearchable
                      // isDisabled={!approvalRequired}
                      placeholder="...Select Employee Name..."
                      // options={employees}
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          border: "1px solid #e5e7eb",
                          boxShadow: "none",
                          "&:hover": {
                            border: "1px solid #a0aec0",
                          },
                        }),
                        option: (provided, state) => ({
                          ...provided,
                          backgroundColor: state.isSelected
                            ? "#6366f1"
                            : "white",
                          color: state.isSelected ? "white" : "#4b5563",
                          "&:hover": {
                            backgroundColor: "#e0e7ff",
                            color: "#1e293b",
                          },
                        }),
                      }}
                    />
                  </div>
                  <div className="mb-4 w-full">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Solution<span className="text-red-500">*</span>:
                    </label>
                    <ReactQuill
                      // value={description}
                      // onChange={setDescription}
                      // modules={modules}
                      // formats={formats}
                      className="bg-white"
                    />
                  </div>

                  <div className="mb-4 w-full">
                    <label
                      htmlFor="uploadFile"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Upload File:
                    </label>
                    <input
                      type="file"
                      id="uploadFile"
                      // onChange={handleImageChange}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="flex justify-between w-full">
                    <button
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button
                      className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-md"
                      onClick={handleCloseForm}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyTicket;
