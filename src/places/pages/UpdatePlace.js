import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import Button from "../../shared/components/FormElement/Button";
import Input from "../../shared/components/FormElement/Input";
import { useForm } from "../../shared/components/hooks/form-hook";
import Card from "../../shared/components/UIElements/Card";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./NewPlace.css";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Avengers Tower",
    description: "Avengers is here!",
    imageUrl:
      "https://www.fancypantshomes.com/wp-content/uploads/2020/10/avengers-tower-getting-destroyed-in-the-first-movie.jpg",
    address: "This Is a broken avengers tower",
    location: { lat: 13.9551495, lng: 121.1658146 },
    creator: "u2",
  },
  {
    id: "p2",
    title: "Avengers Tower w/ spidey",
    description: "Avengers is here!",
    imageUrl:
      "https://www.denofgeek.com/wp-content/uploads/2019/06/1-720x405-1.jpg",
    address: "New York City",
    location: { lat: 13.9551495, lng: 121.1658146 },
    creator: "u1",
  },
];

const UpdatePlace = () => {
  const [isLoading, setLoading] = useState(true);

  const [formstate, inputHandler, setFormData] = useForm(
    {
      title: { value: "", isValid: false },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const placeId = useParams().placeId;

  const places = DUMMY_PLACES.find((p) => p.id === placeId);

  useEffect(() => {
    if (places) {
      setFormData(
        {
          title: { value: places.title, isValid: true },
          description: { value: places.description, isValid: true },
        },
        true
      );
      setLoading(false);
    }
  }, [setFormData, places]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formstate.inputs);
  };
  if (!places) {
    return (
      <div className="center">
        <Card>
          <h2> Could not find place! </h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={submitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={formstate.inputs.title.value}
        initialisValid={formstate.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (minimum of 5 characters)."
        onInput={inputHandler}
        initialValue={formstate.inputs.description.value}
        initialisValid={formstate.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formstate.isValid}>
        {" "}
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
