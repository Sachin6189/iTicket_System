import React, {useState} from "react";
import _ from "lodash";

const AdminDashboardTable = () => {
  const [searchTerm, setSearchTerm] = useState("");


  const dummyData = [
    {
      ticketID: "T12345",
      project: "Project A",
      module: "Module X",
      category: "Bug",
      issueTitle: "Login issue",
      status: "Open",
      raiser: "John Doe",
      location: "New York",
      contactNo: "123-456-7890",
      approver: "Jane Smith",
      supportPerson: "Alice Brown",
      elapsedTime: "2 days",
      raisedTime: "2023-05-25 10:00 AM",
      solutionTime: "2023-05-27 02:00 PM",
      consumeTime: 300,
      action: "View"
    },
    {
      ticketID: "T12346",
      project: "Project B",
      module: "Module Y",
      category: "Feature Request",
      issueTitle: "Add new filter",
      status: "In Progress",
      raiser: "Mary Johnson",
      location: "Los Angeles",
      contactNo: "987-654-3210",
      approver: "Robert Brown",
      supportPerson: "Charles Green",
      elapsedTime: "1 day",
      raisedTime: "2023-05-26 09:00 AM",
      solutionTime: "2023-05-28 01:00 PM",
      consumeTime: 480,
      action: "View"
    },
    
  ];

  const debouncedFilterData = _.debounce((searchTerm) => {
    // setFilterData(
      console.log(searchTerm);
      dummyData.filter(
        (item : any) =>
          item.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.module_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.issue_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.location.toLowerCase().includes(searchTerm.toLowerCase())
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
              <th className="px-4 py-2 text-left">Elapsed time</th>
              <th className="px-4 py-2 text-left">Raised Time</th>
              <th className="px-4 py-2 text-left">Solution Time</th>
              <th className="px-4 py-2 text-left">Consume Time(in minutes)</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((data, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{data.ticketID}</td>
                <td className="px-4 py-2 border">{data.project}</td>
                <td className="px-4 py-2 border">{data.module}</td>
                <td className="px-4 py-2 border">{data.category}</td>
                <td className="px-4 py-2 border">{data.issueTitle}</td>
                <td className="px-4 py-2 border">{data.status}</td>
                <td className="px-4 py-2 border">{data.raiser}</td>
                <td className="px-4 py-2 border">{data.location}</td>
                <td className="px-4 py-2 border">{data.contactNo}</td>
                <td className="px-4 py-2 border">{data.approver}</td>
                <td className="px-4 py-2 border">{data.supportPerson}</td>
                <td className="px-4 py-2 border">{data.elapsedTime}</td>
                <td className="px-4 py-2 border">{data.raisedTime}</td>
                <td className="px-4 py-2 border">{data.solutionTime}</td>
                <td className="px-4 py-2 border">{data.consumeTime}</td>
                <td className="px-4 py-2 border">{data.action}</td>
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
