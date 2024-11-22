import { defineStore } from 'pinia';
import { postData } from '../services/apiService.js';  // Verifica la ruta correcta

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false,
    user: JSON.parse(localStorage.getItem('user')) || null,
    errorMessage: '',
  }),

  actions: {
    async login(userData) {
      try {
        if (userData) {
          this.isAuthenticated = true;
          this.user = userData;  // Almacenamos los datos del usuario recibido
          this.errorMessage = '';

          // Llamada al servicio para autenticar al usuario, si es necesario
          const response = await postData('/usuarios/login', userData);
          console.log(response); // Puedes revisar lo que devuelve la API

          // Almacenar en localStorage
          localStorage.setItem('isAuthenticated', JSON.stringify(this.isAuthenticated));
          localStorage.setItem('user', JSON.stringify(this.user));

          console.log('Inicio de sesión exitoso');
        } else {
          this.errorMessage = 'Credenciales inválidas.';
        }
      } catch (error) {
        this.errorMessage = 'Error al procesar los datos del usuario.';
        console.error('Error en login:', error);
      }
    },

    async logout() {
      this.isAuthenticated = false;
      this.user = null;
      this.errorMessage = '';

      // Limpiar el estado en localStorage
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');

      console.log('Sesión cerrada correctamente');
    },
  },
});
