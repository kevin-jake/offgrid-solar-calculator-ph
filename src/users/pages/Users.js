import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "I love you Sheena",
      image: "https://www.w3schools.com/w3images/avatar5.png",
      places: 3,
    },
  ];

  return <UsersList item={USERS} />;
};

export default Users;
