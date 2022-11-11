/** @format */

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios from "axios";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import es from "devextreme/localization/messages/es.json";
import { locale, loadMessages } from "devextreme/localization";
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import MyIcon from "@/components/Util/MyIcon.vue";
import Vuex from "vuex";
import moment from 'moment'
/* import VueSweetalert2 from 'vue-sweetalert2'; */

Vue.use(Vuex);
/* Vue.use(VueSweetalert2) */

Vue.component("my-icon", MyIcon);
Vue.config.productionTip = false;

Vue.prototype.axios = Axios;

const baseURL = "http://localhost:58461";
// const baseURL =
//   process.env.NODE_ENV === "production"
//     ? "https://testlpsoft.laplata.com.py:8000/LpSacApi"
//     : "http://localhost:58461";

const axios = Axios.create({
  baseURL: baseURL,
});

window.axios = axios;

new Vue({
  router,
  store,
  vuetify,
  moment,
  created() {
    loadMessages(es);
    locale(navigator.language);
  },
  watch: {
    $route(to, from) {
      store.state.LoginStore.menuActual = to.name;
    },
  },
  render: (h) => h(App),
}).$mount("#app");

if (!isLoggedIn()) {
  router.push("/login")
}

function isLoggedIn() {
  return store.state.LoginStore.IdUsuario ? true : false
}

axios.interceptors.response.use(
  (response) => {
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    if (error.response.status) {
      switch (error.response.status) {
        case 400:
          //do something
          store.commit("snackbar/mostrarMensaje", {
            mensaje: error.response.data.error,
            color: "error",
          });
          break;

        case 401:
          console.log("No Autorizado");
          router.replace({
            path: "/login",
            query: { redirect: router.currentRoute.fullPath },
          });
          break;
      }
      return Promise.reject(error.response);
    }
  }
);

/*
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("user-token");
    if (token) {
      config.headers.common["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response) => {
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    if (error.response.status) {
      switch (error.response.status) {
        case 400:
          //do something
          alert(error.response.data.error);
          break;

        case 401:
          console.log("No Autorizado");
          router.replace({
            path: "/login",
            query: { redirect: router.currentRoute.fullPath },
          });
          break;
        case 403:
          router.replace({
            path: "/403",
            query: { redirect: router.currentRoute.fullPath },
          });
          break;
        case 404:
          alert("page not exist");
          router.replace({
            path: "/404",
            query: { redirect: router.currentRoute.fullPath },
          });
          break;
        case 502:
          setTimeout(() => {
            router.replace({
              path: "/login",
              query: {
                redirect: router.currentRoute.fullPath,
              },
            });
          }, 1000);
      }
      return Promise.reject(error.response);
    }
  }
);
*/
