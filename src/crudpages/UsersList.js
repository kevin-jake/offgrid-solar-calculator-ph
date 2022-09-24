import React, { useEffect, useState } from "react";
import { useHttpClient } from "../shared/components/hooks/http-hook";
import UserItems from "./UserItems";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import AlertModal from "../shared/components/UIElements/AlertModal";

const UserList = () => {
  const [usersList, setUsersList] = useState([]);
  const { isLoading, error, sendRequest } = useHttpClient();
  const [refresh, setRefresh] = useState(true);
  const [msg, setMsg] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users"
        );

        setUsersList(responseData.users);
      } catch (err) {}
    };
    fetchUser();
    // eslint-disable-next-line
  }, [sendRequest, refresh]);

  const formInputs = [
    {
      listkey: "name",
      type: "text",
      label: "Name",
    },
    {
      listkey: "email",
      type: "text",
      label: "Email",
    },
    {
      listkey: "mobile_num",
      type: "text",
      label: "Mobile",
    },
    { listkey: "role", type: "text", label: "Role" },
    {
      listkey: "data",
      label: "Data",
    },
  ];

  const onUpdate = (success, operation) => {
    setMsg("");
    if (success && operation === "ADD") {
      setMsg(" User added successfully");
    }
    if (success && operation === "EDIT") {
      setMsg(" User modified successfully");
    }
    if (success && operation === "DELETE") {
      setMsg(" User deleted successfully");
    }
    setRefresh(!refresh);
  };

  const toRender = (list) => {
    if (list.length === 0) {
      return (
        <>
          {isLoading && <LoadingSpinner />}
          <div className="bg-white overflow-hidden sm:rounded-lg pb-8">
            <div className="border-t border-gray-200 text-center pt-8">
              <h1 className="text-6xl font-bold text-gray-400">Empty List</h1>
              <h1 className="text-xl font-medium py-8">No Users found</h1>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="my-2 mx-2 py-6 pb-8 overflow-x-auto border-2 border-blue-400 dark:border-blue-300 rounded-xl relative">
            <div className="relative align-middle mb-5 inline-block min-w-full overflow-hidden bg-white  px-8 pt-3 rounded-bl-lg rounded-br-lg">
              <h4 className="text-medium font-bold">
                Users: {usersList.length}
              </h4>
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                      Mobile
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                      Data
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300"></th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {list.map((UserObj) => (
                    <UserItems
                      key={UserObj.id}
                      userlist={UserObj}
                      formInputs={formInputs}
                      onUpdate={onUpdate}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {error && !isLoading && <AlertModal msg={error} type={"ERROR"} />}
          {msg && <AlertModal msg={msg} type={"SUCCESS"} />}
        </>
      );
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading && usersList && toRender(usersList)}
    </>
  );
};

export default UserList;
