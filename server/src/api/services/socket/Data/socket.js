let socket;
export const setSocket = (socketIo) => {
  socket = socketIo;
};

export const getSocket = () => {
  return socket;
};

let io;
export const setIo = (ios) => {
  io = ios;
};

export const getIo = () => {
  return io;
};
