import React from "react";
import { Link } from "react-router-dom";
import { useGetRoomsQuery } from "../redux/api";

const Rooms = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { data, isSuccess, isError, error } = useGetRoomsQuery({
    userId: user._id,
  });

  return (
    <div>
      <h1>Rooms</h1>
      {isSuccess && data.length && (
        <ul>
          {data.map((room) => (
            <Link
              key={room._id}
              to={`/room/${room._id}`}
              style={{ textDecoration: "none" }}
            >
              <li>{room.name}</li>
            </Link>
          ))}
        </ul>
      )}
      {isError && <p>{error.message}</p>}
    </div>
  );
};

export default Rooms;
