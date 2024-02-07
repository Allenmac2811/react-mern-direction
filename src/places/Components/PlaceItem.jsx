import React from "react";
import { useState, useContext } from "react";

import Card from "../../shared/Components/UIElements/Card";
import Button from "../../shared/Components/FormElements/Button";
import Modal from "../../shared/Components/UIElements/Modal";
import Map from "../../shared/Components/UIElements/Map";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/Components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/Components/UIElements/LoadingSpinner";
import "./PlaceItem.css";

const PlaceItem = (props) => {
  // console.log(props);

  const auth = useContext(AuthContext);

  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setshowConfirmModal] = useState(false);
  const { isLoading, error, sendrequest, clearError } = useHttpClient();

  const openMapHandler = () => {
    setShowMap(true);
  };
  const closeMapHandler = () => {
    setShowMap(false);
  };

  const openDeletewindow = () => {
    setshowConfirmModal(true);
  };

  const closeDeletewindow = () => {
    setshowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setshowConfirmModal(false);

    try {
      await sendrequest(
        `${process.env.REACT_APP_API_URL}/api/places/${props.id}`,
        "DELETE",
        { Authorization: "Bearer " + auth.token }
      );
      props.onDelete(props.id);
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>

      <Modal
        show={showConfirmModal}
        onCancel={closeDeletewindow}
        header="Are you Sure?"
        footerClass="place-item__model-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={closeDeletewindow}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          You want to delete <span style={{ color: "red" }}>{props.title}</span>{" "}
        </p>
      </Modal>

      <li className="place-item">
        <Card className="place.item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="place-item__image">
            <img
              src={`${process.env.REACT_APP_API_URL}/${props.image}`}
              alt={props.title}
            ></img>
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.aaddress}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>

            {auth.userId === props.creatorId && (
              <Button to={`/places/${props.id}`}>EDIT</Button>
            )}
            {auth.userId === props.creatorId && (
              <Button onClick={openDeletewindow} danger>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
