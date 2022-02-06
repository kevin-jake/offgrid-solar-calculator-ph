import React, { useContext } from "react";
import { LOVContext } from "../homepage/tabs/context/lov-context";
import Card from "../shared/components/UIElements/Card";
import InverterItems from "./InverterItems";

const InverterList = () => {
  const { inverters } = useContext(LOVContext);
  console.log(inverters);
  if (inverters.length === 0) {
    return (
      <Card>
        <h2> No Inverters List Found! </h2>
      </Card>
    );
  }
  return (
    <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
      <div class="align-middle inline-block min-w-full overflow-hidden bg-white  px-8 pt-3 rounded-bl-lg rounded-br-lg">
        <table class="min-w-full">
          <thead>
            <tr>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Name
              </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Type
              </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Input Voltage
              </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Efficiency
              </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Wattage
              </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Price
              </th>
              <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Link
              </th>

              <th class="px-6 py-3 border-b-2 border-gray-300"></th>
            </tr>
          </thead>
          <tbody class="bg-white">
            {" "}
            {inverters.map((inverterObj) => (
              <InverterItems invlist={inverterObj} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InverterList;
