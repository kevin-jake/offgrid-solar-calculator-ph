import React, { useEffect, useState } from "react";
import SortUp from "../../Icons/SortUp";
import SortDn from "../../Icons/SortDn";

const sortingData = (a, b, sort) => {
  const fa = a[sort.sortedBy].toLowerCase(),
    fb = b[sort.sortedBy].toLowerCase();
  if (sort.sorting === "asc") {
    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
  } else {
    if (fa > fb) {
      return -1;
    }
    if (fa < fb) {
      return 1;
    }
  }
  return 0;
};

const DataTable = ({ data }) => {
  const [sort, setSort] = useState({ sortedBy: "name", sorting: "asc" });
  const [datadisp, setDataDisp] = useState(
    data.sort((a, b) => sortingData(a, b, sort))
  );
  const columns = data[0] && Object.keys(data[0]);
  const sortables = ["name", "email", "role"];
  console.log(data);
  useEffect(() => {
    setDataDisp(data.sort((a, b) => sortingData(a, b, sort)));
  }, [sort.sortedBy, sort.sorting, data]);

  return (
    <div className="my-2 mx-2 py-6 pb-8 overflow-x-auto border-2 border-blue-400 dark:border-blue-300 rounded-xl relative">
      <div className="align-middle mb-5 inline-block min-w-full overflow-hidden bg-white  px-8 pt-3 rounded-bl-lg rounded-br-lg">
        <table className="min-w-full">
          <thead>
            <tr>
              {datadisp[0] &&
                columns &&
                columns.map((heading) => (
                  <th
                    key={heading}
                    className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
                  >
                    <div className="flex">
                      <div className="flex-1">{heading}</div>
                      {sortables.includes(heading) && (
                        <div className="flex-1">
                          <button
                            onClick={() =>
                              setSort({ sortedBy: heading, sorting: "asc" })
                            }
                          >
                            <SortUp
                              className="inline-block"
                              active={
                                sort.sortedBy === heading &&
                                sort.sorting === "asc"
                              }
                            />
                          </button>
                          <button
                            onClick={() =>
                              setSort({ sortedBy: heading, sorting: "desc" })
                            }
                          >
                            <SortDn
                              className="inline-block"
                              active={
                                sort.sortedBy === heading &&
                                sort.sorting === "desc"
                              }
                            />
                          </button>
                        </div>
                      )}
                    </div>
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {datadisp[0] &&
              datadisp.map((row, index) => (
                <tr key={row.name + index}>
                  {columns &&
                    columns.map((column) => (
                      <td
                        key={column + index}
                        className="px-6 py-4 whitespace-no-wrap border-b border-gray-500"
                      >
                        <div className="text-sm leading-5 text-blue-900">
                          {row[column] + ""}
                        </div>
                      </td>
                    ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
