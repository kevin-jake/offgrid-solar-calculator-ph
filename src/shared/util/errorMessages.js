export const getErrorMessage = (errorType, label) => {
  switch (errorType) {
    case "REQUIRE": {
      return label + " is a required field";
    }
    case "NUMBER": {
      return "Enter a valid number for " + label;
    }
    default:
      return "";
  }
};
