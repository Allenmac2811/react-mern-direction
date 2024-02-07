import React from "react";

import Card from "../../shared/Components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import Button from "../../shared/Components/FormElements/Button";
import "./PlaceList.css";

const PlaceList = (props) => {
    // console.log(props.items.length);
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>Places Not Found</h2>
          <Button to="/places/new" >SHARE</Button>
        </Card>
      </div>
    );
  }
  return (
    <ul className="place-list">
      {props.items.map((place) => {
        return <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address = {place.address}
          creatorId = {place.creator}
          coordinates = {place.location}
          onDelete = {props.onDelete}
        />;
      })}
    </ul>
  );
};

export default PlaceList;
