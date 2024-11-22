// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/Login.vue';
import TablaInventarioView from '../views/TablaInventario.vue';
import CategoriasView from '../views/Categorias.vue';
import ClientesView from '../views/Clientes.vue';
import ServiciosView from '../views/Servicios.vue';
import ProductosView from '../views/Productos.vue';


import { useAuthStore } from '../stores/authStore';

const routes = [
  { path: '/', name: 'login', component:LoginView, children: [
    { path: '/categorias', name: 'categorias', component:CategoriasView   },
    { path: '/productos', name: 'productos', component: ProductosView  },
    { path: '/tabla-inventario', name: 'tabla-inventario', component: TablaInventarioView  },
    { path: '/clientes', name: 'clientes', component: ClientesView  },
    {path: '/servicios', name: 'servicios', component: ServiciosView},

  ]},
 
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Verificar si la ruta requiere autenticación y si el usuario está autenticado
  if (to.meta.requiresAuth && !authStore.token) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;