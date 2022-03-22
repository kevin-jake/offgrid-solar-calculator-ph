import React, { useContext, useEffect, useState } from "react";
import InverterSection from "./sections/InverterSection";
import SCCSection from "./sections/SCCSection";
import LoadSection from "./sections/LoadSection";
import SolarPanelSection from "./sections/SolarPanelSection";
import BatterySection from "./sections/BatterySection";
import { GlobalContext } from "./context/global-context";
import { numberWithCommas } from "../shared/util/format";
import { HomeContext } from "./context/home-context";
import { AuthContext } from "../shared/context/auth-context";
import { useHttpClient } from "../shared/components/hooks/http-hook";
import LoadingSpinner from "../shared/components/UIElements/LoadingSpinner";
import AlertModal from "../shared/components/UIElements/AlertModal";
import { Steps } from "intro.js-react";
import "intro.js/introjs.css";

const MainCalculation = () => {
  const {
    voltage,
    totalbattcapacity,
    solarpanel,
    setVoltage,
    overallprice,
    setOverallPrice,
    isValid,
    setValid,
  } = useContext(GlobalContext);
  const {
    loadtab,
    invertertab,
    batterytab,
    solarpanelstab,
    scctab,
    setSCC,
    setLoad,
    setBattery,
    setInverter,
    setPV,
    reset,
  } = useContext(HomeContext);
  const { isLoggedIn, token, userId } = useContext(AuthContext);
  const { isLoading, sendRequest, error, clearError } = useHttpClient();
  const [validState, setValidState] = useState(isValid);
  const [openTab, setOpenTab] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState();
  const [tutEnabled, setTutEnabled] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users/" + userId
        );
        if (responseData.user.data) {
          setLoad(responseData.user.data.loadtab);
          setSCC(responseData.user.data.scc);
          setBattery(responseData.user.data.battery);
          setInverter(responseData.user.data.inverter);
          setPV(responseData.user.data.solarpanel);
          setVoltage(responseData.user.data.voltage_system);
          switch (responseData.user.data.voltage_system) {
            case 12:
              setOpenTab(1);
              break;
            case 24:
              setOpenTab(2);
              break;
            case 48:
              setOpenTab(3);
              break;
            default:
              setOpenTab(1);
              break;
          }
        }
      } catch (err) {}
    };
    if (userId) {
      fetchUser();
    }
    // eslint-disable-next-line
  }, [sendRequest, userId]);

  useEffect(() => {
    setOverallPrice(overallprice);
    // eslint-disable-next-line
  }, [overallprice]);

  useEffect(() => {
    inverterValid(voltage, invertertab.inputVoltage);
    // eslint-disable-next-line
  }, [invertertab.inputVoltage, voltage]);

  useEffect(() => {
    sccValid(
      scctab.type,
      scctab.amprating,
      totalbattcapacity.battvoltage,
      totalbattcapacity.battinseries,
      solarpanel.totalwattage,
      solarpanelstab.isc,
      solarpanel.pvparallel
    );
    // eslint-disable-next-line
  }, [
    scctab.type,
    scctab.amprating,
    totalbattcapacity.voltage,
    totalbattcapacity.battinseries,
    solarpanel.totalwattage,
    solarpanelstab.isc,
    solarpanel.pvparallel,
  ]);

  const inverterValid = (global_voltage, inverter_voltage) => {
    let state = validState;
    if (global_voltage === inverter_voltage || inverter_voltage === 0) {
      state.inverter.valid = true;
      state.inverter.message = "";
      setValidState(state);
      setValid(state);
    } else {
      state.inverter.valid = false;
      state.inverter.message =
        "The inverter voltage is not compatible with voltage system.";
      setValidState(state);
      setValid(state);
    }
  };

  const sccValid = (
    scctype,
    sccAmpRating,
    batteryVoltage,
    batteryInSeries,
    solarTotalWattage,
    pvIsc,
    pvinParallel
  ) => {
    if (batteryInSeries && solarTotalWattage && pvinParallel && pvIsc) {
      let state = validState;
      const totalVoltage = batteryVoltage * batteryInSeries;
      const mpptInputAmps = solarTotalWattage / totalVoltage;
      const pwminput = pvIsc * pvinParallel * 1.25;
      if (scctype === "") {
        state.scc.valid = true;
        state.scc.message = "";
        setValidState(state);
        setValid(state);
      } else if (scctype === "MPPT") {
        if (Math.ceil(mpptInputAmps / 10) * 10 <= sccAmpRating) {
          state.scc.valid = true;
          state.scc.message = "";
        } else {
          state.scc.valid = false;
          state.scc.message =
            "The SCC Ampere Rating is not enough for the panel it needs at least: " +
            Math.ceil(mpptInputAmps / 10) * 10;
        }
        setValidState(state);
        setValid(state);
      } else if (scctype === "PWM") {
        if (Math.ceil(pwminput / 10) * 10 <= sccAmpRating) {
          state.scc.valid = true;
          state.scc.message = "";
        } else {
          state.scc.valid = false;
          state.scc.message =
            "The SCC Ampere Rating is not enough for the panel it needs at least: " +
            Math.ceil(pwminput / 10) * 10;
        }
        setValidState(state);
        setValid(state);
      }
    }
  };

  const handleSaveComputation = async () => {
    clearError();
    console.log(error);
    let datatoPush = {
      uid: userId,
      data: {
        loadtab: loadtab,
        inverter: invertertab,
        battery: batterytab,
        solarpanel: solarpanelstab,
        scc: scctab,
        voltage_system: voltage,
      },
    };
    try {
      setIsSaving(true);
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/users/save",
        "POST",
        JSON.stringify(datatoPush),
        {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        }
      );
      setIsSaving(false);
      setSuccessMsg("Data Saved successfully.");
    } catch (err) {
      setIsSaving(false);
    }
  };

  const priceRender = (voltage) => {
    switch (voltage) {
      case 12:
        return (
          <>{"Php " + numberWithCommas(overallprice.twelveV.toFixed(2))}</>
        );
      case 24:
        return (
          <>{"Php " + numberWithCommas(overallprice.twentyfourV.toFixed(2))}</>
        );
      case 48:
        return (
          <>{"Php " + numberWithCommas(overallprice.fortyeightV.toFixed(2))}</>
        );
      default:
        return <>{"Php 0.00"}</>;
    }
  };

  const steps = [
    {
      title: "Tutorial",
      element: ".body",
      intro:
        "<span> Visit this link for the demo: <a href='https://www.youtube.com/playlist?list=PLW80z4AhKKkfnp5FDuXaMSluTkCWiGqUz' class=' px-4 py-2 mt-2 text-blue-600 visited:text-purple-600' target='_blank' rel='noopener noreferrer' >Click here </a></span>",
    },
  ];

  const onExit = () => {
    setTutEnabled(false);
  };

  const handletutbtn = () => {
    setTutEnabled(true);
  };

  const handleClearAll = () => {
    // setTutEnabled(true);
    reset();
  };

  return (
    <>
      {isLoading && !isSaving && <LoadingSpinner />}
      <section className="bg-white mt-2 dark:bg-gray-900">
        <div className="container-lg px-6 py-8 mx-4 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
          <Steps
            enabled={tutEnabled}
            steps={steps}
            initialStep={0}
            onExit={onExit}
            options={{ showBullets: false, showButtons: false }}
          />
          <div className="grid grid-row xl:grid-cols-2 lg:grid-cols-2 gap-4 relative">
            <h1 className="text-2xl my-4 sm:mb-2 xs:mb-2 font-semibold text-gray-700 capitalize dark:text-white">
              {" "}
              Voltage System{" "}
            </h1>
            <div className="grid grid-row xl:grid-cols-2 lg:grid-cols-2 gap-4 relative px-5 py-2 lg:w-auto lg:absolute lg:bottom-2 lg:right-6 xl:bottom-2 xl:right-6">
              <button
                className="block px-5 py-2 font-medium leading-5 text-center text-white capitalize bg-blue-600 rounded-lg lg:mt-0 hover:bg-blue-500 lg:w-auto"
                onClick={handletutbtn}
              >
                Start Tutorial
              </button>
              <button
                className="block px-5 py-2 font-medium leading-5 text-center text-white capitalize bg-blue-600 rounded-lg lg:mt-0 hover:bg-blue-500 lg:w-auto"
                onClick={handleClearAll}
              >
                Clear all
              </button>
            </div>
          </div>
          <div className=" voltage-system flex overflow-x-auto overflow-y-hidden border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => {
                setVoltage(12);
                setOpenTab(1);
              }}
              className={
                openTab === 1
                  ? "h-10 px-4 py-2 -mb-px text-sm text-center text-blue-600 bg-transparent border-b-2 border-blue-500 sm:text-base dark:border-blue-400 dark:text-blue-300 whitespace-nowrap focus:outline-none"
                  : "h-10 px-4 py-2 -mb-px text-sm text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:text-base dark:text-white whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400"
              }
            >
              12V ≈ {"Php " + numberWithCommas(overallprice.twelveV.toFixed(2))}
            </button>

            <button
              onClick={() => {
                setVoltage(24);
                setOpenTab(2);
              }}
              className={
                openTab === 2
                  ? "h-10 px-4 py-2 -mb-px text-sm text-center text-blue-600 bg-transparent border-b-2 border-blue-500 sm:text-base dark:border-blue-400 dark:text-blue-300 whitespace-nowrap focus:outline-none"
                  : "h-10 px-4 py-2 -mb-px text-sm text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:text-base dark:text-white whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400"
              }
            >
              24V ≈{" "}
              {"Php " + numberWithCommas(overallprice.twentyfourV.toFixed(2))}
            </button>

            <button
              onClick={() => {
                setVoltage(48);
                setOpenTab(3);
              }}
              className={
                openTab === 3
                  ? "h-10 px-4 py-2 -mb-px text-sm text-center text-blue-600 bg-transparent border-b-2 border-blue-500 sm:text-base dark:border-blue-400 dark:text-blue-300 whitespace-nowrap focus:outline-none"
                  : "h-10 px-4 py-2 -mb-px text-sm text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:text-base dark:text-white whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400"
              }
            >
              48V ≈{" "}
              {"Php " + numberWithCommas(overallprice.fortyeightV.toFixed(2))}
            </button>
          </div>
          <div className=" my-6 items-center w-full space-y-4 md:space-x-4 md:space-y-0 flex-col md:flex-row">
            <div className="w-full md:w-3/12 border border-blue-400 dark:border-blue-300 rounded-xl">
              <div className="w-full bg-white dark:bg-gray-700 relative overflow-hidden rounded-xl">
                <div className="flex items-center justify-between px-4 py-6 space-x-4">
                  <div className="flex items-center">
                    <p className="text-lg text-gray-700 dark:text-white ml-2 font-semibold border-b border-gray-200">
                      Total Price
                    </p>
                  </div>
                  <div className="border-b border-gray-200 mt-6 md:mt-0 text-black dark:text-white font-bold text-xl">
                    {priceRender(voltage)}
                  </div>
                </div>
              </div>
            </div>
            {isLoggedIn && (
              <button
                className="float-right px-5 py-2 mt-5 font-medium leading-5 text-center text-white capitalize bg-blue-600 rounded-lg lg:mt-0 hover:bg-blue-500 lg:w-auto"
                onClick={handleSaveComputation}
              >
                <div className="grid  grid-flow-col">
                  Save Computations
                  {isLoading && isSaving && (
                    <>
                      <div className=" inline-block items-center text-lg text-white-700">
                        <svg
                          className="animate-spin ml-4 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      </div>
                    </>
                  )}
                </div>
              </button>
            )}
          </div>
        </div>

        <div className="container-lg px-6 pb-10 mx-4">
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-3 xl:grid-cols-5 ">
            <div className="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
              <LoadSection />
            </div>
            <div
              className={
                validState.inverter.valid
                  ? "transition ease-in-out p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl"
                  : "transition ease-in-out p-8 space-y-3 border-2 border-red-400 dark:border-red-300 bg-red-300 rounded-xl text-red-800"
              }
            >
              <InverterSection errormsg={validState.inverter.message} />
            </div>

            <div className="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
              <BatterySection />
            </div>

            <div className="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
              <SolarPanelSection />
            </div>
            <div
              className={
                validState.scc.valid
                  ? "transition ease-in-out p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl"
                  : "transition ease-in-out p-8 space-y-3 border-2 border-red-400 dark:border-red-300 bg-red-300 rounded-xl text-red-800"
              }
            >
              <SCCSection errormsg={validState.scc.message} />
            </div>
          </div>
        </div>
      </section>
      {error && !isLoading && <AlertModal msg={error} type={"ERROR"} />}
      {successMsg && !isLoading && (
        <AlertModal msg={successMsg} type={"SUCCESS"} />
      )}
    </>
  );
};

export default MainCalculation;
