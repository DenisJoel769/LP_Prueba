/** @format */

import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

function MenuPermiso() {
  let token = localStorage.getItem("user-token");

  return axios
    .get("/users/" + store.state.LoginStore.IdPerfil, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.data)
    .catch((err) => {
      console.warn(err.response.data.error);
    });
}

const tienePermiso = async (to, from, next) => {
  let menuPermiso = ([] = await MenuPermiso());
  let permiso = false;
  menuPermiso.forEach((menu) => {
    if (menu.path.toLowerCase() == to.path.toLowerCase()) {
      permiso = true;
    }
  });
  if (permiso) {
    next();
  } else {
    next("/403");
  }
};

const routes = [
  {
    path: "/",
    name:"/boletas",
    component: () => import("../Layouts/HomeLayout.vue"),
    /* children: [
      {
        path: "",
        name: "boletas",
        meta: { requiresAuth: true },
        component: () => import("),
      },
    ], */
  },

  {
    path: "",
    component: () => import("../Layouts/HomeLayout.vue"),
    children: [
      {
        path: "/",
        name: "Bienvenido",
        meta: { requiresAuth: true },
        component: () => import("../views/Home/Home.vue"),
      },
    ],
  },

  {
    path: "",
    component: () => import("../Layouts/DefaultLayout.vue"),
    children: [
      {
        path: "/Articulo/StockVenta",
        name: "Stock A la Venta",
        meta: { requiresAuth: true },
        component: () => import("../views/Comercial/Articulo/StockVenta.vue"),
      },
    ],
  },
  {
    path: "",
    component: () => import("../Layouts/MasterLayout.vue"),
    children: [
      {
        path: "/Sistema/Perfil",
        name: "Perfil",
        component: () => import("../views/Sistema/Perfil/Perfil.vue"),
        meta: { requiresAuth: true },
        beforeEnter: tienePermiso,
      },
      {
        path: "/Comercial/Stock/MovimientoCierreLocal",
        name: "Movimiento Cierre de Local",
        component: () =>
          import("../views/Comercial/Stock/MovimientoCierreLocal.vue"),
        meta: { requiresAuth: true },
        beforeEnter: tienePermiso,
      },
      {
        path: "/Aviso",
        name: "Aviso",
        component: () => import("../views/EditorAviso/EditorAviso.vue"),
        meta: { requiresAuth: true },
        beforeEnter: tienePermiso,
      },
      {
        path: "/Tic/TableroKanban",
        name: "Tablero Kanban",
        component: () => import("../views/Tic/TableroKanban.vue"),
        meta: { requiresAuth: true },
        beforeEnter: tienePermiso,
      },
      {
        path: "/Sistema/Menu",
        name: "Menu",
        component: () => import("../views/Sistema/Menu/Menu.vue"),
        meta: { requiresAuth: true },
        beforeEnter: tienePermiso,
      },
      {
        path: "/Sistema/PerfilPermiso",
        name: "Permiso de Perfiles",
        component: () => import("../views/Sistema/PerfilPermiso/PerfilPermiso.vue"),
        meta: { requiresAuth: true },
        beforeEnter: tienePermiso,
      },
    ],
  },

  {
    path: "",
    component: () => import("../Layouts/ContactCenterLayout.vue"),
    children: [
      {
        path: "/ContactCenter/LlamadaEntrante",
        name: "Llamada Entrante",
        component: () =>
          import("../views/ContactCenter/LlamadaEntrante/LlamadaEntrante.vue"),
        meta: { requiresAuth: true },
        beforeEnter: tienePermiso,
      },
    ],
  },

  {
    path: "",
    component: () => import("../Layouts/LoginLayout.vue"),
    children: [
      {
        path: "/login",
        component: () => import("../views/Login.vue"),
      },
    ],
  },
  {
    path: "*",
    component: () => import("../components/Layout/404.vue"),
  },
  {
    path: "/403",
    component: () => import("../components/Layout/403.vue"),
  },
  {
    path: "/prueba",
    component: () => import("../views/prueba.vue"),
  }, 

  //   {
  //     path: "/validacion",
  //    component: () => import("@/RetencionesSucursal/ValidacionDatos1.vue"),
  //  },
    //  {
    //   path: "/retencion",
    //   component: () => import("../RetencionesSucursal/Retencion1.vue")
    // } 
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.state.LoginStore.status == "logout") {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
