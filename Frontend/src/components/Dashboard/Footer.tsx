import React from "react";

const Footer: React.FC = () => {
  return (
    <div className=" left-0 w-full bg-gray-200 border-t border-gray-300 flex justify-between items-center px-4 py-2">
      <div className="text-sm">
        <div className="font-[fangsong]">
          Copyright &copy; 2024{" "}
          <a
            href="https://www.tatamotors.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-semibold cursor-pointer"
          >
            Tata Motors Limited.
          </a>{" "}
          All Rights Reserved.
          <p className="text-xs">Use Chrome OR Firefox for a better view.</p>
        </div>
      </div>
      <div className="text-sm font-[fangsong]">Version 2.0</div>
    </div>
  );
};

export default Footer;
