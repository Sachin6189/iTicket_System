import React, { useState, useEffect, useContext } from "react";
import tickets from "../assets/tickets.gif";
import openTicket from "../assets/open_tickets.gif";
import ticketsPending from "../assets/pending.gif";
import unclaimedTicket from "../assets/unclaimed.gif";
import ticketsResolved from "../assets/resolved.gif";
import accessRaise from "../assets/access_raise.gif";
import approval from "../assets/approve.gif";
import arrow from "../assets/arrow-right.png";
import AdminDashboardTable from "./AdminDashboardTable";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../../LoginContext";
import ApprovalTable from "./ApprovalTable";


const AdminMain: React.FC = () => {
  const [totalTicketsRaised, setTotalTicketsRaised] = useState(0);
  const [openTicketsCount, setOpenTicketsCount] = useState(0);
  const [ticketsPendingOnMe, setTicketsPendingOnMe] = useState(0);
  const [unclaimedTickets, setUnclaimedTickets] = useState(0);
  const [resolvedTickets, setResolvedTickets] = useState(0);
  const [filterStatus, setFilterStatus] = useState<string | null>("Open");
  const [filterOption, setFilterOption] = useState<string | null>(null);
  const [showApprovalTable, setShowApprovalTable] = useState(false);
  const [showAdminDashboardTable, setShowAdminDashboardTable] = useState(true);
  const [approvalPendingOnMe, setApprovalPendingOnMe] = useState(0);

  const { user } = useContext(LoginContext);
  const { user_name } = user;

  const navigate = useNavigate();

  const raiseTicket = () => {
    navigate("/dashboard/raiseTicket");
  };

  const raiseAccess = () => {
    navigate("/dashboard/raiseAccess");
  };

  const handleShowApprovalTable = () => {
    setShowApprovalTable(!showApprovalTable);
    setShowAdminDashboardTable(!showAdminDashboardTable);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalTicketsResponse = await axios.get(
          "http://localhost:5000/api/total-tickets-raised"
        );
        setTotalTicketsRaised(totalTicketsResponse.data);

        const openTicketsResponse = await axios.get(
          "http://localhost:5000/api/open-tickets-count"
        );
        setOpenTicketsCount(openTicketsResponse.data);

        const ticketsPendingResponse = await axios.post(
          "http://localhost:5000/api/tickets-pending-on-me",
          { user_name }
        );
        setTicketsPendingOnMe(ticketsPendingResponse.data);

        const unclaimedTicketsResponse = await axios.get(
          "http://localhost:5000/api/unclaimed-tickets-count"
        );
        setUnclaimedTickets(unclaimedTicketsResponse.data);

        const resolvedTicketsResponse = await axios.get(
          "http://localhost:5000/api/resolved-tickets-count"
        );
        setResolvedTickets(resolvedTicketsResponse.data);

        const pendingApprovalsResponse = await axios.post(
          "http://localhost:5000/api/pending-approvals-count",
          { user_name }
        );
        setApprovalPendingOnMe(pendingApprovalsResponse.data);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user_name]);

  const raiseAccessRequest = 0;
  

  const handleStatusFilter = (status: string | null) => {
    setFilterStatus(status);
    setFilterOption(null);
    setShowApprovalTable(false);
    setShowAdminDashboardTable(true)
  };

  const handleTicketsPendingOnMe = () => {
    setFilterStatus("Open");
    setFilterOption("ticketsPendingOnMe");
    setShowApprovalTable(false);
    setShowAdminDashboardTable(true)
  };

  const handleUnclaimedTickets = () => {
    setFilterStatus(null);
    setFilterOption("unclaimedTickets");
    setShowApprovalTable(false);
    setShowAdminDashboardTable(true)
  };


  return (
    <div className="overflow-x-auto">
      {/* Button and Calendar */}
      <div className="flex justify-start gap-5 items-center mt-5 pl-4">
        <button
          onClick={raiseTicket}
          className="bg-gray-800 hover:bg-gray-950 text-[#47c8c3] font-bold font-[fangsong] py-2 px-4 rounded"
        >
          Raise New Ticket
        </button>

        <button
          className="bg-gray-800 hover:bg-gray-950 text-[#47c8c3] font-bold font-[fangsong] py-2 px-4 rounded"
          onClick={raiseAccess}
        >
          Raise Access Request
        </button>
      </div>

      {/* Boxes/Cards design */}
      <div className="flex flex-wrap justify-center gap-4 pt-5">
        <div className="flex flex-row items-center bg-gray-200 text-sm p-2 w-full md:w-64 h-24 border-l-8 border-red-400 rounded-lg font-semibold text-red-400 font-[fangsong]">
          <div className="w-1/4">
            <img src={tickets} alt="" />
          </div>
          <div className="pl-4">
            <div>Ticket Raised</div>
            <div className="text-3xl">{totalTicketsRaised}</div>
            <div
              className="mt-2 flex text-gray-600 text-xs cursor-pointer"
              onClick={() => handleStatusFilter(null)}
            >
              More Info
              <img className="pl-1 h-4 w-4" src={arrow} alt="arrow" />
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center bg-gray-200 text-sm p-4 w-full md:w-64 h-24 border-l-8 border-indigo-500 rounded-lg font-semibold text-indigo-500 font-[fangsong]">
          <div className="w-1/4">
            <img src={openTicket} alt="img" />
          </div>
          <div className="pl-4">
            <div>Open Tickets</div>
            <div className="text-3xl">{openTicketsCount}</div>
            <div
              className="mt-2 flex text-gray-600 text-xs cursor-pointer"
              onClick={() => handleStatusFilter("Open")}
            >
              More Info
              <img className="pl-1 h-4 w-4" src={arrow} alt="arrow" />
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center bg-gray-200 text-sm p-4 w-full md:w-64 h-24 border-l-8 border-yellow-400 rounded-lg font-semibold text-yellow-500 font-[fangsong]">
          <div className="w-1/4">
            <img src={ticketsPending} alt="img" />
          </div>
          <div className="pl-4">
            <div>Tickets Pending On Me</div>
            <div className="text-3xl">{ticketsPendingOnMe}</div>
            <div
              className="mt-2 flex text-gray-600 text-xs cursor-pointer"
              onClick={handleTicketsPendingOnMe}
            >
              More Info
              <img className="h-4 w-4 pl-1" src={arrow} alt="arrow" />
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center bg-gray-200 text-sm p-4 w-full md:w-64 h-24 border-l-8 border-purple-500 rounded-lg font-semibold text-purple-500 font-[fangsong]">
          <div className="w-1/4">
            <img src={unclaimedTicket} alt="" />
          </div>
          <div className="pl-4">
            <div>Unclaimed Tickets</div>
            <div className="text-3xl">{unclaimedTickets}</div>
            <div
              className="mt-2 flex text-gray-600 text-xs cursor-pointer"
              onClick={handleUnclaimedTickets}
            >
              More Info
              <img className="pl-1 h-4 w-4" src={arrow} alt="arrow" />
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center bg-gray-200 text-sm p-4 w-full md:w-64 h-24 border-l-8 border-green-500 rounded-lg font-semibold text-green-500 font-[fangsong]">
          <div className="w-1/4">
            <img src={ticketsResolved} alt="" />
          </div>
          <div className="pl-2">
            <div>Tickets Resolved</div>
            <div className="text-3xl">{resolvedTickets}</div>
            <div
              className="mt-2 flex text-gray-600 text-xs cursor-pointer"
              onClick={() => handleStatusFilter("Close")}
            >
              More Info
              <img className="h-4 w-4 pl-1" src={arrow} alt="arrow" />
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center bg-gray-200 text-sm p-4 w-full md:w-64 h-24 border-l-8 border-pink-500 rounded-lg font-semibold text-pink-500 font-[fangsong]">
          <div className="w-1/4">
            <img src={accessRaise} alt="" />
          </div>
          <div className="pl-2">
            <div>Raise Access Request</div>
            <div className="text-3xl">{raiseAccessRequest}</div>
            <div className="mt-2 flex text-gray-600 text-xs cursor-pointer">
              More Info <img className="h-4 w-4 pl-1" src={arrow} alt="arrow" />
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center bg-gray-200 text-sm p-4 w-full md:w-64 h-24 border-l-8 border-blue-400 rounded-lg font-semibold text-green-500 font-[fangsong]">
          <div className="w-1/4">
            <img src={approval} alt="" />
          </div>
          <div className="pl-2">
            <div>Pending Approval on me</div>
            <div className="text-3xl">{approvalPendingOnMe}</div>
            <div
              className="mt-2 flex text-gray-600 text-xs cursor-pointer"
              onClick={handleShowApprovalTable}
            >
              More Info
              <img className="h-4 w-4 pl-1" src={arrow} alt="arrow" />
            </div>
          </div>
        </div>
      </div>
      {showAdminDashboardTable && (
        <AdminDashboardTable
          filterStatus={filterStatus}
          filterOption={filterOption}
        />
      )}
      {showApprovalTable && <ApprovalTable />}
    </div>
  );
};

export default AdminMain;
