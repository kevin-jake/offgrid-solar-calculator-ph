import React from "react";

const ProfileCard = (props) => {
  return (
    <div className="each flex rounded border border-1 border-blue-400 w-max text-gray-600 mb-5 bg-white">
      <div className="sec self-center p-2 pr-1">
        <svg
          className="h-10 w-10 text-black"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {" "}
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />{" "}
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>
      <div className="sec self-center p-2 w-auto">
        <div className="flex">
          <div className="name text-sm">{props.name}</div>
          {props.role === "Admin" && (
            <div className="role font-bold text-sm text-blue-600 self-center px-1 w-max rounded">
              (Admin)
            </div>
          )}
        </div>

        <div className="title text-xs text-gray-400 -mt-1">{props.email}</div>
      </div>
      {props.children}
    </div>
  );
};

export default ProfileCard;
