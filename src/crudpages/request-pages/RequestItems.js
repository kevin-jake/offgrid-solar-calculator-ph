import React, { useContext, useState } from "react";
import { useHttpClient } from "../../shared/components/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { numberWithCommas } from "../../shared/util/format";
import RejectModal from "./RejectModal";
import ReviewItem from "./Review";

const RequestItems = ({
  formInputs,
  title,
  data,
  fetchType,
  keyIndex,
  onUpdate,
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { role, token } = useContext(AuthContext);
  const { sendRequest } = useHttpClient();

  delete data.__v;
  delete data._id;

  const openReview = () => {
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

  const onApprove = async (data, title, fetchType) => {
    let datatoPush = data;
    let api_suffix;

    datatoPush.status = "Approved";
    title === "Solar Panel"
      ? (api_suffix = "pv")
      : (api_suffix = title.toLowerCase());
    if (fetchType === "ADD") {
      try {
        await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/" + api_suffix,
          "POST",
          JSON.stringify(datatoPush),
          {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          }
        );
        await sendRequest(
          process.env.REACT_APP_BACKEND_URL +
            "/" +
            api_suffix +
            "/request/" +
            datatoPush.id,
          "PATCH",
          JSON.stringify(datatoPush),
          {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          }
        );
        onUpdate(true, fetchType, title);
      } catch (err) {}
    } else if (fetchType === "EDIT") {
      try {
        await sendRequest(
          process.env.REACT_APP_BACKEND_URL +
            "/" +
            api_suffix +
            "/" +
            datatoPush.id_to_edit,
          "PATCH",
          JSON.stringify(datatoPush),
          {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          }
        );
        await sendRequest(
          process.env.REACT_APP_BACKEND_URL +
            "/" +
            api_suffix +
            "/request/" +
            datatoPush.id,
          "PATCH",
          JSON.stringify(datatoPush),
          {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          }
        );
        onUpdate(true, fetchType, title);
      } catch (err) {}
    }
  };

  const tds = (items, columns) => {
    const objkey = items.listkey;
    let unit;
    items.unit ? (unit = items.unit) : (unit = "");
    if (columns.hasOwnProperty(objkey)) {
      if (objkey === "id") {
        return null;
      }
      if (unit === "Php") {
        return (
          <td
            key={objkey}
            className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5"
          >
            {"Php " + numberWithCommas(columns[objkey].toFixed(2))}
          </td>
        );
      } else if (objkey === "link") {
        return (
          <td
            key={objkey}
            className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5"
          >
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
        return (
          <td
            key={objkey}
            className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5"
          >
            {columns[objkey] + " " + unit}
          </td>
        );
      }
    }
  };

  return (
    <>
      <tr key={keyIndex}>
        {fetchType === "EDIT" && (
          <td
            key="edit"
            className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5"
          >
            {data.id_to_edit}
          </td>
        )}
        {formInputs.map((items) => tds(items, data))}
        <td
          key="creator"
          className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5"
        >
          {data.creator}
        </td>
        <td
          key="btns"
          className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5"
        >
          <div
            className={`grid lg:grid-row  gap-4 sm:grid-row md:grid-row ${
              role === "Admin" ? "xl:grid-row" : ""
            }`}
          >
            <button
              className="inline-flex w-32 items-center border-blue-400 border h-10 px-5 text-blue-700 transition-colors duration-150 bg-white rounded-lg focus:shadow-outline hover:bg-blue-800 hover:text-white"
              onClick={openReview}
            >
              <span className="font-normal mr-3">Review</span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </button>
            <button
              className="inline-flex w-32 items-center border-blue-400 border h-10 px-5 text-blue-700 transition-colors duration-150 bg-white rounded-lg focus:shadow-outline hover:bg-blue-800 hover:text-white"
              onClick={(e) => onApprove(data, title, fetchType)}
            >
              <span className="font-normal mr-3">Approve</span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            <button
              className="inline-flex w-32 items-center border-blue-400 border h-10 px-5 text-blue-700 transition-colors duration-150 bg-white rounded-lg focus:shadow-outline hover:bg-blue-800 hover:text-white"
              onClick={openDelete}
            >
              <span className="font-normal mr-3">Reject</span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </td>
      </tr>
      <ReviewItem
        show={showEditModal}
        onCancel={closeEdit}
        formInputs={formInputs}
        initialValue={data}
        reviewType={fetchType}
        title={title}
      />
      <RejectModal
        show={showDeleteModal}
        onCancel={closeDelete}
        data={data}
        title={title}
      />
    </>
  );
};

export default RequestItems;
