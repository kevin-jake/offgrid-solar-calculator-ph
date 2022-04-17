import React from "react";

const DataTable = ({ data }) => {
  console.log(data);
  const columns = data[0] && Object.keys(data[0]);

  return (
    <div className="my-2 mx-2 py-6 pb-8 overflow-x-auto border-2 border-blue-400 dark:border-blue-300 rounded-xl relative">
      <div className="align-middle mb-5 inline-block min-w-full overflow-hidden bg-white  px-8 pt-3 rounded-bl-lg rounded-br-lg">
        <table className="min-w-full">
          <thead>
            <tr>
              {data[0] &&
                columns.map((heading) => (
                  <th
                    key={heading}
                    className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
                  >
                    <button>
                      {heading}
                      <svg
                        className="w-4 h-4 inline-block"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                      </svg>
                      <svg
                        class="w-4 h-4 inline-block"
                        fill="none"
                        stroke="lightgray"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        ></path>
                      </svg>
                    </button>
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((row, index) => (
              <tr key={row.name + index}>
                {columns.map((column) => (
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
