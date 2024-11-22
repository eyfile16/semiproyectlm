<template>
  <div class="table-container">
    <!-- Mensaje de bienvenida y explicación -->
    <div class="welcome-text">
      <h1>Bienvenido a Categorías</h1>
      <p>En esta sección podrás ver todas las categorías disponibles. Puedes actualizar la lista de categorías en cualquier momento haciendo clic en el botón "Actualizar". Aquí podrás gestionar las categorías de tus productos o servicios.</p>
    </div>

    <!-- Botón de cerrar sesión -->
    <q-btn label="Cerrar sesión" @click="logout" color="negative" />

    <!-- Tabla de categorías -->
    <q-table
      :rows="rows"
      :columns="columns"
      row-key="id"
      flat
      bordered
      class="styled-table"
    >
      <template v-slot:top-right>
        <q-btn 
          label="Actualizar" 
          @click="fetchCategorias" 
          color="primary" 
          class="update-btn" 
          v-if="isAuthenticated" 
        />
      </template>
    </q-table>
  </div>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore.js'; // Importa el store de autenticación

export default {
  data() {
    return {
      rows: [],
      columns: [
        { name: 'id', label: 'ID', field: 'id', align: 'left', sortable: false },
        { name: 'descripcion', label: 'Descripción', field: 'descripcion', align: 'center', sortable: true },
        { name: 'estado', label: 'Estado', field: 'estado', align: 'center', sortable: true },
        { name: 'createdAt', label: 'Creado', field: 'createdAt', align: 'center', sortable: true },
        { name: 'updatedAt', label: 'Actualizado', field: 'updatedAt', align: 'center', sortable: true }
      ]
    };
  },
  computed: {
    isAuthenticated() {
      const authStore = useAuthStore();
      return authStore.isAuthenticated; // Comprobar si el usuario está autenticado
    }
  },
  methods: {
    async fetchCategorias() {
      try {
        const response = await axios.get("http://localhost:3500/api/categorías");
        this.rows = response.data.map(item => ({
          id: item._id,
          descripcion: item.descripcion,
          estado: item.estado ? 'Activo' : 'Inactivo',
          createdAt: new Date(item.createdAt).toLocaleDateString(),
          updatedAt: new Date(item.updatedAt).toLocaleDateString()
        }));
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
        this.$q.notify({
          type: 'negative',
          message: 'No se pudieron cargar las categorías. Intenta nuevamente.',
        });
      }
    },
    logout() {
      const authStore = useAuthStore();
      authStore.logout(); // Llamada al store de Pinia para cerrar sesión
      this.$router.push('/login'); // Redirige a la página de login
    }
  },
  mounted() {
    const authStore = useAuthStore();
    if (authStore.isAuthenticated) {
      this.fetchCategorias(); // Llama a la API si el usuario está autenticado
    } else {
      this.$router.push('/login'); // Redirige si no está autenticado
    }
  }
};
</script>

<style scoped>
/* Contenedor de la tabla y el texto */
.table-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  height: 100vh;
  background: #0088ff;  /* Fondo azul suave */
}

/* Estilo del mensaje de bienvenida */
.welcome-text {
  text-align: center;
  margin-bottom: 30px;
}

.welcome-text h1 {
  font-size: 32px;
  color: #000000;
  font-weight: bold;
  margin-bottom: 10px;
}

.welcome-text p {
  font-size: 18px;
  color: #000000;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
  text-align: center;
}

/* Estilo de la tabla */
.styled-table {
  width: 85%;
  border-radius: 16px;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
  background-color: #fff;
  overflow: hidden;
  transition: all 0.3s ease;
  padding: 20px;
}

.styled-table:hover {
  transform: scale(1.03); /* Efecto de zoom suave */
}

/* Estilo de las filas de la tabla */
.q-table__row:nth-child(odd) {
  background-color: #f9f9f9;  /* Filas alternadas con color suave */
}

.q-table__row:nth-child(even) {
  background-color: #f1f1f1;  /* Filas alternadas */
}

.q-table__row:hover {
  background-color: #c8e6c9; /* Resaltado suave cuando se pasa el ratón */
}

/* Estilo de las celdas */
.q-table__cell {
  font-weight: 500;
  font-size: 15px;
  color: #333;
  padding: 12px 18px;
  text-align: center;
  border-bottom: 1px solid #ccc; /* Bordes sutiles entre celdas */
}

.q-table__cell:first-child {
  font-weight: 600;
  color: #388e3c; /* Color distintivo para la primera columna */
}

/* Estilo de los encabezados */
.q-table__header {
  background-color: #388e3c;
  color: white;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  padding: 15px 20px;
}

.q-table__header .q-th {
  padding: 12px 20px;
  border-bottom: 2px solid #1b5e20;
}

/* Estilo del botón de "Actualizar" */
.update-btn {
  margin-top: 15px;
  padding: 12px 24px;
  background-color: #388e3c; /* Verde oscuro */
  color: white;
  border-radius: 50px;
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.update-btn:hover {
  background-color: #1b5e20;
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.update-btn:active {
  background-color: #004d40;
  transform: translateY(2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Animación de los botones */
.q-btn {
  border-radius: 50px;
  padding: 10px 20px;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.3s ease;
}

.q-btn:hover {
  background-color: #e0e0e0;
}
</style>
