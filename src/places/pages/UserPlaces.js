import React from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Avengers Tower",
    description: "Avengers is here!",
    imageUrl:
      "https://www.fancypantshomes.com/wp-content/uploads/2020/10/avengers-tower-getting-destroyed-in-the-first-movie.jpg",
    address: "This Is a broken avengers tower",
    location: { lat: 13.9551495, lng: 121.1658146 },
    creator: "u2",
  },
  {
    id: "p2",
    title: "Avengers Tower w/ spidey",
    description: "Avengers is here!",
    imageUrl:
      "https://www.denofgeek.com/wp-content/uploads/2019/06/1-720x405-1.jpg",
    address: "New York City",
    location: { lat: 13.9551495, lng: 121.1658146 },
    creator: "u1",
  },
];

const UserPlaces = (props) => {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);
  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
