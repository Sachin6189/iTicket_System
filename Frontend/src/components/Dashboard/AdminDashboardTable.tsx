import React, { useState, useEffect, useContext } from "react";
import _ from "lodash";
import axios from "axios";
import ReplyTicket from "./ReplyTicket";
import claim from "../assets/claim.gif";
// import Teams from "../assets/teams.png";
import { LoginContext } from "../../LoginContext";

interface AdminDashboardTableProps {
  filterStatus: string | null;
  filterOption: string | null;
}

const AdminDashboardTable: React.FC<AdminDashboardTableProps> = ({
  filterStatus,
  filterOption,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [ticketData, setTicketData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showClaimAction, setShowClaimAction] = useState(false);

  const { user } = useContext(LoginContext);
  const { user_id, user_name } = user;

  const handleIssueClick = (ticket: any) => {
    setSelectedTicket(ticket);
  };

  const handlePopUpClose = () => {
    setSelectedTicket(null);
  };

 

  const getHeadingText = () => {
    if (filterOption === "ticketsPendingOnMe") {
      return "Tickets Pending On Me";
    } else if (filterOption === "unclaimedTickets") {
      return "Unclaimed Tickets";
    } else if (filterStatus === "Open") {
      return "Open Tickets";
    } else if (filterStatus === "Close") {
      return "Resolved Tickets";
    } else {
      return "Raised Tickets";
    }
  };

  const fetchTicketData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tickets");
      const sortedData = response.data.slice().sort((a: any, b: any) => {
        const dateA = new Date(a.created.toString());
        const dateB = new Date(b.created.toString());
        return dateB.getTime() - dateA.getTime();
      });

      let filteredData = sortedData;

      if (filterStatus) {
        filteredData = sortedData.filter(
          (ticket: any) => ticket.status === filterStatus
        );
      }

      if (filterOption === "ticketsPendingOnMe") {
        filteredData = filteredData.filter(
          (ticket: any) =>
            ticket.status === "Open" && ticket.asignto_name === user_name
        );
      } else if (filterOption === "unclaimedTickets") {
        filteredData = filteredData.filter(
          (ticket: any) => !ticket.asignto_name
        );
      }

      setTicketData(filteredData);
    } catch (error) {
      console.error("Error fetching ticket data:", error);
    }
  };

  useEffect(() => {
    fetchTicketData();
  }, [filterStatus, filterOption, user_name]);

  const handleClaimTicket = async (ticketId: string) => {
    try {
      await axios.post("http://localhost:5000/api/claim-ticket", {
        ticketId,
        assignToName: user_name,
      });
      alert("Ticket Claimed");
      fetchTicketData();
    } catch (error) {
      console.error("Error claiming ticket:", error);
    }
  };

  useEffect(() => {
    fetchTicketData();
    setShowClaimAction(filterOption === "unclaimedTickets");
  }, [filterStatus, filterOption, user_name]);

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
        <h2 className="mt-2 text-2xl font-bold font-[fangsong] text-gray-800">
          {getHeadingText()}
        </h2>
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
                <th className="px-4 py-2 text-left border">Support Person</th>
                <th className="px-4 py-2 text-left border">Elapsed Time</th>
                <th className="px-4 py-2 text-left border">Raised Time</th>
                <th className="px-4 py-2 text-left border">Solution Time</th>
                <th className="px-4 py-2 text-left border">Consumed Time</th>
                <th className="px-4 py-2 text-left border">Action</th>
              </tr>
            </thead>
            <tbody>
              {ticketData
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((data, index) => (
                  <tr
                    key={index}
                    className="odd:bg-white even:bg-gray-100 border"
                  >
                    <td
                      className="px-4 py-2 cursor-pointer text-blue-500 hover:underline"
                      title="Reply"
                      onClick={() => handleIssueClick(data)}
                    >
                      {data.ticket_id}
                    </td>
                    <td className="px-4 py-2 border">{data.project_name}</td>
                    <td className="px-4 py-2 border">{data.module_name}</td>
                    <td className="px-4 py-2 border">{data.category_name}</td>
                    <td
                      className="px-4 py-2 cursor-pointer text-blue-500 hover:underline"
                      title="Reply"
                      onClick={() => handleIssueClick(data)}
                    >
                      {data.issue_subject}
                    </td>
                    <td className="px-4 py-2 border">{data.status}</td>
                    <td className="px-4 py-2 border">{data.raiser_name}</td>
                    <td className="px-4 py-2 border">{data.locn_name}</td>
                    <td className="px-4 py-2 border">{data.contact_no}</td>
                    <td className="px-4 py-2 border">
                      {data.approver_name || "-"}
                      {data.approver_id ? ` (${data.approver_id})` : ""}
                    </td>
                    <td className="px-4 py-2 border">
                      {data.asignto_name || (
                        <span className="text-red-500 italic">Unclaimed</span>
                      )}
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
                      {showClaimAction && (
                        <img
                          className="h-10 w-10 cursor-pointer"
                          src={claim}
                          alt="claim"
                          title="Claim Ticket"
                          onClick={() => handleClaimTicket(data.ticket_id)}
                        />
                      )}
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
      {selectedTicket ? (
        <ReplyTicket ticket={selectedTicket} onClose={handlePopUpClose} />
      ) : null}
    </div>
  );
};

export default AdminDashboardTable;
