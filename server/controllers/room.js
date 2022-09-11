import Room from "../models/room.js";
import User from "../models/user.js";

export const getRooms = async (req, res) => {
  const { userid: userId } = req.params;
  try {
    const user = await User.findById(userId);
    const rooms = await Room.find({ _id: { $in: user.rooms } }).sort({
      UpdatedAt: -1,
    });
    res.status(200).json(rooms);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getRoom = async (req, res) => {
  const { userid: userId, id: roomId } = req.params;
  try {
    const user = await User.findById(userId);
    const room = await Room.findById(roomId);
    if (user.rooms.includes(roomId)) {
      res.status(200).json(room);
    } else {
      res.status(404).json({ message: "Room not found" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createRoom = async (req, res) => {
  const { userid: userId } = req.params;
  const data = req.body;
  try {
    const user = await User.findById(userId);
    const newRoom = new Room({ ...data });
    newRoom.users.push({ userId, userName: user.name });
    await newRoom.save();
    user.rooms.push(newRoom._id);
    await user.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addUserInRoom = async (req, res) => {
  const { userid: userId, id: roomId } = req.params;
  const data = req.body;
  try {
    const user = await User.findById(userId);
    if (user.rooms.includes(roomId)) {
      const room = await Room.findById(roomId);
      if (room.users.length > 6) {
        res.status(404).json({ message: "Cannot add more than seven users" });
      } else {
        const newUser = await User.findById(data.userId);
        if (newUser.rooms.indexOf(roomId) === -1) {
          newUser.rooms.push(roomId);
          await newUser.save();
          room.users.push(data);
          room.UpdatedAt = new Date();
          await room.save();
        }
        res.status(200).json(room);
      }
    } else {
      res.status(404).json({ message: "Room not found" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const removeUserFromRoom = async (req, res) => {
  const { userid: userId, id: roomId } = req.params;
  const data = req.body;
  try {
    const user = await User.findById(userId);
    if (user.rooms.includes(roomId)) {
      const room = await Room.findById(roomId);
      const newUser = await User.findById(data.userId);
      if (newUser.rooms.includes(roomId)) {
          room.users = room.users.filter((u) => u.userId !== data.userId);
          room.UpdatedAt = new Date();
        await room.save();
        newUser.rooms = newUser.rooms.filter((r) => roomId !== r);
        await newUser.save();
        res.status(200).json(room);
      } else {
        res.status(404).json({ message: "User not found in room" });
      }
    } else {
      res.status(404).json({ message: "Room not found" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
