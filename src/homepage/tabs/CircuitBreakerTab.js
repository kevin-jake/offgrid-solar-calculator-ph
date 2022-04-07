import React, { useContext } from "react";
import { GlobalContext } from "../context/global-context";
import { HomeContext } from "../context/home-context";
import { wireCalculation, wireTotalPrice } from "../Caculations";
import { numberWithCommas } from "../../shared/util/format";

const CircuitBreakerTab = () => {
  const { circuitBreaker, setCB, solarpanelstab, invertertab } =
    useContext(HomeContext);
  const { totalbattcapacity, solarpanel } = useContext(GlobalContext);

  const handleItemChanged = (event, index, key) => {
    console.log(event);
  };

  const renderTR = (obj, index) => {
    return (
      <tr key={"item-" + index} className="bg-white border-b">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {obj.label}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {obj.breakertype}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {obj.computedSize}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {obj.breakerSize}
        </td>
        <td className="flex justify-center px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {obj.computedVdi}
        </td>
        <td className="flex justify-center px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          Php {numberWithCommas(obj.price.toFixed(2))}
        </td>
      </tr>
    );
  };

  return (
    <>
      <div className="grid-row gap-2">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 col-span-2">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-auto">
              <table className="min-w-full my-5">
                <thead className="bg-white border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-lg font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Circuit Breaker Connection
                    </th>
                    <th
                      scope="col"
                      className="text-lg font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Breaker Type
                    </th>
                    <th
                      scope="col"
                      className="text-lg font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Computed Breaker Size
                    </th>
                    <th
                      scope="col"
                      className="text-lg font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Breaker Size
                    </th>
                    <th
                      scope="col"
                      className="text-lg font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {circuitBreaker.data.map((obj, index) => {
                    return renderTR(obj, index);
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CircuitBreakerTab;
