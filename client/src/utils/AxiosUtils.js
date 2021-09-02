import axios from "axios";
import { KEY_AUTH_TOKEN } from "./Constants";

export const jsonContentTypeConfig = {
    headers: {
      'Content-Type': 'application/json',
    }
};

export function setTokenHeader() {
  const authToken = localStorage.getItem(KEY_AUTH_TOKEN)

  if(authToken) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`
  }
}

export function removeTokenHeader() {
  const authToken = localStorage.getItem(KEY_AUTH_TOKEN)

  if(authToken) {
    delete axios.defaults.headers.common['Authorization']
  }
}