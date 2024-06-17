import React from "react";

const AccessRequestTable = () => {
  return (
    <div className="mt-4">
      <div className="overflow-x-auto rounded-lg shadow-xl">
        <table className="w-full table-auto border-collapse border-gray-300">
          <thead className="bg-gray-800 font-[fangsong] text-white">
            <tr>
              <th className="px-4 py-2 text-left border">Ticket no.</th>
              <th className="px-4 py-2 text-left border">Project</th>
              <th className="px-4 py-2 text-left border">Module</th>
              <th className="px-4 py-2 text-left border">Access Role Request</th>
              <th className="px-4 py-2 text-left border">Status</th>
              <th className="px-4 py-2 text-left border">Raiser</th>
              <th className="px-4 py-2 text-left border">Location</th>
              <th className="px-4 py-2 text-left border">Contact no.</th>
              <th className="px-4 py-2 text-left border">Level1 Approver</th>
              <th className="px-4 py-2 text-left border">Level2 Approver</th>
              <th className="px-4 py-2 text-left border">Raised Time</th>
              <th className="px-4 py-2 text-left border">Level1 Approved Date</th>
              <th className="px-4 py-2 text-left border">Level2 Approved Date</th>
              <th className="px-4 py-2 text-left border">Action</th>
            </tr>
          </thead>
          <tbody>
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccessRequestTable;