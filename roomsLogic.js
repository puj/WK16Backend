import { rooms } from "./rooms.js";
const getCoordsFromString = (coordinateString) => {
  return {
    x: +coordinateString.split(",")[0],
    y: +coordinateString.split(",")[1],
  };
};

const getStringFromCoordinates = (x, y) => {
  return [x, y].join(",");
};

const makeMove = (coordinates, direction) => {
  switch (direction.toLowerCase()) {
    case "east":
      coordinates.x += 1;
      break;
    case "west":
      coordinates.x -= 1;
      break;
    case "north":
      coordinates.y += 1;
      break;
    case "south":
      coordinates.y -= 1;
      break;
  }
};

const findRoomIdByCoordinates = (coordinates) => {
  // Find the room that matches coordinates
  const room = Object.entries(rooms).find(
    (entry) => entry[1].coordinates == coordinates
  );
  if (room) {
    // Return the index of the room
    return room[0];
  }
  return null;
};

export const getRoomForPlayer = async (player) => {
  return rooms[player.roomId];
};

export const makeAction = async (player, action) => {
  const { type, direction, target } = action;

  // Current room
  const currentRoom = await getRoomForPlayer(player);

  // Get current coords
  const coordinates = getCoordsFromString(currentRoom.coordinates);

  switch (type) {
    // Update coords with move
    case "move":
      makeMove(coordinates, direction);
      break;
  }

  // Find new room based on move
  const coordinateString = getStringFromCoordinates(
    coordinates.x,
    coordinates.y
  );

  const newRoomId = findRoomIdByCoordinates(coordinateString);
  if (newRoomId !== null) {
    // Assign new room to player
    player.roomId = newRoomId;
    console.log("New room id : " + newRoomId);
  }

  await player.save();
  return rooms[player.roomId];
};
