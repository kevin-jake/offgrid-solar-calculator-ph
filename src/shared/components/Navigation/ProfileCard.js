import React from "react";

const ProfileCard = (props) => {
  return (
    <div class="each flex rounded shadow w-max text-gray-600 mb-5 bg-white">
      <div class="sec self-center p-2 pr-1">
        <svg
          class="h-10 w-10 text-black"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          {" "}
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />{" "}
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>
      <div class="sec self-center p-2 w-auto">
        <div class="flex">
          <div class="name text-sm">{props.name}</div>
          {props.role === "Admin" && (
            <div class="role font-bold text-sm text-blue-600 self-center px-1 w-max rounded">
              (Admin)
            </div>
          )}
        </div>

        <div class="title text-xs text-gray-400 -mt-1">{props.email}</div>
      </div>
      {props.children}
    </div>
  );
};

export default ProfileCard;
