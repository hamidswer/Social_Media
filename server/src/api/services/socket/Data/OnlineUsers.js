export let OnlineUsers = [];

export const setOnlineUsers = (users) => {
  OnlineUsers = users;
};

export const getOnlineUsers = () => {
  return OnlineUsers;
};

export const addANewUser = (data) => {
  if (getOnlineUsers().some((user) => user.userId === data.userId)) {
    setOnlineUsers(
      getOnlineUsers().filter((object) => {
        return object.userId !== data.userId;
      })
    );
  }
  getOnlineUsers().push({ userId: data.userId, socketId: data.socketId });
};

export const removeAUser = (socketId) => {
  setOnlineUsers(getOnlineUsers().filter((user) => user.socketId !== socketId));
};
