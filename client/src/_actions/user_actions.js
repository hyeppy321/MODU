import Axios from 'axios';
import { LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER } from './types';

export function registerUser(data) {
  const request = Axios.post(`/api/users/register`, data).then(
    response => response.data,
  );

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function loginUser(data) {
  const request = Axios.post(`/api/users/login`, data).then(
    response => response.data,
  );

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function auth() {
  const request = Axios.get(`/api/users/auth`).then(response => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function logoutUser() {
  const request = Axios.get(`/api/users/logout`).then(
    response => response.data,
  );

  return {
    type: LOGOUT_USER,
    payload: request,
  };
}
