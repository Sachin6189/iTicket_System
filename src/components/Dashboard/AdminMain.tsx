import React from "react";
import tickets from "../assets/tickets.gif"
import openTicket from "../assets/open_tickets.gif"
import ticketsPending from "../assets/pending.gif"
import unclaimedTicket from "../assets/unclaimed.gif"
import ticketsResolved from "../assets/resolved.gif"
import raiseAccess from "../assets/access_raise.gif"
import approval from "../assets/approve.gif"
import arrow from "../assets/arrow-right.png"
import AdminDashboardTable from "./AdminDashboardTable";


const AdminMain: React.FC = () => {


const NoOfTicketsRaised = 0;
const openTicketsCount = 0;
const ticketsPendingOnMe = 0;
const UnclaimedTickets = 0;
const TicketsResolved = 0;
const raiseAccessRequest = 0;
const approvalPendingOnMe = 0;

  return (
    <div className="overflow-x-auto">
      {/* Button and Calendar */}
      <div className="flex justify-start gap-5 items-center mt-5 pl-4">
        <button className="bg-gray-800 hover:bg-gray-950 text-[#47c8c3] font-bold font-[fangsong] py-2 px-4 rounded">
          Raise New Ticket
        </button>

        <button className="bg-gray-800 hover:bg-gray-950 text-[#47c8c3] font-bold font-[fangsong] py-2 px-4 rounded">
       Raise Access Request
        </button>
      </div>

      {/* Boxes design */}
      <div className="flex flex-wrap justify-center gap-4 pt-5">
        <div className="flex flex-row items-center bg-gray-200 text-sm p-2 w-full md:w-64 h-24 border-l-8 border-red-400 rounded-lg font-semibold text-red-400 font-[fangsong]">
          <div className="w-1/4">
            <img src={tickets} alt="" />
          </div>
          <div className="pl-4">
            <div>Ticket Raised</div>
            <div className="text-3xl">{NoOfTicketsRaised}</div>
            <div className="mt-2 flex text-gray-600 text-xs cursor-pointer">
            More Info <img className="pl-1 h-4 w-4" src={arrow} alt="arrow" />
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
            <div className="mt-2 flex text-gray-600 text-xs cursor-pointer">
              More Info <img className="pl-1 h-4 w-4" src={arrow} alt="arrow" />
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
            <div className="mt-2 flex text-gray-600 text-xs cursor-pointer">
              More Info <img className="h-4 w-4 pl-1" src={arrow} alt="arrow" />
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center bg-gray-200 text-sm p-4 w-full md:w-64 h-24 border-l-8 border-purple-500 rounded-lg font-semibold text-purple-500 font-[fangsong]">
          <div className="w-1/4">
            <img src={unclaimedTicket} alt="" />
          </div>
          <div className="pl-2">
            <div>Unclaimed Tickets</div>
            <div className="text-3xl">{UnclaimedTickets}</div>
            <div className="mt-2 flex text-gray-600 text-xs cursor-pointer">
              More Info <img className="h-4 w-4 pl-1" src={arrow} alt="arrow" />
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center bg-gray-200 text-sm p-4 w-full md:w-64 h-24 border-l-8 border-green-500 rounded-lg font-semibold text-green-500 font-[fangsong]">
          <div className="w-1/4">
            <img src={ticketsResolved} alt="" />
          </div>
          <div className="pl-2">
            <div>Tickets Resolved</div>
            <div className="text-3xl">{TicketsResolved}</div>
            <div className="mt-2 flex text-gray-600 text-xs cursor-pointer">
              More Info <img className="h-4 w-4 pl-1" src={arrow} alt="arrow" />
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center bg-gray-200 text-sm p-4 w-full md:w-64 h-24 border-l-8 border-pink-500 rounded-lg font-semibold text-pink-500 font-[fangsong]">
          <div className="w-1/4">
            <img src={raiseAccess} alt="" />
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
            <div className="mt-2 flex text-gray-600 text-xs cursor-pointer">
              More Info <img className="h-4 w-4 pl-1" src={arrow} alt="arrow" />
            </div>
          </div>
        </div>
      </div>
      <AdminDashboardTable />
    </div>
  );  
};

export default AdminMain;
