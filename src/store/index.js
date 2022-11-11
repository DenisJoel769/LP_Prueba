import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import LoginStore from "@/store/LoginStore";
import LlamadaEntrante from "../store/ContactCenterStore/LlamadaEntrante";
import snackbar from "@/store/snackbar";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ["LoginStore"],
    }),
  ],
  state: {},
  
  mutations: {},
  actions: {},
  modules: {
    LoginStore,
    LlamadaEntrante,
    snackbar,
  },
});
