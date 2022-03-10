import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import Backdrop from "../../shared/components/UIElements/Backdrop";
import Select from "react-select";
import { validate } from "../../shared/util/validators";
import { getErrorMessage } from "../../shared/util/errorMessages";
import { useHttpClient } from "../../shared/components/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import AlertModal from "../../shared/components/UIElements/AlertModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const ReviewItemOverlay = ({
  onCancel,
  formInputs,
  title,
  state,
  defaultData,
  onUpdate,
  reviewType,
}) => {
  const [content, setContent] = useState(<></>);
  const { isLoading, error, sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);

  const [dataState, setDataState] = useState(defaultData);
  const [oldData, setOldData] = useState();
  const [validState, setValidState] = useState(state);
  const [validatorState, setValidator] = useState({});
  const [selectedState, setSelectedState] = useState({
    value: "",
    label: "",
  });
  const [errorMsg, setErrorMsg] = useState({});

  useEffect(() => {
    setContent(renderContent());
    // eslint-disable-next-line
  }, [validState, dataState, selectedState]);

  useEffect(() => {
    const setValid = validatorState;
    formInputs.forEach((i) => {
      if (i.hasOwnProperty("validator")) {
        setValid[i.listkey] = {
          validator: i.validator,
          label: i.label,
        };
      }
    });
    setValidator(setValid);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setDataState(dataState);
    // eslint-disable-next-line
  }, []);
  const validateGeneral = (validator, label, value, objkey) => {
    let returnObj = {};
    const errorObj = errorMsg;
    const stateSet = validState;
    if (validator) {
      let val = value.toString();
      if (val === "0") val = "";
      const valid = validate(val, validator);
      stateSet[objkey] = valid;
      validator.forEach((i) => {
        errorObj[objkey] = {
          type: i.type,
          message: valid ? "" : getErrorMessage(i.type, label),
        };
      });
    }
    returnObj = { stateSet: stateSet, errorObj: errorObj };
    return returnObj;
  };

  const saveValidation = (list, data) => {
    let validatingFields = {};
    list.forEach((i) => {
      const key = i.listkey;
      if (validatorState.hasOwnProperty(key)) {
        if (!(Object.keys(data).length === 0)) {
          // console.log(data);
          if (data.hasOwnProperty(key)) {
            validatingFields[key] = validateGeneral(
              validatorState[key].validator,
              data[key].label,
              data[key].dataval,
              key
            );
          } else {
            validatingFields[key] = validateGeneral(
              validatorState[key].validator,
              validatorState[key].label,
              "",
              key
            );
          }
        } else {
          validatingFields[key] = validateGeneral(
            validatorState[key].validator,
            validatorState[key].label,
            "",
            key
          );
        }
      }
    });
    return validatingFields;
  };

  const handleItemChanged = (event, objkey, data, validator, label) => {
    data[objkey] = {
      dataval: event.value,
      label: label,
    };
    if (validator) {
      const valid = validateGeneral(validator, label, event, objkey);
      setErrorMsg(valid.errorObj);
      setValidState(valid.stateSet);
      setSelectedState(event);
      setDataState(data);
      setContent(renderContent());
    } else {
      setSelectedState(event);
      setDataState(data);
    }
  };

  const handleInputChange = (event, objkey, data, validator, label) => {
    data[objkey] = { dataval: event, label: label };
    const valid = validateGeneral(validator, label, event, objkey);
    const numArray = [
      "voltage",
      "price",
      "priceperpc",
      "battcapacity",
      "voc",
      "imp",
      "vmp",
      "isc",
      "amprating",
      "efficiency",
    ];
    if (numArray.includes(objkey)) {
      data[objkey].dataval = parseFloat(data[objkey].dataval);
    }
    if (validator) {
      setErrorMsg(valid.errorObj);
      setValidState(valid.stateSet);
      setDataState(data);
      setContent(renderContent());
    } else {
      setDataState(data);
      setContent(renderContent());
    }
  };

  const patchToBackend = async (data, title) => {
    let datatoPush = {};
    let api_suffix;
    let method = "PATCH";
    for (const key in data) {
      datatoPush[key] = data[key].dataval;
    }
    title === "Solar Panel"
      ? (api_suffix = "pv")
      : (api_suffix = title.toLowerCase());
    if (auth.role === "User") {
      api_suffix = api_suffix + "/request";
      method = "POST";
    }
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL +
          "/" +
          api_suffix +
          "/" +
          datatoPush.id,
        method,
        JSON.stringify(datatoPush),
        {
          Authorization: "Bearer " + auth.token,
          "Content-Type": "application/json",
        }
      );
      onCancel();
      onUpdate();
      // history.push('/');
    } catch (err) {}
  };

  const fetchIdtoEdit = async (title, id_to_edit) => {
    let api_suffix;
    title === "Solar Panel"
      ? (api_suffix = "pv")
      : (api_suffix = title.toLowerCase());
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/" + api_suffix + "/" + id_to_edit,
        "GET",
        null,
        {
          Authorization: "Bearer " + auth.token,
          "Content-Type": "application/json",
        }
      );
      setOldData(responseData[api_suffix]);
    } catch (err) {}
  };

  const handleSave = (event, data, title) => {
    event.preventDefault();
    switch (title) {
      case "Battery": {
        let validatingFields = saveValidation(formInputs, data);
        let saveValid = true;
        for (const key in validatingFields) {
          saveValid = saveValid && validatingFields[key].stateSet[key];
        }
        if (saveValid) {
          patchToBackend(data, title);
        }
        break;
      }
      case "Inverter": {
        let validatingFields = saveValidation(formInputs, data);
        let saveValid = true;
        for (const key in validatingFields) {
          saveValid = saveValid && validatingFields[key].stateSet[key];
        }
        if (saveValid) {
          patchToBackend(data, title);
        }
        break;
      }
      case "Solar Panel": {
        let validatingFields = saveValidation(formInputs, data);
        let saveValid = true;
        for (const key in validatingFields) {
          saveValid = saveValid && validatingFields[key].stateSet[key];
        }
        if (saveValid) {
          patchToBackend(data, title);
        }
        break;
      }
      case "SCC": {
        let validatingFields = saveValidation(formInputs, data);
        let saveValid = true;
        for (const key in validatingFields) {
          saveValid = saveValid && validatingFields[key].stateSet[key];
        }
        if (saveValid) {
          patchToBackend(data, title);
        }
        break;
      }
      default:
        return null;
    }
    setContent(renderContent());
  };

  const renderInputs = (obj, data) => {
    // console.log(obj);
    // console.log(data);
    if (obj.type === "select") {
      const index = obj.options.findIndex(
        (x) => x.value === data[obj.listkey].dataval
      );
      // console.log(obj.options[index]);
      return (
        <div key={obj.listkey}>
          <label
            className="text-gray-700 dark:text-gray-200"
            htmlFor={obj.listkey}
          >
            {obj.label}
            {obj.validator && "*"}
          </label>
          <Select
            className={`block w-full px-4 py-2 mt-2 ${
              validState.hasOwnProperty(obj.listkey)
                ? validState[obj.listkey]
                  ? "text-gray-700 bg-white dark:bg-gray-800 border-gray-200 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300"
                  : "text-red-700 bg-red-50 dark:bg-red-800 border-red-200 dark:text-red-300 dark:border-red-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300"
                : "text-gray-700 bg-white dark:bg-gray-800 border-gray-200 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300"
            }`}
            defaultValue={
              selectedState.value === "" ? obj.options[index] : selectedState
            }
            onChange={(e) =>
              handleItemChanged(
                e,
                obj.listkey,
                dataState,
                obj.validator,
                obj.label
              )
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
              <span>
                {obj.label}{" "}
                <p className="inline-block text-red-700 text-sm font-bold">
                  {obj.validator && " *"}
                </p>
              </span>
            </label>
            <div className="grid grid-cols-2 gap-2 justify-items-start place-items-center">
              <input
                id={obj.listkey}
                defaultValue={data[obj.listkey].dataval}
                type={obj.type}
                onChange={(e) =>
                  handleInputChange(
                    e.target.value,
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
              <span>
                {obj.label}{" "}
                <p className="inline-block text-red-700 text-sm font-bold">
                  {obj.validator && " *"}
                </p>
              </span>
            </label>
            <div className="justify-items-start place-items-center">
              <span>
                {" "}
                {obj.unit}
                <input
                  id={obj.listkey}
                  type={obj.type}
                  defaultValue={data[obj.listkey].dataval}
                  onChange={(e) =>
                    handleInputChange(
                      e.target.value,
                      obj.listkey,
                      dataState,
                      obj.validator,
                      obj.label
                    )
                  }
                  className={`inline-block w-3/5 mx-2 px-4 py-2 mt-2 border rounded-md focus:ring-opacity-40 focus:outline-none focus:ring ${
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
    if (obj.listkey === "id") {
      return <></>;
    }
    return (
      <div key={obj.listkey}>
        <label
          className="text-gray-700 dark:text-gray-200"
          htmlFor={obj.listkey}
        >
          <span>
            {obj.label}{" "}
            <p className="inline-block text-red-700 text-sm font-bold">
              {obj.validator && " *"}
            </p>
          </span>
        </label>
        <input
          id={obj.listkey}
          defaultValue={data[obj.listkey].dataval}
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

  const renderInputsEdit = (obj, data, title) => {
    fetchIdtoEdit(title, data.id_to_edit.dataval);
    if (obj.type === "select") {
      const index = obj.options.findIndex(
        (x) => x.value === data[obj.listkey].dataval
      );
      // console.log(obj.options[index]);
      return (
        <div key={obj.listkey}>
          <label
            className="text-gray-700 dark:text-gray-200"
            htmlFor={obj.listkey}
          >
            {obj.label}
            {obj.validator && "*"}
          </label>
          <Select
            className={`block w-full px-4 py-2 mt-2 ${
              validState.hasOwnProperty(obj.listkey)
                ? validState[obj.listkey]
                  ? "text-gray-700 bg-white dark:bg-gray-800 border-gray-200 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300"
                  : "text-red-700 bg-red-50 dark:bg-red-800 border-red-200 dark:text-red-300 dark:border-red-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300"
                : "text-gray-700 bg-white dark:bg-gray-800 border-gray-200 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300"
            }`}
            defaultValue={
              selectedState.value === "" ? obj.options[index] : selectedState
            }
            onChange={(e) =>
              handleItemChanged(
                e,
                obj.listkey,
                dataState,
                obj.validator,
                obj.label
              )
            }
            options={obj.options}
          />
          <input
            id={obj.listkey}
            type="text"
            className="block w-full px-4 py-2 mt-2 text-gray-700 rounded-md bg-blue-50 font-medium"
            disabled={true}
            value={oldData[obj.listkey]}
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
              <span>
                {obj.label}{" "}
                <p className="inline-block text-red-700 text-sm font-bold">
                  {obj.validator && " *"}
                </p>
              </span>
            </label>
            <div className="grid grid-cols-2 gap-2 justify-items-start place-items-center">
              <input
                id={obj.listkey}
                defaultValue={data[obj.listkey].dataval}
                type={obj.type}
                onChange={(e) =>
                  handleInputChange(
                    e.target.value,
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
              <span>
                {obj.label}{" "}
                <p className="inline-block text-red-700 text-sm font-bold">
                  {obj.validator && " *"}
                </p>
              </span>
            </label>
            <div className="justify-items-start place-items-center">
              <span>
                {" "}
                {obj.unit}
                <input
                  id={obj.listkey}
                  type={obj.type}
                  defaultValue={data[obj.listkey].dataval}
                  onChange={(e) =>
                    handleInputChange(
                      e.target.value,
                      obj.listkey,
                      dataState,
                      obj.validator,
                      obj.label
                    )
                  }
                  className={`inline-block w-3/5 mx-2 px-4 py-2 mt-2 border rounded-md focus:ring-opacity-40 focus:outline-none focus:ring ${
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
    if (obj.listkey === "id") {
      return <></>;
    }
    return (
      <div key={obj.listkey}>
        <label
          className="text-gray-700 dark:text-gray-200"
          htmlFor={obj.listkey}
        >
          <span>
            {obj.label}{" "}
            <p className="inline-block text-red-700 text-sm font-bold">
              {obj.validator && " *"}
            </p>
          </span>
        </label>
        <input
          id={obj.listkey}
          defaultValue={data[obj.listkey].dataval}
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
      <>
        {isLoading && <LoadingSpinner />}
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
                  {reviewType === "ADD"
                    ? "Add " + title + " Review"
                    : "Edit " +
                      title +
                      " Review (ID to Edit: " +
                      dataState.id.dataval +
                      ")"}
                </h2>

                <form onSubmit={(e) => handleSave(e, dataState, title)}>
                  <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    {reviewType === "ADD"
                      ? formInputs.map((obj) => renderInputs(obj, dataState))
                      : formInputs.map((obj) =>
                          renderInputsEdit(obj, dataState, title)
                        )}
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
        {error && !isLoading && <AlertModal msg={error} type={"ERROR"} />}
      </>
    );
  };
  // console.log(dataState);
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const ReviewItem = (props) => {
  let state = {};

  let datatoSet = {};
  for (const key in props.initialValue) {
    let labelset = "";
    props.formInputs.forEach((i) => {
      if (i.listkey === key) labelset = i.label;
    });
    datatoSet[key] = {
      dataval: props.initialValue[key],
      label: labelset,
    };
  }
  props.formInputs.forEach((item) => {
    if (item.hasOwnProperty("validator")) {
      state[item.listkey] = true;
    }
  });
  delete datatoSet.__v;
  delete datatoSet._id;
  // console.log(datatoSet);
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
        <ReviewItemOverlay {...props} state={state} defaultData={datatoSet} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default ReviewItem;
