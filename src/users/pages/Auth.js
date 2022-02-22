import React, { useState, useContext } from "react";
import { useForm } from "../../shared/components/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Input from "../../shared/components/FormElement/Input";
import Button from "../../shared/components/FormElement/Button";

const Auth = () => {
  const { login } = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formstate, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const registerHandler = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };

  const buttonHandler = (e) => {
    e.preventDefault();
    if (!isLoginMode) {
      setFormData(
        { ...formstate.inputs, name: undefined },
        formstate.inputs.email.isValid && formstate.inputs.password.isValid
      );
    } else {
      setFormData(
        { ...formstate.inputs, name: { value: "", isValid: false } },
        false
      );
    }

    login();
    console.log(formstate.inputs);
  };

  return (
    // <div>
    //   <Card className="authentication">
    //     <h2>Login Required</h2>

    //   </Card>
    // </div>
    <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md border-2 border-blue-400 dark:border-blue-300 dark:bg-gray-800">
      <div className="px-6 py-4">
        <h2 className="text-3xl font-bold text-center text-gray-700 dark:text-white">
          LOGIN HERE
        </h2>

        <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
          Login or create account
        </p>

        {/* <form>
          <div className="w-full mt-4">
            <input
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              type="email"
              placeholder="Email Address"
              aria-label="Email Address"
            />
          </div>

          <div className="w-full mt-4">
            <input
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              type="password"
              placeholder="Password"
              aria-label="Password"
            />
          </div>

          <div className="flex items-center justify-between mt-4">
            <a
              href="#"
              className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500"
            >
              Forget Password?
            </a>

            <button
              className="px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none"
              type="button"
            >
              Login
            </button>
          </div>
        </form> */}
        <form>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
            />
          )}
          <Input
            id="email"
            element="input"
            type="email"
            label="Email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email."
            onInput={inputHandler}
          />
          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(8)]}
            errorText="Please enter a valid password (At least 8 characters)."
            onInput={inputHandler}
          />
          <div className="flex items-center">
            {isLoginMode ? (
              <button
                type="submit"
                className={
                  !formstate.isValid
                    ? "w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform text-white capitalize rounded-lg bg-gray-200 lg:mt-0 lg:w-auto cursor-not-allowed"
                    : "w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-600 hover:bg-blue-500 rounded-md focus:outline-none"
                }
                disabled={!formstate.isValid}
                onClick={buttonHandler}
              >
                LOGIN
              </button>
            ) : (
              <button
                inverse
                className={
                  !formstate.isValid
                    ? "w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform text-white capitalize rounded-lg bg-gray-200 lg:mt-0 lg:w-auto cursor-not-allowed"
                    : "w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-600 hover:bg-blue-500 rounded-md focus:outline-none"
                }
                disabled={!formstate.isValid}
                onClick={buttonHandler}
              >
                SIGNUP
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
        {isLoginMode ? (
          <span className="text-sm text-gray-600 dark:text-gray-200">
            {" "}
            New here? Please{" "}
            <a
              href="#"
              className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
              onClick={registerHandler}
            >
              Register
            </a>
          </span>
        ) : (
          <span className="text-sm text-gray-600 dark:text-gray-200">
            {" "}
            Already have an account? Please{" "}
            <a
              href="#"
              className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
              onClick={registerHandler}
            >
              Sign-in
            </a>
          </span>
        )}
      </div>
    </div>
  );
};

export default Auth;
