import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../Components/PlaceList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/Components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/Components/UIElements/LoadingSpinner";

const UsersPlaces = () => {
  const { isLoading, error, sendrequest, clearError } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState();

  const userId = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendrequest(
          `${process.env.REACT_APP_API_URL}/api/places/user/${userId}`
        );
        setLoadedPlaces(responseData.places);
      } catch (error) {}
    };
    fetchPlaces();
  }, [sendrequest, userId]);

  const deletePlacehandler = (deletedId) => {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedId)
    );
  };

  // const places = loadedPlaces.places.filter((place) => place.creator === userId);
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDelete={deletePlacehandler} />
      )}
    </React.Fragment>
  );
};

export default UsersPlaces;
