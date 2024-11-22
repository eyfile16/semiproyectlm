import axios from 'axios';

// Configura la baseURL de la API
const api = axios.create({
  baseURL: 'http://localhost:3500/api/', // Aquí debes colocar la URL base de tu API
  headers: {
    'Content-Type': 'application/json',
  },
});

export const postData = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const putData = async (url, data) => {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const getData = async (url) => {
  const response = await fetch(url);
  return response.json();
};
