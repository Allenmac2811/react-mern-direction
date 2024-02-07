import React, { useContext } from "react";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import Input from "../../shared/Components/FormElements/Input";
import Button from "../../shared/Components/FormElements/Button";
import useForm from "../../shared/hooks/form-hook";
import "./NewPlace.css";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/Components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/Components/UIElements/LoadingSpinner";
import { useHistory } from "react-router-dom";
import ImageUpload from "../../shared/Components/FormElements/ImageUpload";

const val = 5;

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendrequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );
  const history = useHistory();
  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    // console.log(formState.inputs);
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("image", formState.inputs.image.value);
      await sendrequest(
        process.env.REACT_APP_API_URL + "/api/places",
        "POST",
        { Authorization: "Bearer " + auth.token },
        formData
      );
      //Redirect user to the different page
      history.push(`/${auth.userId}/places`);
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          lable="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter valid Value"
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          lable="Description"
          validators={[VALIDATOR_MINLENGTH(val)]}
          errorText={`Minimum Length is ${val}`}
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          lable="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText={`Enter Valid Address`}
          onInput={inputHandler}
        />

        <ImageUpload
          center
          id="image"
          onInput={inputHandler}
          errorText="Please provide an image."
        />

        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
