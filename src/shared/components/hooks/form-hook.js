import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE": {
      let formisValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }
        if (inputId === action.inputId) {
          formisValid = formisValid && action.isValid;
        } else {
          formisValid = formisValid && state.inputs[inputId].isValid;
        }
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formisValid,
      };
    }
    case "SET": {
      return {
        inputs: action.inputs,
        isValid: action.formisValid,
      };
    }
    default:
      return state;
  }
};
export const useForm = (initialInputs, initialFormValidity) => {
  const [formstate, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
    // eslint-disable-next-line
  }, []);

  const setFormData = useCallback((inputData, formVaildity) => {
    dispatch({
      type: "SET",
      inputs: inputData,
      formisValid: formVaildity,
    });
    // eslint-disable-next-line
  }, []);
  return [formstate, inputHandler, setFormData];
};
