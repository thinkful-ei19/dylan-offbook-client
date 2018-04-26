export const loadAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const saveAuthToken = authToken => {
  // try {
  localStorage.setItem('authToken', authToken);

};

export const clearAuthToken = () => {
  // try {
  localStorage.removeItem('authToken');
  // } catch (e) { }
};