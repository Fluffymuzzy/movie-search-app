export const isValidImageUrl = (url: string): boolean => {
  const regex = /\.(jpeg|jpg|gif|png)$/i;
  return regex.test(url);
};
