import React from "react";
import { numberWithCommas } from "../shared/util/format";

const SolarPanelItems = ({ pvlist }) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
        <div className="text-sm leading-5 text-blue-900">{pvlist.pvname}</div>
      </td>
      <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
        {pvlist.brand}
      </td>
      <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
        {pvlist.wattage + " W"}
      </td>
      <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
        {pvlist.voc + " V"}
      </td>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
        {pvlist.imp + " A"}
      </td>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
        {pvlist.vmp + " V"}
      </td>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
        {pvlist.isc + " A"}
      </td>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
        {pvlist.supplier}
      </td>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
        {"Php " + numberWithCommas(pvlist.price.toFixed(2))}
      </td>
      <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
        <a
          className=" px-4 py-2 mt-2 text-blue-600 visited:text-purple-600"
          target="_blank"
          rel="noopener noreferrer"
          href={pvlist.link}
        >
          {pvlist.link ? "Link" : ""}
        </a>
      </td>

      <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
        <div className="grid lg:grid-row xl:grid-cols-2 gap-4 sm:grid-row md:grid-row">
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

export default SolarPanelItems;
