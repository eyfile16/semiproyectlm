<template>
  <div class="table-container">
    <!-- Mensaje de bienvenida y explicación -->
    <div class="welcome-text">
      <h1>Bienvenido a Productos</h1>
      <p>Explora nuestra amplia variedad de productos disponibles. Aquí podrás ver todos los artículos que tenemos en stock. Puedes actualizar la lista de productos en cualquier momento haciendo clic en el botón "Actualizar".</p>
    </div>

    <!-- Tabla de productos -->
    <q-table
      :rows="rows"
      row-key="name"
      flat
      bordered
      class="styled-table"
    >
      <template v-slot:top-right>
        <q-btn label="Actualizar" @click="fetchProductos" color="primary" class="update-btn" />
      </template>
    </q-table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      rows: []
    };
  },
  methods: {
    // Método para obtener los productos desde la API
    fetchProductos() {
      axios.get(`http://localhost:3500/api/articulos${this.selectedCategory}`)
        .then(response => {
          this.rows = response.data;
        })
        .catch(error => {
          console.error('Error al obtener los productos:', error);
        });
    }
  },
  mounted() {
    this.fetchProductos(); // Llamada a la API cuando el componente se monta
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
  background-color: #e0f7fa; /* Resaltado suave cuando se pasa el ratón */
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
  color: #00796b; /* Color distintivo para la primera columna */
}

/* Estilo de los encabezados */
.q-table__header {
  background-color: #00796b;
  color: white;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  padding: 15px 20px;
}

.q-table__header .q-th {
  padding: 12px 20px;
  border-bottom: 2px solid #004d40;
}

/* Estilo del botón de "Actualizar" */
.update-btn {
  margin-top: 15px;
  padding: 12px 24px;
  background-color: #00796b; /* Verde oscuro */
  color: white;
  border-radius: 50px;
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.update-btn:hover {
  background-color: #004d40;
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.update-btn:active {
  background-color: #00332e;
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
