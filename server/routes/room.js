import express from "express";
import { getRooms,getRoom,createRoom, addUserInRoom, removeUserFromRoom, postMessage, deleteRoom,editRoom } from "../controllers/room.js";

const router = express.Router();

// Room routes
router.get("/:userid", getRooms);
router.get("/:userid/:id", getRoom);
router.post("/:userid", createRoom);
router.post("/:userid/:id/delete-room", deleteRoom);
router.post("/:userid/:id/edit-room", editRoom);
router.patch("/:userid/:id/add-user", addUserInRoom);
router.patch("/:userid/:id/remove-user", removeUserFromRoom);

// Message routes
router.post("/:userid/:id/message", postMessage);

export default router;
