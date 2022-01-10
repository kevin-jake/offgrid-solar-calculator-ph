import React, { useState, useContext } from "react";
import Button from "../../shared/components/FormElement/Button";
import Input from "../../shared/components/FormElement/Input";
import { useForm } from "../../shared/components/hooks/form-hook";
import Card from "../../shared/components/UIElements/Card";
import { AuthContext } from "../../shared/context/auth-context";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./Auth.css";

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
    <div>
      <Card className="authentication">
        <h2>Login Required</h2>
        <form className="place-form">
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
          {isLoginMode ? (
            <Button
              type="submit"
              disabled={!formstate.isValid}
              onClick={buttonHandler}
            >
              LOGIN
            </Button>
          ) : (
            <Button
              inverse
              disabled={!formstate.isValid}
              onClick={buttonHandler}
            >
              SIGNUP
            </Button>
          )}
        </form>
        {isLoginMode ? (
          <p>
            {" "}
            New here? Please <button onClick={registerHandler}>Register</button>
          </p>
        ) : (
          <p>
            {" "}
            Already have an account? Please{" "}
            <button onClick={registerHandler}>Sign-in</button>
          </p>
        )}
      </Card>
    </div>
  );
};

export default Auth;
