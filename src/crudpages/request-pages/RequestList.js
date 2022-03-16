import React, { useContext, useEffect, useState } from "react";
import { useHttpClient } from "../../shared/components/hooks/http-hook";
import AlertModal from "../../shared/components/UIElements/AlertModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";

import RequestItems from "./RequestItems";

const RequestList = ({ fields, title, fetch }) => {
  const [requestList, setRequestList] = useState([]);
  const { isLoading, error, sendRequest } = useHttpClient();
  const [refresh, setRefresh] = useState(true);
  const { role, token } = useContext(AuthContext);
  const [msg, setMsg] = useState();
  // const [selectedRequest, setSelectedRequest] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      let api_suffix;
      title === "Solar Panel"
        ? (api_suffix = "pv")
        : (api_suffix = title.toLowerCase());
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/" + api_suffix + "/requests",
          "GET",
          null,
          {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          }
        );

        setRequestList(responseData[api_suffix]);
      } catch (err) {}
    };
    fetchRequests();
    // eslint-disable-next-line
  }, [sendRequest, title, refresh]);

  useEffect(() => {
    setMsg("");
  }, [title]);

  const onUpdate = (success, operation, title) => {
    setMsg("");
    if (role === "Admin") {
      if (success && operation === "ADD") {
        setMsg(" " + title + " added successfully");
      }
      if (success && operation === "EDIT") {
        setMsg(" " + title + " modified successfully");
      }
      if (success && operation === "DELETE") {
        setMsg(" " + title + " rejected successfully");
      }
    }
    setRefresh(!refresh);
  };

  const th = (head, index) => {
    return (
      <th
        key={index}
        className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
      >
        {head}
      </th>
    );
  };

  const toRender = (requestlist, fields, title, fetch) => {
    let list = [];
    let header = fields.map((item) => {
      return item.label;
    });
    header = header.filter((item) => item !== "ID");
    if (fetch === "EDIT") {
      list = requestlist.filter(
        (items) =>
          items.hasOwnProperty("id_to_edit") && items.status === "Request"
      );
    } else {
      list = requestlist.filter(
        (items) =>
          !items.hasOwnProperty("id_to_edit") && items.status === "Request"
      );
    }
    if (list.length === 0) {
      return (
        <>
          {isLoading && <LoadingSpinner />}
          <div className="bg-white overflow-hidden sm:rounded-lg pb-8">
            <div className=" text-center pt-8">
              <h1 className="text-xl font-medium py-8">No Requests found</h1>
            </div>
          </div>
          {error && !isLoading && <AlertModal msg={error} type={"ERROR"} />}
          {msg && !isLoading && <AlertModal msg={msg} type={"SUCCESS"} />}
        </>
      );
    } else {
      return (
        <>
          <div className="my-2 mx-2 py-6 pb-8 overflow-x-auto relative">
            <div className="align-middle mb-5 inline-block min-w-full overflow-hidden bg-white  px-8 pt-3 rounded-bl-lg rounded-br-lg">
              <table className="min-w-full">
                <thead>
                  <tr>
                    {fetch === "EDIT" && (
                      <th
                        key="toedit"
                        className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
                      >
                        ID to Edit
                      </th>
                    )}
                    {header.map((head, index) => th(head, index))}
                    <th
                      key="rqst"
                      className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
                    >
                      Requestor
                    </th>
                    <th
                      key="btn"
                      className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider"
                    ></th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {list.map((item, index) => (
                    <RequestItems
                      key={index}
                      keyIndex={index}
                      formInputs={fields}
                      title={title}
                      data={item}
                      fetchType={fetch}
                      onUpdate={onUpdate}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {msg && <AlertModal msg={msg} type={"SUCCESS"} />}
        </>
      );
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading && requestList && toRender(requestList, fields, title, fetch)}
    </>
  );
};

export default RequestList;
