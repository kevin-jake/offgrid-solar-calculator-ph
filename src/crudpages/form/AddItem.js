import React, { useState } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import Backdrop from "../../shared/components/UIElements/Backdrop";
import Select from "react-select";

const AddItemOverlay = ({ onCancel, formInputs, title }) => {
  const [selectedState, setSelectedState] = useState({
    value: "",
    label: "",
  });

  const handleItemChanged = (event) => {
    setSelectedState(event);
  };

  const renderInputs = (obj) => {
    if (obj.type === "select") {
      return (
        <div>
          <label
            className="text-gray-700 dark:text-gray-200"
            htmlFor={obj.listkey}
          >
            {obj.label}
          </label>
          <Select
            className="block w-full py-2 mt-2"
            value={selectedState}
            onChange={handleItemChanged}
            options={obj.options}
          />
        </div>
      );
    }
    if (obj.hasOwnProperty("unit")) {
      if (obj.unit !== "Php") {
        return (
          <div>
            <label
              className="text-gray-700 dark:text-gray-200"
              htmlFor={obj.listkey}
            >
              {obj.label}
            </label>
            <div className="grid grid-cols-2 gap-2 justify-items-start place-items-center">
              <input
                id={obj.listkey}
                type={obj.type}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />{" "}
              {obj.unit}
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <label
              className="text-gray-700 dark:text-gray-200"
              htmlFor={obj.listkey}
            >
              {obj.label}
            </label>
            <div className="justify-items-start place-items-center">
              <span>
                {" "}
                {obj.unit}
                <input
                  id={obj.listkey}
                  type={obj.type}
                  className="inline-block w-3/5 mx-2 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </span>
            </div>
          </div>
        );
      }
    }

    return (
      <div>
        <label
          className="text-gray-700 dark:text-gray-200"
          htmlFor={obj.listkey}
        >
          {obj.label}
        </label>
        <input
          id={obj.listkey}
          type="text"
          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
        />
      </div>
    );
  };
  const content = (
    <div
      id="authentication-modal"
      className="fixed right-0 left-0 top-4 bottom-4 z-50 justify-center items-center h-modal md:h-full md:inset-0 flex"
      aria-modal="true"
      role="dialog"
    >
      <div className="relative px-4 w-full max-w-4xl h-full md:h-auto overflow-y-auto max-h-screen">
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
            <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
              Add New {title}
            </h2>

            <form>
              <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                {formInputs.map((obj) => renderInputs(obj))}
              </div>
              <div className="flex justify-end mt-6">
                <button className="block px-5 py-2 mt-5 font-medium leading-5 text-center text-white capitalize bg-blue-600 rounded-lg lg:mt-0 hover:bg-blue-500 lg:w-auto">
                  Save
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const AddItem = (props) => {
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
        <AddItemOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default AddItem;
