import React, { useContext, useState } from "react";
import { AuthContext } from "../shared/context/auth-context";
import { numberWithCommas } from "../shared/util/format";
import DeleteItem from "./form/DeleteItem";
import EditItem from "./form/EditItem";

const UserItems = ({ userlist, formInputs, onUpdate }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { role } = useContext(AuthContext);
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

  const update = (operation) => {
    onUpdate(true, operation);
  };

  const checkData = (data) => {
    let count = 0;

    for (let key in data) {
      // increase the count
      ++count;
    }
    return count;
  };

  return (
    <>
      <tr>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
          <div className="text-sm leading-5 text-blue-900">{userlist.name}</div>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
          {userlist.email}
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
          {userlist.mobile_num}
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
          {userlist.role}
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
          {checkData(userlist.data)}
        </td>
        <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
          <div
            className={`grid lg:grid-row  gap-4 sm:grid-row md:grid-row ${
              role === "Admin" ? "xl:grid-cols-2" : ""
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
        initialValue={userlist}
        onUpdate={update}
        title="Users"
      />
      {role === "Admin" && (
        <>
          <DeleteItem
            show={showDeleteModal}
            onCancel={closeDelete}
            idToDelete={userlist.id}
            onUpdate={update}
            title="Users"
          />
        </>
      )}
    </>
  );
};

export default UserItems;
