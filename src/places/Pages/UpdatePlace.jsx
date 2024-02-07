import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import Input from "../../shared/Components/FormElements/Input";
import Button from "../../shared/Components/FormElements/Button";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import useForm from "../../shared/hooks/form-hook";
import Card from "../../shared/Components/UIElements/Card";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/Components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/Components/UIElements/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";
import "./NewPlace.css";

const UpdatePlace = () => {
  // const [isLoading, setIsLoading] = useState(true);

  const { isLoading, error, sendrequest, clearError } = useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState();
  const history = useHistory();
  const auth = useContext(AuthContext);
  const placeId = useParams().placeId;
  // console.log(placeId);

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendrequest(
          `${process.env.REACT_APP_API_URL}/api/places/${placeId}`
        );
        setLoadedPlace(responseData.place);
        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (error) {}
    };
    fetchPlace();
  }, [sendrequest, placeId, setFormData]);

  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendrequest(
        `${process.env.REACT_APP_API_URL}/api/places/${placeId}`,
        "PATCH",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        },
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        })
      );
      history.push("/" + auth.userId + "/places");
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPlace && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could Not find Place</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlace && (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            lable="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter valid title"
            initialValue={loadedPlace.title}
            initialValid={true}
            onInput={inputHandler}
          />
          <Input
            id="description"
            element="textarea"
            lable="description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter valid description"
            initialValue={loadedPlace.description}
            initialValid={true}
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPADTE PLACE
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdatePlace;
