import axios from 'axios';

const httpService = axios.create({
  baseURL: 'http://localhost:3500/api/', // Cambia a tu base URL
  timeout: 5000, // Tiempo máximo para las solicitudes
});

// Intercepta cada solicitud para incluir el token
// src/services/apiService.js
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
