interface IUser {
  id: number | string;
  userName: string;
  room: string;
}
const users: IUser[] = [];

export const addUser = ({ id, userName, room }: IUser) => {
  // Clean the data
  userName = userName.trim().toLowerCase();
  room = room.trim().toLowerCase();

  //validate the data

  if (!userName || !room) {
    return {
      error: "userName and Room are required",
    };
  }

  //check for existing user

  const existingUser = users.find((user) => {
    return user.room === room && user.userName === userName;
  });

  //validate userName
  if (existingUser) {
    return {
      error: "userName is in use",
    };
  }

  const user = { id, userName, room };

  users.push(user);

  return { user };
};

export const removeUser = (id: string) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

export const getUser = (id: string) => {
  return users.find((user) => user.id === id);
};

export function getUsersInRoom(room: string) {
  room = room.trim().toLowerCase();
  return users.filter((user) => user.room === room);
}
