export const generateMessage = (text?: string, userName?: string) => {
  return {
    text,
    createdAt: new Date().getTime(),
    userName,
  };
};

export const generateLocationMessage = (url: string, userName?: string) => {
  return {
    url,
    userName,
    createdAt: new Date().getTime(),
  };
};
