import React, { useContext, useState } from "react";
import { AuthContext } from "../shared/context/auth-context";
import { numberWithCommas } from "../shared/util/format";
import DeleteItem from "./form/DeleteItem";
import EditItem from "./form/EditItem";

const RequestItems = ({ formInputs, title, data, fetchType }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { role } = useContext(AuthContext);

  delete data.__v;
  delete data._id;

  const openEdit = () => {
    setShowEditModal(true);
  };

  const closeEdit = () => {
    setShowEditModal(false);
  };

  const openDelete = () => {
    setShowDeleteModal(true);
  };

  const closeDelete = () => {
    setShowDeleteModal(false);
  };

  const tds = (items, columns) => {
    let returntds = [<></>];
    const objkey = items.listkey;
    let unit;
    items.unit ? (unit = items.unit) : (unit = "");
    if (columns.hasOwnProperty(objkey)) {
      if (objkey === "id") {
        return <></>;
      }
      if (unit === "Php") {
        returntds.push(
          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
            {"Php " + numberWithCommas(columns[objkey].toFixed(2))}
          </td>
        );
      } else if (objkey === "link") {
        returntds.push(
          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
            <a
              className=" px-4 py-2 mt-2 text-blue-600 visited:text-purple-600"
              target="_blank"
              rel="noopener noreferrer"
              href={columns[objkey]}
            >
              {columns[objkey]}
            </a>
          </td>
        );
      } else {
        returntds.push(
          <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
            {columns[objkey] + " " + unit}
          </td>
        );
      }
    }
    return returntds;
  };

  const rendertds = (formInputs, data) => {
    let mapArr = formInputs;
    return mapArr.map((items) => {
      return <>{tds(items, data)}</>;
    });
  };

  return (
    <>
      <tr>
        {fetchType === "EDIT" && (
          <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
            {data.id_to_edit}
          </td>
        )}
        {rendertds(formInputs, data, fetchType)}

        <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
          <div
            className={`grid lg:grid-row  gap-4 sm:grid-row md:grid-row ${
              role === "Admin" ? "xl:grid-row" : ""
            }`}
          >
            <button
              className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none md:row-span-auto"
              onClick={openEdit}
            >
              Edit
            </button>
            {role === "Admin" && (
              <button
                className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none md:row-span-auto"
                onClick={openDelete}
              >
                Delete
              </button>
            )}
          </div>
        </td>
      </tr>
      <EditItem
        show={showEditModal}
        onCancel={closeEdit}
        formInputs={formInputs}
        initialValue={data}
        // onUpdate={update}
        title={title + " Request"}
      />
      {role === "Admin" && (
        <>
          <DeleteItem
            show={showDeleteModal}
            onCancel={closeDelete}
            idToDelete={data.id}
            // onUpdate={update}
            title={title + " Request"}
          />
        </>
      )}
    </>
  );
};

export default RequestItems;
