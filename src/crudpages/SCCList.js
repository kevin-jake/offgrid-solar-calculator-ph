import React, { useContext, useEffect, useState } from "react";
// import { LOVContext } from "../homepage/context/lov-context";
import { useHttpClient } from "../shared/components/hooks/http-hook";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../shared/context/auth-context";
import { VALIDATOR_NUMBER, VALIDATOR_REQUIRE } from "../shared/util/validators";
import AddItem from "./form/AddItem";
import SCCItems from "./SCCItems";

const SCCList = () => {
  // const { scclist } = useContext(LOVContext);
  const [scclist, setSCCList] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const { role } = useContext(AuthContext);

  useEffect(() => {
    const fetchSCC = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/scc"
        );

        setSCCList(responseData.sccs);
      } catch (err) {}
    };
    fetchSCC();
    // eslint-disable-next-line
  }, [sendRequest, refresh]);

  const formInputs = [
    {
      listkey: "id",
      type: "text",
      label: "ID",
    },
    {
      listkey: "sccname",
      type: "text",
      label: "Name",
      validator: [VALIDATOR_REQUIRE()],
    },
    {
      listkey: "type",
      type: "text",
      label: "Type",
      validator: [VALIDATOR_REQUIRE()],
    },
    { listkey: "brand", type: "text", label: "Brand" },
    { listkey: "supplier", type: "text", label: "Supplier" },
    {
      listkey: "amprating",
      type: "text",
      label: "Ampere Rating",
      unit: "A",
      validator: [VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()],
    },
    {
      listkey: "price",
      type: "text",
      label: "Price",
      unit: "Php",
      validator: [VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()],
    },
    // { listkey: "img", type: "text", label: "Image" },
    { listkey: "link", type: "text", label: "Link" },
  ];

  const setModal = () => {
    setShowModal(true);
  };

  const cancelModal = () => {
    setShowModal(false);
  };

  const onUpdate = () => {
    setRefresh(!refresh);
  };

  const toRender = (list) => {
    if (list.length === 0) {
      return (
        <div className="bg-white overflow-hidden sm:rounded-lg pb-8">
          <div className="border-t border-gray-200 text-center pt-8">
            <h1 className="text-6xl font-bold text-gray-400">Empty List</h1>
            <h1 className="text-xl font-medium py-8">No SCC found</h1>
            {role === "Admin" && (
              <>
                <button
                  className="px-5 py-2 mt-5 font-medium leading-5 text-center text-white capitalize bg-blue-600 rounded-lg lg:mt-0 hover:bg-blue-500 lg:w-auto"
                  onClick={setModal}
                >
                  Add Item
                </button>
                <AddItem
                  show={showModal}
                  onCancel={cancelModal}
                  onUpdate={onUpdate}
                  formInputs={formInputs}
                  title="SCC"
                />
              </>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <>
          <div className="my-2 mx-2 py-6 pb-8 overflow-x-auto border-2 border-blue-400 dark:border-blue-300 rounded-xl relative">
            <div className="align-middle mb-5 inline-block min-w-full overflow-hidden bg-white  px-8 pt-3 rounded-bl-lg rounded-br-lg">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                      Brand
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                      Ampere Rating
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                      Supplier
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                      Link
                    </th>
                    {role === "Admin" && (
                      <th className="px-6 py-3 border-b-2 border-gray-300"></th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {scclist.map((obj) => (
                    <SCCItems
                      key={obj.id}
                      scclist={obj}
                      formInputs={formInputs}
                      onUpdate={onUpdate}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            {role === "Admin" && (
              <button
                className="block px-5 py-2 mt-5 font-medium leading-5 text-center text-white capitalize bg-blue-600 rounded-lg lg:mt-0 hover:bg-blue-500 lg:w-auto absolute bottom-2 right-6"
                onClick={setModal}
              >
                Add Item
              </button>
            )}
          </div>
          {role === "Admin" && (
            <AddItem
              show={showModal}
              onCancel={cancelModal}
              onUpdate={onUpdate}
              formInputs={formInputs}
              title="SCC"
            />
          )}
        </>
      );
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading && scclist && toRender(scclist)}
    </>
  );
};

export default SCCList;
