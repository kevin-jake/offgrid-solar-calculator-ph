import React from "react";
import Button from "../../shared/components/FormElement/Button";
import Input from "../../shared/components/FormElement/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./NewPlace.css";
import { useForm } from "../../shared/components/hooks/form-hook";

const NewPlaces = () => {
  const [formstate, inputHandler] = useForm(
    {
      inputs: {
        title: {
          value: "",
          isValid: false,
        },
        description: {
          value: "",
          isValid: false,
        },
      },
    },
    false
  );

  const placeSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formstate.inputs);
  };
  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <label></label>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
        errorText="Please enter a valid title."
      />
      <Input
        id="description"
        element="textarea"
        type="text"
        label="Description"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        onInput={inputHandler}
        errorText="Please enter a valid description(at least 5 characters)."
      />
      <Button type="submit" disabled={!formstate.isValid}>
        {" "}
        ADD PLACE{" "}
      </Button>
    </form>
  );
};

export default NewPlaces;
