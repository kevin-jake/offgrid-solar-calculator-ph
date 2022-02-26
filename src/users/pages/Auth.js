import React, { useState, useContext } from "react";
import { useForm } from "../../shared/components/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Input from "../../shared/components/FormElement/Input";
import { useHttpClient } from "../../shared/components/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import AlertModal from "../../shared/components/UIElements/AlertModal";

const Auth = () => {
  const { login } = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formstate, inputHandler] = useForm(
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

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users/login",
          "POST",
          JSON.stringify({
            email: formstate.inputs.email.value,
            password: formstate.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        return login(
          responseData.userId,
          responseData.token,
          responseData.email,
          responseData.name,
          responseData.role
        );
      } catch (err) {}
    } else {
      try {
        // const formData = new FormData();
        // formData.append("email", formstate.inputs.email.value);
        // formData.append("name", formstate.inputs.name.value);
        // formData.append("password", formstate.inputs.password.value);
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users/signup",
          "POST",
          JSON.stringify({
            email: formstate.inputs.email.value,
            password: formstate.inputs.password.value,
            name: formstate.inputs.name.value,
            role: "User",
          }),
          {
            "Content-Type": "application/json",
          }
        );

        return login(
          responseData.userId,
          responseData.token,
          responseData.email,
          responseData.name,
          responseData.role
        );
      } catch (err) {}
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="w-full max-w-sm mx-auto overflow-hidden mt-4 bg-white rounded-lg shadow-md border-2 border-blue-400 dark:border-blue-300 dark:bg-gray-800">
        <div className="px-6 py-4">
          <h2 className="text-3xl font-bold text-center text-gray-700 dark:text-white">
            LOGIN HERE
          </h2>

          <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
            Login or create account
          </p>
          <form onSubmit={authSubmitHandler}>
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
              validators={[VALIDATOR_MINLENGTH(6)]}
              errorText="Please enter a valid password (At least 8 characters)."
              onInput={inputHandler}
            />
            {isLoginMode ? (
              <button
                type="submit"
                className={
                  !formstate.isValid
                    ? "w-full lg:w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform text-white capitalize rounded-lg bg-gray-200 lg:mt-0 lg:w-auto cursor-not-allowed"
                    : "w-full lg:w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-600 hover:bg-blue-500 rounded-md focus:outline-none"
                }
                disabled={!formstate.isValid}
                // onClick={buttonHandler}
              >
                LOGIN
              </button>
            ) : (
              <button
                type="submit"
                className={
                  !formstate.isValid
                    ? "w-full lg:w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform text-white capitalize rounded-lg bg-gray-200 lg:mt-0 lg:w-auto cursor-not-allowed"
                    : "w-full lg:w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-600 hover:bg-blue-500 rounded-md focus:outline-none"
                }
                disabled={!formstate.isValid}
                // onClick={buttonHandler}
              >
                SIGNUP
              </button>
            )}
          </form>
        </div>

        <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
          {isLoginMode ? (
            <span className="text-sm text-gray-600 dark:text-gray-200">
              {" "}
              New here? Please{" "}
              <button
                className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
                onClick={registerHandler}
              >
                Register
              </button>
            </span>
          ) : (
            <span className="text-sm text-gray-600 dark:text-gray-200">
              {" "}
              Already have an account? Please{" "}
              <button
                className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
                onClick={registerHandler}
              >
                Sign-in
              </button>
            </span>
          )}
        </div>
      </div>
      {error && !isLoading && (
        <AlertModal error={error} type={"ERROR"} clearError={clearError} />
      )}
    </>
  );
};

export default Auth;
