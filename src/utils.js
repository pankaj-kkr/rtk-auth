export const getLoggedInUser = () => {
  const user = localStorage.getItem('user');
  return JSON.parse(user) || null;
};
