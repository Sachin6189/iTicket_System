import React from 'react'

const ApprovalTable = () => {
  return (
    <div className="max-w-full px-4 py-8">
      <div className="flex justify-between">
        
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        //   onChange={(e) => {
        //     setSearchTerm(e.target.value);
        //     debouncedFilterData(e.target.value);
        //   }}
          
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
            {/* <tbody>
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
                      onClick={() => handleIssueClick(data)}
                    >
                      {data.ticket_id}
                    </td>
                    <td className="px-4 py-2 border">{data.project_name}</td>
                    <td className="px-4 py-2 border">{data.module_name}</td>
                    <td className="px-4 py-2 border">{data.category_name}</td>
                    <td
                      className="px-4 py-2 cursor-pointer text-blue-500 hover:underline"
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
                        <span className="text-red-500">Unclaimed</span>
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
                      <img
                        className="h-8 w-8 cursor-pointer"
                        src={claim}
                        alt="claim"
                        title="Claim Ticket"
                        onClick={() => handleClaimTicket(data.ticket_id)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody> */}
          </table>
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <button
          className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 mr-2"
        //   onClick={() => setCurrentPage(currentPage - 1)}
        //   disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2">
          {/* Page {currentPage} of {Math.ceil(ticketData.length / itemsPerPage)} */}
        </span>
        <button
          className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 ml-2"
        //   onClick={() => setCurrentPage(currentPage + 1)}
        //   disabled={currentPage === Math.ceil(ticketData.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
      
    </div>
  )
}

export default ApprovalTable
