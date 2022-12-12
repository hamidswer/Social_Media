export let socket;
export const setSocket = (socketIo) => {
  socket = socketIo;
};

export const getSocket = () => {
  return socket;
};
