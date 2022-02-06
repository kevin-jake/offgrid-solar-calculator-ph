import React from "react";
import { numberWithCommas } from "../shared/util/format";
// import { Link } from "react-router-dom";

const InverterItems = ({ invlist }) => {
  return (
    // <li className="user-item">
    //   <Card className="user-item__content">
    //     <Link to={`/${props.id}/places`}>
    //       <div className="user-item__image">
    //         <Avatar image={props.image} alt={props.name} />
    //       </div>
    //       <div className="user-item__info">
    //         <h2>{props.name}</h2>
    //         <h3>
    //           {props.placesCount} {props.placesCount === 1 ? "Place" : "Places"}
    //         </h3>
    //       </div>
    //     </Link>
    //   </Card>
    // </li>
    <tr>
      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
        <div class="text-sm leading-5 text-blue-900">
          {invlist.inverterName}
        </div>
      </td>
      <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
        {invlist.type}
      </td>
      <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
        {invlist.inputVoltage + " V"}
      </td>
      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
        {invlist.efficiency + " %"}
      </td>
      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
        {invlist.wattage + " W"}
      </td>
      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
        {"Php " + numberWithCommas(invlist.price.toFixed(2))}
      </td>
      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
        <a
          className=" px-4 py-2 mt-2 text-blue-600 visited:text-purple-600"
          target="_blank"
          rel="noopener noreferrer"
          href={invlist.link}
        >
          {invlist.link ? "Link" : ""}
        </a>
      </td>

      <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
        <button class="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">
          View Details
        </button>
      </td>
    </tr>
  );
};

export default InverterItems;
