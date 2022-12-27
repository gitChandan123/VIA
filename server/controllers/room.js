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

export const deleteRoom = async (req, res) => {
  const { userid: userID, id: roomId } = req.params;
  try {
    const user = await User.findById(userID);
    if (user.rooms.includes(roomId)) {
      const room = await Room.findById(roomId);
      if (room.isProtected === true && room.host === userID) {
        let newUser;
        for (let i = 0; i < room.users.length; i++) {
          newUser = await User.findById(room.users[i].userId);
          if (newUser.rooms.includes(roomId)) {
            newUser.rooms = newUser.rooms.filter((r) => roomId !== r);
            await newUser.save();
          }
        }
        await Room.findByIdAndDelete(roomId);
        res.status(200).json({ message: "Room deleted successfully" });
      } else {
        room.users = room.users.filter((u) => userID !== u.userId);
        user.rooms = user.rooms.filter((r) => roomId !== r);
        room.UpdatedAt = new Date();
        await user.save();
        await room.save();
        res.status(200).json({ message: "Room left successfully" });
      }
    } else {
      res.status(404).json({ message: "Room not found" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const editRoom = async (req, res) => {
  const { userid: userId, id: roomId } = req.params;
  const { isProtected } = req.body;
  try {
    const user = await User.findById(userId);
    if (user.rooms.includes(roomId)) {
      const room = await Room.findById(roomId);
      if (room.host === userId) {
        room.isProtected = isProtected;
        room.UpdatedAt = new Date();
        await room.save();
        res.status(200).json(room);
      } else {
        res
          .status(404)
          .json({ message: "You don't have permission to edit room" });
      }
    } else {
      res.status(404).json({ message: "Room not found" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addUserInRoom = async (req, res) => {
  const { userid: userId, id: roomId } = req.params;
  const { newUserId } = req.body;
  try {
    const user = await User.findById(userId);
    if (user.rooms.includes(roomId)) {
      const room = await Room.findById(roomId);
      if (room.users.length > 6) {
        res.status(404).json({ message: "Cannot add more than seven users" });
      } else {
        if (room.isProtected === false || room.host === userId) {
          const newUser = await User.findById(newUserId);
          if (newUser.rooms.indexOf(roomId) === -1) {
            newUser.rooms.push(roomId);
            await newUser.save();
            room.users.push({ userId: newUserId, userName: newUser.name });
            room.UpdatedAt = new Date();
            await room.save();
          }
          res.status(200).json(room);
        } else {
          res
            .status(404)
            .json({ message: "You don't have permission to add users" });
        }
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
  const { newUserId } = req.body;
  try {
    const user = await User.findById(userId);
    if (user.rooms.includes(roomId)) {
      const room = await Room.findById(roomId);
      const newUser = await User.findById(newUserId);
      if (newUser.rooms.includes(roomId)) {
        if (room.isProtected === false || room.host === userId) {
          room.users = room.users.filter((u) => u.userId !== newUserId);
          room.UpdatedAt = new Date();
          await room.save();
          newUser.rooms = newUser.rooms.filter((r) => roomId !== r);
          await newUser.save();
          res.status(200).json(room);
        } else {
          res
            .status(404)
            .json({ message: "You don't have permission to remove users" });
        }
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

export const postMessage = async (req, res) => {
  const { userid: userId, id: roomId } = req.params;
  const { message } = req.body;

  try {
    const user = await User.findById(userId);
    if (user.rooms.includes(roomId)) {
      const room = await Room.findById(roomId);
      if (room.isProtected === false || room.host === userId) {
        room.messages.push({
          senderId: userId,
          sender: user.name,
          message,
        });
        room.UpdatedAt = new Date();
        const updatedRoom = await Room.findByIdAndUpdate(roomId, room, {
          new: true,
        });
        res.json(updatedRoom);
      } else {
        res.status(404).json({ message: "Only host can send messages" });
      }
    } else {
      res.status(404).json({ message: "Room not found" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
