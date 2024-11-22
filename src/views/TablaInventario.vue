<template>
  <q-layout view="hHh lpR fff">
    <!-- Cabecera -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <q-avatar>
            <img src="/src/img/VeniceAI_WJMVgP8.png" />
          </q-avatar>
          TECNO
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- Menú lateral izquierdo -->
    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-list>
        <router-link to="/productos" class="router-link">
          <q-item clickable>
            <q-item-section avatar>
              <q-icon name="shopping_cart" />
            </q-item-section>
            <q-item-section>Productos</q-item-section>
          </q-item>
        </router-link>
        <router-link to="/servicios" class="router-link">
          <q-item clickable>
            <q-item-section avatar>
              <q-icon name="build" />
            </q-item-section>
            <q-item-section>Articulos</q-item-section>
          </q-item>
        </router-link>
        <router-link to="/clientes" class="router-link">
          <q-item clickable>
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section>Provedores</q-item-section>
          </q-item>
        </router-link>
        <router-link to="/categorias" class="router-link">
          <q-item clickable>
            <q-item-section avatar>
              <q-icon name="category" />
            </q-item-section>
            <q-item-section>Categorías</q-item-section>
          </q-item>
        </router-link>
        <!-- Botón de Cerrar Sesión -->
        <q-item clickable @click="logout">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section>Cerrar Sesión</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Contenido principal -->
    <q-page-container>
      <q-page class="q-pa-md">
        <!-- Historia de la empresa -->
        <div class="q-mb-xl">
          <q-card flat bordered class="q-pa-lg q-card-expanded">
            <q-card-section>
              <div class="text-h4 text-primary text-center">Nuestra Historia</div>
              <div class="text-subtitle1 text-justify q-mt-md">
                Desde su fundación en el año 2000, nuestra empresa ha trabajado
                arduamente para convertirse en un referente dentro de la
                industria. Nos enorgullece haber mantenido siempre un enfoque
                centrado en la calidad, la innovación y la satisfacción de
                nuestros clientes.
                <br /><br />
                A lo largo de los años, hemos superado desafíos significativos
                que nos han hecho más fuertes y resilientes. Con una visión
                clara de futuro, seguimos comprometidos con el crecimiento
                sostenible, la excelencia operativa y la responsabilidad social
                corporativa.
                <br /><br />
                Creemos que nuestro éxito no sería posible sin el increíble
                equipo de profesionales que trabaja incansablemente cada día
                para ofrecer lo mejor. Gracias a su dedicación, continuamos
                expandiéndonos, implementando nuevas tecnologías y estableciendo
                estándares más altos en el mercado.
              </div>
              <div class="q-mt-lg text-center">
                <img
                  src="https://ethic.es/wp-content/uploads/2023/10/fecha-caducidad-empresas.png"
                  alt="Nuestra historia"
                  class="responsive-image"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Empleados del mes -->
        <div class="q-mt-xl">
          <q-card flat bordered class="q-pa-lg q-card-expanded">
            <q-card-section>
              <div class="text-h4 text-primary text-center">
                Empleados del Mes
              </div>
              <div class="q-mt-lg q-employee-grid">
                <!-- Empleado 1 -->
                <q-card
                  flat
                  bordered
                  class="q-pa-md q-employee-card"
                  v-for="empleado in empleadosMes"
                  :key="empleado.nombre"
                >
                  <q-card-section class="text-center">
                    <q-avatar size="120px" class="q-mb-md">
                      <img :src="empleado.imagen" :alt="empleado.nombre" />
                    </q-avatar>
                    <div class="text-h6">{{ empleado.nombre }}</div>
                    <div class="text-subtitle2 text-primary">
                      {{ empleado.departamento }}
                    </div>
                  </q-card-section>
                  <q-card-section>
                    <div class="text-caption q-mt-md text-justify">
                      "{{ empleado.frase }}"
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Derechos de los empleados -->
        <div class="q-mt-xl">
          <q-card flat bordered class="q-pa-lg q-card-expanded">
            <q-card-section>
              <div class="text-h4 text-primary text-center">
                Derechos de los Empleados
              </div>
              <div class="q-mt-md text-subtitle1">
                Nuestros empleados tienen derecho a:
                <ul class="q-mt-sm">
                  <li>Un ambiente de trabajo seguro y saludable.</li>
                  <li>Acceso a formación y desarrollo profesional.</li>
                  <li>Compensación justa y beneficios.</li>
                  <li>Respetar sus horarios y tiempos de descanso.</li>
                  <li>
                    Acceder a oportunidades de crecimiento dentro de la empresa.
                  </li>
                  <li>
                    Participar en decisiones que afecten su entorno laboral.
                  </li>
                </ul>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const leftDrawerOpen = ref(false);

    // Lista de empleados destacados
    const empleadosMes = ref([
      {
        nombre: "Juan Pérez",
        departamento: "Ventas",
        imagen:
          "https://static1.thegamerimages.com/wordpress/wp-content/uploads/2022/01/Emo.png?q=50&fit=crop&w=825&dpr=1.5",
        frase: "¡Trabajamos con pasión para lograr nuestros objetivos!",
      },
      {
        nombre: "Ana García",
        departamento: "Marketing",
        imagen:
          "https://static1.thegamerimages.com/wordpress/wp-content/uploads/2022/01/Dragon.jpg?q=50&fit=crop&w=825&dpr=1.5",
        frase: "La creatividad es nuestra mayor fortaleza.",
      },
      {
        nombre: "Carlos López",
        departamento: "Finanzas",
        imagen:
          "https://static1.thegamerimages.com/wordpress/wp-content/uploads/2022/01/Monkey.png?q=50&fit=crop&w=825&dpr=1.5",
        frase:
          "Los números no mienten, pero siempre los encontramos de manera creativa.",
      },
      {
        nombre: "María Rodríguez",
        departamento: "Recursos Humanos",
        imagen:
          "https://static1.thegamerimages.com/wordpress/wp-content/uploads/2022/01/Anime.png?q=50&fit=crop&w=825&dpr=1.5",
        frase: "El bienestar de nuestro equipo es nuestra prioridad.",
      },
    ]);

    // Acción para cerrar sesión
    const logout = () => {
      // Implementar la lógica de cierre de sesión
      console.log("Sesión cerrada");
    };

    return {
      leftDrawerOpen,
      empleadosMes,
      logout,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>

<style scoped>
/* Fuentes desde Google Fonts */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap");

body {
  font-family: "Poppins", sans-serif;
  background-color: #f4f4f4;
}

/* Estilo de las tarjetas principales */
.q-card-expanded {
  max-width: 900px;
  margin: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  background-color: #ffffff;
  transition: transform 0.3s ease;
}

.q-card-expanded:hover {
  transform: translateY(-5px);
}

/* Imagen responsiva */
.responsive-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  margin-top: 16px;
}

/* Empleado */
.q-employee-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
}

.q-employee-card {
  text-align: center;
  transition: transform 0.3s ease;
}

.q-employee-card:hover {
  transform: translateY(-5px);
}
</style>
