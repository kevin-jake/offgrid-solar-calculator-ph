import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const AlertModal = ({ msg, type }) => {
  useEffect(() => {
    notify(type, msg);
    // eslint-disable-next-line
  }, [msg, type]);

  const notify = (type, message) => {
    switch (type) {
      case "SUCCESS": {
        return toast.custom(
          (t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } relative duration-300 space-x-2 justify-center`}
            >
              <div
                className="flex p-4 mb-4 top-0 right-0 -mt-1 mr-2 items-center text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
                role="alert"
              >
                <svg
                  className="h-8 w-8 text-green-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {" "}
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />{" "}
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <div className="ml-2 inline-block">
                  <span className="font-medium">Success alert!</span> Change a
                  few things up and try submitting again.
                </div>
                <button
                  onClick={() => toast.remove(t.id)}
                  className="border border-transparent p-2 items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <svg
                    className="h-6 w-6 text-red-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <line x1="18" y1="6" x2="6" y2="18" />{" "}
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
          ),
          { duration: 2000 }
        );
      }
      case "ERROR":
        return toast.custom(
          (t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } relative duration-300 space-x-2 justify-center`}
            >
              <div
                className="flex p-4 mb-4 top-0 right-0 -mt-1 mr-2 items-center text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                role="alert"
              >
                <svg
                  className="h-8 w-8 text-red-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {" "}
                  <circle cx="12" cy="12" r="10" />{" "}
                  <line x1="12" y1="8" x2="12" y2="12" />{" "}
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <div className="ml-2 inline-block">
                  <span className="font-medium">ERROR!</span> {message}
                </div>
                <button
                  onClick={() => toast.remove(t.id)}
                  className="border border-transparent p-2 items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <svg
                    className="h-6 w-6 text-red-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <line x1="18" y1="6" x2="6" y2="18" />{" "}
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
          ),
          { duration: 2000 }
        );
      default:
        return <></>;
    }
  };

  return <>{msg && <Toaster />}</>;
};

export default AlertModal;
