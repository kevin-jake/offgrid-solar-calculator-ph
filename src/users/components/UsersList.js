import React from "react";
import UserItem from "./UserItem";
import Card from "../../shared/components/UIElements/Card";
import "./UsersList.css";

const UsersList = (props) => {
  if (props.item.length === 0) {
    return (
      <Card>
        <h2> No Users Found! </h2>
      </Card>
    );
  }
  return (
    <ul className="users-list">
      {props.item.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          placesCount={user.places}
        />
      ))}
    </ul>
  );
};

export default UsersList;
