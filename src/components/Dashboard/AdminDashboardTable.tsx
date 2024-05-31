import React, { useState, useEffect } from "react";
import _ from "lodash";
import axios from "axios";

const AdminDashboardTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [ticketData, setTicketData] = useState<any[]>([]);

  const fetchTicketData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tickets");
      // console.log(response.data);
      const sortedData = response.data
      .slice()
      .sort((a: any, b: any) => {
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
    // setFilterData(
    
      ticketData.filter(
        (data : any) =>
          data.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          data.module_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          data.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          data.issue_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          data.contact.toLowerCase().includes(searchTerm.toLowerCase())||
          data.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    // );
    // setCurrentPage(1);
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
        <table className="w-full table-auto border-collapse border border-gray-300">
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
              {/* <th className="px-4 py-2 text-left">Elapsed time</th> */}
              <th className="px-4 py-2 text-left">Raised Time</th>
              {/* <th className="px-4 py-2 text-left">Solution Time</th> */}
              {/* <th className="px-4 py-2 text-left">Consume Time(in minutes)</th> */}
              {/* <th className="px-4 py-2 text-left">Action</th> */}
            </tr>
          </thead>
          <tbody>
            {ticketData.map((data, index) => (
              <tr key={index}>
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
                <td className="px-4 py-2 border">{data.asignto_name}</td>
                {/* <td className="px-4 py-2 border">{data.elapsedTime}</td> */}
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
                {/* <td className="px-4 py-2 border">{data.solutionTime}</td> */}
                {/* <td className="px-4 py-2 border">{data.consumeTime}</td> */}
                {/* <td className="px-4 py-2 border">{data.action}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default AdminDashboardTable;
