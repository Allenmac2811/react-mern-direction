import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if(!state.inputs[inputId]){
          continue;
        }
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
      case "SET_DATA":
        return{
          inputs: action.inputs,
          isValid: action.isFormValid
        }
    default:
      return state;
  }
}

const useForm = (initialInputs, InitialFormValidity) => {
  const [formState, dispach] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: InitialFormValidity,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispach({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const setFormData = useCallback((inputData, formValidity)=>{
    dispach({
      type: 'SET_DATA',
      inputs: inputData,
      isFormValid: formValidity
    });
  },[]);

  return [formState, inputHandler, setFormData];
}

export default useForm;
