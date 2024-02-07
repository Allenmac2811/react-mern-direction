import React from "react";

import UserItem from "./UserItem";
import Card from "../../shared/Components/UIElements/Card";
import "./UsersList.css";

const UsersList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>Users Not Found</h2>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <ul className="users-list">
        {props.items.map((user) => {
          // console.log(user);
          return (
            <UserItem
              key={user.id}
              id={user.id}
              image={user.image}
              name={user.name}
              placeCount={user.places.length}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default UsersList;
