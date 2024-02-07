import React, { useReducer, useEffect } from "react";

import { validate } from '../../util/validators'
import "./Input.css";

const inputReducer = (state, action) => {
    // console.log(action.validators);
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
      case "TOUCH":
      return{
        ...state,
        isTouched:true
      }
    default:
      return state;
  }
};

const Input = (props) => {
    // console.log(props.validators);
  const [inputState, dispach] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isValid: props.initialValid || false,
    isTouched: false
  });

  const {id, onInput} = props
  const {value , isValid} = inputState


  useEffect(()=>{
//sending validation back
   onInput(id, value, isValid);
  },[id, onInput, value, isValid]);


  const changeHandler = (event) => {
    dispach({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators
    });
  };

  const TouchHandler =()=>{
    dispach({
        type:"TOUCH"
    })
  }

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={TouchHandler}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={TouchHandler}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.lable}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
