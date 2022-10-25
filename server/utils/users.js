const users = [];

const addUser = ({ id, name, userId, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.room === room && user.userId === userId
  );

  if (!name || !room || !userId)
    return { error: "UserId and room are required." };
  if (existingUser) return { error: "UserId is taken." };

  const user = { id, userId, name, room };

  users.push(user);

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

export { addUser, removeUser, getUser };
