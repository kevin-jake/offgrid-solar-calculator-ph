import React, { useState } from "react";
import MainCalculation from "./MainCalculation";
import "./Home.css";
import NavigateCalculations from "./NavigateCalculations";
import { Steps } from "intro.js-react";
import "intro.js/introjs.css";

const Home = () => {
  const [stepState, setStepState] = useState({
    stepsEnabled: true,
    initialStep: 0,
    steps: [
      {
        element: ".voltage-system",
        intro:
          "This the voltage system. Here you can select which voltage you want your system to have. Each tab have price approximation. <br><br> Note: Approximate values are shown since materials can still change depending on the compatibility",
      },
      {
        element: ".t",
        intro: "World step",
      },
    ],
  });

  const onExit = () => {
    const stateToSet = stepState;
    stateToSet.stepsEnabled = false;
    setStepState(stateToSet);
  };

  return (
    <>
      <Steps
        enabled={stepState.stepsEnabled}
        steps={stepState.steps}
        initialStep={stepState.initialStep}
        onExit={onExit}
      />
      <MainCalculation />
      <NavigateCalculations />
    </>
  );
};

export default Home;
