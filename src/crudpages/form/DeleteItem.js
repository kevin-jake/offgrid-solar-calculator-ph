import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import Backdrop from "../../shared/components/UIElements/Backdrop";
import { LOVContext } from "../../homepage/tabs/context/lov-context";

const DeleteItemOverlay = ({ onCancel, idToDelete, title, onUpdate }) => {
  const [content, setContent] = useState(<></>);
  const {
    inverters,
    batterylist,
    pvlist,
    scclist,
    setInvLOV,
    setBatteryLOV,
    setPVLOV,
    setSCCLOV,
  } = useContext(LOVContext);

  useEffect(() => {
    setContent(renderContent());
  }, [inverters, batterylist, pvlist, scclist]);

  const handleDelete = (event, data, title) => {
    event.preventDefault();
    switch (title) {
      case "Battery": {
        let newlist = batterylist;
        let arrindex = newlist.findIndex((x) => x.id === data);
        newlist.splice(arrindex, 1);
        setBatteryLOV(newlist);
        onCancel();
        onUpdate();
        break;
      }
      case "Inverter": {
        let newlist = inverters;
        let arrindex = newlist.findIndex((x) => x.id === data);
        newlist.splice(arrindex, 1);
        setInvLOV(newlist);
        onCancel();
        onUpdate();
        break;
      }
      case "Solar Panel": {
        let newlist = pvlist;
        let arrindex = newlist.findIndex((x) => x.id === data);
        newlist.splice(arrindex, 1);
        console.log(newlist);
        setPVLOV(newlist);
        onCancel();
        onUpdate();
        break;
      }
      case "SCC": {
        let newlist = scclist;
        let arrindex = newlist.findIndex((x) => x.id === data);
        newlist.splice(arrindex, 1);
        console.log(newlist);
        setSCCLOV(newlist);
        onCancel();
        onUpdate();
        break;
      }
    }
    setContent(renderContent());
  };

  const renderContent = () => {
    return (
      <div
        id="authentication-modal"
        className="fixed right-0 left-0 top-4 bottom-4 z-50 justify-center items-center h-modal md:h-full md:inset-0 flex"
        aria-modal="true"
        role="dialog"
      >
        <div className="relative px-4 w-full max-w-2xl h-full md:h-auto overflow-y-auto max-h-screen">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex justify-end p-2">
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                onClick={onCancel}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
              <div className="text-center p-5 flex-auto justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 flex items-center text-red-500 mx-auto"
                  viewBox="0 0 20 20"
                  fill="blue-50"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <h2 className="text-xl font-bold py-4 ">Are you sure?</h2>
                <p className="text-sm text-gray-500 px-8">
                  Do you really want to delete your this row?
                </p>
                <p className="text-sm text-gray-500 px-8">
                  {" "}
                  This process cannot be undone
                </p>
              </div>
              <div className="p-3 grid gap-4 mt-2 grid-cols-2 sm:grid-row">
                <button
                  className="px-5 py-2 font-medium text-center text-gray-600 capitalize bg-white rounded-lg lg:mt-0 hover:bg-blue-500 hover:text-white lg:w-auto tracking-wider border "
                  onClick={onCancel}
                >
                  {" "}
                  Cancel
                </button>
                <button
                  className="px-5 py-2 font-medium text-center text-white capitalize bg-blue-600 rounded-lg lg:mt-0 hover:bg-blue-500 lg:w-auto tracking-wider"
                  onClick={(e) => handleDelete(e, idToDelete, title)}
                >
                  {" "}
                  Delete
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  };
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const DeleteItem = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <DeleteItemOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default DeleteItem;
