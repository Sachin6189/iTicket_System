import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { LoginContext } from "../../LoginContext";
import takeAction from "../assets/action.gif";
import ApproverPopUp from "./ApproverPopUp";
import _ from "lodash";


interface TicketData {
  ticket_id: string;
  project_name: string;
  module_name: string;
  category_name: string;
  issue_subject: string;
  status: string;
  raiser_name: string;
  locn_name: string;
  contact_no: string;
  approver_name: string;
  created: string;
  approver_chk: number;
  approver_id: string;
}

interface User {
  user_id: string;
  user_name: string;
}

const ApprovalTable = () => {
  const [ticketData, setTicketData] = useState<TicketData[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<TicketData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");


  const { user } = useContext(LoginContext);
  const { user_id, user_name } = user;

  const handleAction = (ticket: TicketData) => {
    setSelectedTicket(ticket);
    setShowPopup(true);
  };

  const fetchTicketData = async () => {
    try {
      const response = await axios.get<TicketData[]>(
        "http://localhost:5000/api/tickets"
      );
      const filteredData = response.data.filter(
        (ticket: any) =>
          ticket.approver_chk === 1 &&
          ticket.approver_id === user_id &&
          ticket.approver_name === user_name
      );
      setTicketData(filteredData);
    } catch (error) {
      console.error("Error fetching ticket data:", error);
    }
  };

  useEffect(() => {
    fetchTicketData();
  }, [user_id, user_name]);

  const debouncedFilterData = _.debounce((searchTerm) => {
    if (searchTerm.trim() === "") {
      fetchTicketData();
      setCurrentPage(1);
    } else {
      setTicketData(
        ticketData.filter(
          (data: any) =>
            data.project_name
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            data.module_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            data.category_name
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            data.issue_subject
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            data.contact_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
            data.locn_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            data.status.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setCurrentPage(1);
    }
  }, 500);


  return (
    <div className="max-w-full px-4 py-8">
      <div className="flex justify-between">
        <h2 className="mt-2 text-2xl font-bold font-[fangsong] text-gray-800">Approval Pending On Me</h2>
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          onChange={(e) => {
            setSearchTerm(e.target.value);
            debouncedFilterData(e.target.value);
          }}
        />
      </div>

      <div className="mt-4">
        <div className="overflow-x-auto rounded-lg shadow-xl">
          <table className="w-full table-auto border-collapse border-gray-300">
            <thead className="bg-gray-800 font-[fangsong] text-white">
              <tr>
                <th className="px-4 py-2 text-left border">Ticket ID</th>
                <th className="px-4 py-2 text-left border">Project</th>
                <th className="px-4 py-2 text-left border">Module</th>
                <th className="px-4 py-2 text-left border">Category</th>
                <th className="px-4 py-2 text-left border">Issue Title</th>
                <th className="px-4 py-2 text-left border">Status</th>
                <th className="px-4 py-2 text-left border">Raiser</th>
                <th className="px-4 py-2 text-left border">Location</th>
                <th className="px-4 py-2 text-left border">Contact No.</th>
                <th className="px-4 py-2 text-left border">Approver</th>
                <th className="px-4 py-2 text-left border">Approval Date</th>
                <th className="px-4 py-2 text-left border">Raised Time</th>
                <th className="px-4 py-2 text-left border">Solution Time</th>
                <th className="px-4 py-2 text-left border">Action</th>
              </tr>
            </thead>
            <tbody>
              {ticketData.map((data, index) => (
                <tr
                  key={index}
                  className="odd:bg-white even:bg-gray-100 border"
                >
                  <td className="px-4 py-2 border">{data.ticket_id}</td>
                  <td className="px-4 py-2 border">{data.project_name}</td>
                  <td className="px-4 py-2 border">{data.module_name}</td>
                  <td className="px-4 py-2 border">{data.category_name}</td>
                  <td className="px-4 py-2 border">{data.issue_subject}</td>
                  <td className="px-4 py-2 border">{data.status}</td>
                  <td className="px-4 py-2 border">{data.raiser_name}</td>
                  <td className="px-4 py-2 border">{data.locn_name}</td>
                  <td className="px-4 py-2 border">{data.contact_no}</td>
                  <td className="px-4 py-2 border">{data.approver_name}</td>
                  <td className="px-4 py-2 border">
                    {new Date(data.created)
                      .toLocaleString("en-IN", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hourCycle: "h12",
                      })
                      .replace(/\bam\b/g, "AM")
                      .replace(/\bpm\b/g, "PM")}
                  </td>
                  <td className="px-4 py-2 border">
                    {new Date(data.created)
                      .toLocaleString("en-IN", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hourCycle: "h12",
                      })
                      .replace(/\bam\b/g, "AM")
                      .replace(/\bpm\b/g, "PM")}
                  </td>
                  <td className="px-4 py-2 border">
                    {new Date(data.created)
                      .toLocaleString("en-IN", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hourCycle: "h12",
                      })
                      .replace(/\bam\b/g, "AM")
                      .replace(/\bpm\b/g, "PM")}
                  </td>
                  <td className="px-4 py-2 border" title="Take Action">
                    <img
                      className="h-10 w-10 hover:cursor-pointer"
                      src={takeAction}
                      alt="Action"
                      onClick={() => handleAction(data)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-gray-700">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {currentPage * itemsPerPage > ticketData.length
            ? ticketData.length
            : currentPage * itemsPerPage}{" "}
          of {ticketData.length} entries
        </span>
        <div className="flex">
          <button
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 mr-2"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {Math.ceil(ticketData.length / itemsPerPage)}
          </span>
          <button
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 ml-2"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(ticketData.length / itemsPerPage)
            }
          >
            Next
          </button>
        </div>
      </div>
      {showPopup && selectedTicket && (
        <ApproverPopUp
          showPopup={showPopup}
          handleClose={() => {
            setShowPopup(false);
            setSelectedTicket(null);
          }}
          ticket={selectedTicket}
        />
      )}
    </div>
  );
};

export default ApprovalTable;
