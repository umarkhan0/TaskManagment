import axios from 'axios';
export const baseURL = "https://task-manager.codionslab.com/api";
export const apiService = axios.create({
  baseURL: 'https://task-manager.codionslab.com/api',
});
let accessToken = localStorage.getItem("Sign")
  const headers = {
  'Authorization': `Bearer ${accessToken}`,
  'Content-Type': 'application/json',
};

export const options = {
  headers: headers,
};

