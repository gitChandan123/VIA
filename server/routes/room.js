import express from "express";
import { getRooms,getRoom,createRoom, addUserInRoom, removeUserFromRoom } from "../controllers/room.js";

const router = express.Router();
router.get("/:userid", getRooms);
router.get("/:userid/:id", getRoom);
router.post("/:userid", createRoom);
router.patch("/:userid/:id/add-user", addUserInRoom);
router.patch("/:userid/:id/remove-user", removeUserFromRoom);

export default router;
