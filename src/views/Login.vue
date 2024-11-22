<template>
  <div class="login-container">
    <div class="form-container">
      <h1>Iniciar sesión</h1>
      <form @submit.prevent="handleLogin" class="login-form">
        <p class="login-text">
          <span class="fa-stack fa-lg">
            <i class="fa fa-circle fa-stack-2x"></i>
            <i class="fa fa-lock fa-stack-1x"></i>
          </span>
        </p>
        <input type="email" v-model="username" class="login-username" autofocus required placeholder="Email" />
        <input type="password" v-model="password" class="login-password" required placeholder="Password" />
        <input type="submit" value="Login" class="login-submit" />
      </form>
      <a href="#" class="login-forgot-pass">Forgot password?</a>
      <div class="underlay-black"></div>
    </div>
  </div>
</template>


<script>
import { ref } from 'vue';
import { postData } from '../services/apiService.js';  // Ruta correcta al archivo

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const error = ref(null);

    const router = useRouter('');

    const handleLogin = async () => {
      if (!email.value || !password.value) {
        error.value = 'Por favor ingrese el correo y la contraseña.';
        return;
      }

      try {
        const response = await postData('/usuarios', { email: email.value, contraseña: password.value });
        localStorage.setItem('token', response.token); 
        alert('Inicio de sesión exitoso'); 
        router.push('/');  
      } catch (err) {
        error.value = 'Error al iniciar sesión: ' + (err.response?.data?.msg || err.message);
      }
    };
  }
};
</script>



<style scoped>
/* General styles */
body, html {
  height: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Open Sans', sans-serif;
  background: linear-gradient(to right, #6a11cb, #2575fc); 
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-image: url('https://i.pinimg.com/originals/b4/6c/d0/b46cd069a1837a0a881fe9b45bae456f.gif'); /* Solo una capa de fondo */
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.form-container {
  background: white;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 16px rgba(255, 255, 255, 0.753);
  width: 100%;
  max-width: 450px;
  text-align: center;
  background: transparent;
  border: solid black 2px;
  position: relative;
  z-index: 1;
}


h1 {
  margin-bottom: 20px;
  color: #000000;
  font-size: 32px;
}

.login-text {
  color: rgb(0, 0, 0);
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: center;
}

.login-username, .login-password {
  width: 100%;
  padding: 15px;
  margin-top: 10px;
  border: 1px solid #000000;
  border-radius: 8px;
  font-size: 18px;
  background: transparent;
  transition: all 0.3s ease;
}

.login-username:focus, .login-password:focus {
  border-color: #000000;
  outline: none;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
}

.login-submit {
  width: 100%;
  padding: 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  margin-top: 20px;
  transition: background-color 0.3s ease;
}

.login-submit:hover {
  background-color: #ff0000;
}

.login-forgot-pass {
  margin-top: 10px;
  color: #000000;
  text-decoration: none;
}

.underlay-black {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.329);
  z-index: -1;
}
</style>
