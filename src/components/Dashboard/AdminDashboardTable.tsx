import React, { useState, useEffect } from "react";
import _ from "lodash";
import axios from "axios";
import ReplyTicket from "./ReplyTicket";

const AdminDashboardTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [ticketData, setTicketData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleIssueClick = (ticket: any) => {
    setSelectedTicket(ticket);
  };

const handlePopUpClose = () => {
  setSelectedTicket(null);
} 

  const fetchTicketData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tickets");
      console.log(response.data)
      const sortedData = response.data.slice().sort((a: any, b: any) => {
        const dateA = new Date(a.created.toString());
        const dateB = new Date(b.created.toString());
        return dateB.getTime() - dateA.getTime();
      });

      setTicketData(sortedData);
    } catch (error) {
      console.error("Error fetching ticket data:", error);
    }
  };

  useEffect(() => {
    fetchTicketData();
  }, []);

  const debouncedFilterData = _.debounce((searchTerm) => {
    // console.log(searchTerm);
    setTicketData(
      ticketData.filter(
        (data: any) =>
          data.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          data.module_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          data.category_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          data.issue_subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          data.contact_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
          data.locn_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setCurrentPage(1);
  }, 500);

  return (
    <div className="container max-w-full px-4 py-8">
      <div className="flex justify-end mb-4">
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
      <div className="mt-10">
        <div className="overflow-x-auto rounded-lg shadow-xl">
          <table className="w-full table-auto border-collapse border-gray-300">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Ticket ID</th>
                <th className="px-4 py-2 text-left">Project</th>
                <th className="px-4 py-2 text-left">Module</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Issue Title</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Raiser</th>
                <th className="px-4 py-2 text-left">Location</th>
                <th className="px-4 py-2 text-left">Contact No.</th>
                <th className="px-4 py-2 text-left">Approver</th>
                <th className="px-4 py-2 text-left">Support Person</th>
                <th className="px-4 py-2 text-left">Raised Time</th>
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
                    className="odd:bg-white even:bg-gray-100 border-none"
                  >
                    <td className="px-4 py-2 cursor-pointer text-blue-500 hover:underline">
                      {data.ticket_id}
                    </td>
                    <td className="px-4 py-2">{data.project_name}</td>
                    <td className="px-4 py-2">{data.module_name}</td>
                    <td className="px-4 py-2">{data.category_name}</td>
                    <td
                      className="px-4 py-2 cursor-pointer text-blue-500 hover:underline"
                      onClick={() => handleIssueClick(data)}
                    >
                      {data.issue_subject}
                    </td>
                    <td className="px-4 py-2">{data.status}</td>
                    <td className="px-4 py-2">{data.raiser_name}</td>
                    <td className="px-4 py-2">{data.locn_name}</td>
                    <td className="px-4 py-2">{data.contact_no}</td>
                    <td className="px-4 py-2">{data.approver_name}</td>
                    <td className="px-4 py-2">{data.asignto_name}</td>
                    <td className="px-4 py-2">
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
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-4 flex justify-center">
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
          disabled={currentPage === Math.ceil(ticketData.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
      {selectedTicket ? <ReplyTicket ticket={selectedTicket} onClose={handlePopUpClose}  /> : null}
    </div>
  );
};

export default AdminDashboardTable;
