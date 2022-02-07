import React from "react";
import { numberWithCommas } from "../shared/util/format";

const BatteryItems = ({ battlist }) => {
  return (
    <tr>
      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
        <div class="text-sm leading-5 text-blue-900">{battlist.battname}</div>
      </td>
      <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
        {battlist.batttype}
      </td>
      <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
        {battlist.battmodel}
      </td>
      <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
        {battlist.voltage + " V"}
      </td>
      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
        {battlist.battcapacity + " Ah"}
      </td>
      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
        {"Php " + numberWithCommas(battlist.priceperpc.toFixed(2))}
      </td>
      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
        <a
          className=" px-4 py-2 mt-2 text-blue-600 visited:text-purple-600"
          target="_blank"
          rel="noopener noreferrer"
          href={battlist.link}
        >
          {battlist.link ? "Link" : ""}
        </a>
      </td>

      <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
        <div className="grid lg:grid-cols-2 gap-4 sm:grid-row md:grid-row">
          <button className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none md:row-span-auto">
            Edit
          </button>
          <button className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none md:row-span-auto">
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BatteryItems;
