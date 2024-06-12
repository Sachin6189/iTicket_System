import React from "react";

const ApprovalTable = () => {





  return (
    <div className="max-w-full px-4 py-8">
      <div className="flex justify-end">
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
                <th className="px-4 py-2 text-left border">Approval Date</th>
                <th className="px-4 py-2 text-left border">Raised Time</th>
                <th className="px-4 py-2 text-left border">Solution Time</th>
                <th className="px-4 py-2 text-left border">Action</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <button
          className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 mr-2"
         
        >
          Previous
        </button>
        <span className="px-4 py-2">
        
        </span>
        <button
          className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 ml-2"
       
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ApprovalTable;
