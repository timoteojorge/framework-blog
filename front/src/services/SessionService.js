import jwtDecode from 'jwt-decode';

function setToken(tokenObj) {
  localStorage.setItem('access_token', tokenObj);
}

function getAccessToken() {
  return localStorage.getItem('access_token');
}

function logout() {
  localStorage.removeItem('access_token');
}

function getLoggedUser() {
  return jwtDecode(localStorage.getItem('access_token'));
}
export default {
  setToken,
  getAccessToken,
  logout,
  getLoggedUser
};