import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import Backdrop from "../../shared/components/UIElements/Backdrop";
import Select from "react-select";
import { LOVContext } from "../../homepage/tabs/context/lov-context";
import { validate } from "../../shared/util/validators";
import { getErrorMessage } from "../../shared/util/errorMessages";

const AddItemOverlay = ({ onCancel, formInputs, title, state }) => {
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
  const [selectedState, setSelectedState] = useState({
    value: "",
    label: "",
  });
  const [dataState, setDataState] = useState({});
  const [validState, setValidState] = useState(state);
  const [errorMsg, setErrorMsg] = useState({});

  useEffect(() => {
    setContent(renderContent());
  }, [validState, dataState]);

  const generalValidity = (validators) => {
    let genValid = true;
    for (const key in validators) {
      genValid = genValid && validators[key];
    }
    return genValid;
  };

  const handleItemChanged = (event, objkey, data) => {
    data[objkey] = event.value;
    setSelectedState(event);
    setDataState(data);
  };

  const handleInputChange = (event, objkey, data, validator, label) => {
    data[objkey] = event;
    const errorObj = errorMsg;
    if (validator) {
      let val = event.toString();
      if (val === "0") val = "";
      console.log(val);
      const valid = validate(val, validator);
      if (valid) {
        const stateSet = validState;
        stateSet[objkey] = true;

        validator.forEach((i) => {
          errorObj[objkey] = {
            type: i.type,
            message: "",
          };
        });
        setErrorMsg(errorObj);
        setValidState(stateSet);
        setDataState(data);
        setContent(renderContent());
        console.log(dataState);
      } else {
        const stateSet = validState;
        stateSet[objkey] = false;

        validator.forEach((i) => {
          errorObj[objkey] = {
            type: i.type,
            message: getErrorMessage(i.type, label),
          };
        });
        setErrorMsg(errorObj);
        setValidState(stateSet);
        setContent(renderContent());
        console.log(validState);
      }
    } else setDataState(data);
  };

  const handleSave = (event, data, title) => {
    event.preventDefault();
    if (generalValidity(validState)) {
      switch (title) {
        case "Battery": {
          let newlist = batterylist;
          newlist.push(data);
          setBatteryLOV(newlist);
        }
        case "Inverter": {
          let newlist = inverters;
          console.log(newlist);
          newlist.push(data);
          setInvLOV(newlist);
        }
        case "Solar Panel": {
          let newlist = pvlist;
          newlist.push(data);
          setPVLOV(newlist);
        }
        case "SCC": {
          let newlist = scclist;
          newlist.push(data);
          setSCCLOV(newlist);
        }
      }
    } else {
      console.log("ERROR Validated");
      setContent(renderContent());
    }
  };

  const renderInputs = (obj) => {
    console.log(errorMsg);
    if (obj.type === "select") {
      return (
        <div key={obj.listkey}>
          <label
            className="text-gray-700 dark:text-gray-200"
            htmlFor={obj.listkey}
          >
            {obj.label}
          </label>
          <Select
            className={`block w-full px-4 py-2 mt-2 ${
              validState.hasOwnProperty(obj.listkey)
                ? validState[obj.listkey]
                  ? "text-gray-700 bg-white dark:bg-gray-800 border-gray-200 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300"
                  : "text-red-700 bg-red-50 dark:bg-red-800 border-red-200 dark:text-red-300 dark:border-red-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300"
                : "text-gray-700 bg-white dark:bg-gray-800 border-gray-200 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300"
            }`}
            value={selectedState}
            onChange={(e) =>
              handleItemChanged(e, obj.listkey, dataState, obj.validator)
            }
            options={obj.options}
          />
          <p className="text-red-700 text-xs">
            {errorMsg.hasOwnProperty(obj.listkey) &&
              errorMsg[obj.listkey].message}
          </p>
        </div>
      );
    }
    if (obj.hasOwnProperty("unit")) {
      if (obj.unit !== "Php") {
        return (
          <div key={obj.listkey}>
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
                onChange={(e) =>
                  handleInputChange(
                    Number(e.target.value),
                    obj.listkey,
                    dataState,
                    obj.validator,
                    obj.label
                  )
                }
                className={`block w-full px-4 py-2 mt-2  border rounded-md focus:ring-opacity-40 focus:outline-none focus:ring ${
                  validState.hasOwnProperty(obj.listkey)
                    ? validState[obj.listkey]
                      ? "text-gray-700 bg-white dark:bg-gray-800 border-gray-200 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300"
                      : "text-red-700 bg-red-50 dark:bg-red-800 border-red-200 dark:text-red-300 dark:border-red-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300"
                    : "text-gray-700 bg-white dark:bg-gray-800 border-gray-200 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300"
                }`}
              />{" "}
              {obj.unit}
            </div>
            <p className="text-red-700 text-xs">
              {errorMsg.hasOwnProperty(obj.listkey) &&
                errorMsg[obj.listkey].message}
            </p>
          </div>
        );
      } else {
        return (
          <div key={obj.listkey}>
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
                  onChange={(e) =>
                    handleInputChange(
                      Number(e.target.value),
                      obj.listkey,
                      dataState,
                      obj.validator,
                      obj.label
                    )
                  }
                  className={`block w-full px-4 py-2 mt-2  border rounded-md focus:ring-opacity-40 focus:outline-none focus:ring ${
                    validState.hasOwnProperty(obj.listkey)
                      ? validState[obj.listkey]
                        ? "text-gray-700 bg-white dark:bg-gray-800 border-gray-200 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300"
                        : "text-red-700 bg-red-50 dark:bg-red-800 border-red-200 dark:text-red-300 dark:border-red-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300"
                      : "text-gray-700 bg-white dark:bg-gray-800 border-gray-200 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300"
                  }`}
                />
              </span>
              <p className="text-red-700 text-xs">
                {errorMsg.hasOwnProperty(obj.listkey) &&
                  errorMsg[obj.listkey].message}
              </p>
            </div>
          </div>
        );
      }
    }
    return (
      <div key={obj.listkey}>
        <label
          className="text-gray-700 dark:text-gray-200"
          htmlFor={obj.listkey}
        >
          {obj.label}
        </label>
        <input
          id={obj.listkey}
          onChange={(e) =>
            handleInputChange(
              e.target.value,
              obj.listkey,
              dataState,
              obj.validator,
              obj.label
            )
          }
          type="text"
          className={`block w-full px-4 py-2 mt-2  border rounded-md focus:ring-opacity-40 focus:outline-none focus:ring ${
            validState.hasOwnProperty(obj.listkey)
              ? validState[obj.listkey]
                ? "text-gray-700 bg-white dark:bg-gray-800 border-gray-200 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300"
                : "text-red-700 bg-red-50 dark:bg-red-800 border-red-200 dark:text-red-300 dark:border-red-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300"
              : "text-gray-700 bg-white dark:bg-gray-800 border-gray-200 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300"
          }`}
        />
        <p className="text-red-700 text-xs">
          {errorMsg.hasOwnProperty(obj.listkey) &&
            errorMsg[obj.listkey].message}
        </p>
      </div>
    );
  };
  const renderContent = () => {
    return (
      <div
        id="childcontent"
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

              <form onSubmit={(e) => handleSave(e, dataState, title)}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                  {formInputs.map((obj) => renderInputs(obj))}
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    className="block px-5 py-2 mt-5 font-medium leading-5 text-center text-white capitalize bg-blue-600 rounded-lg lg:mt-0 hover:bg-blue-500 lg:w-auto"
                  >
                    Save
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    );
  };
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const AddItem = (props) => {
  let state = {};
  props.formInputs.forEach((item) => {
    if (item.hasOwnProperty("isValid")) {
      state[item.listkey] = item.isValid;
    }
  });
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
        <AddItemOverlay {...props} state={state} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default AddItem;
