/** @format */
//import axios from "axios";
import router from "@/router";
// Estados son como variables que alacenan datos
const state = {
  token: localStorage.getItem("user-token") || "",
  status: "",
  IdUsuario: "",
  Usuario: "",
  PassSeguro: "",
  Nombres: "",
  Apellidos: "",
  IdPerfil: "",
  IdArea: "",
  IdEmpresa: "",
  IdCaja: "",
  NroCaja: "",
  IdLocalComercial: "",
  LocalComercial: "",
  Cargo: "",
  MenuVue: {},
  AccesoDirecto: {},
  MenuFavorito: {},
  MenuBuscador: {},
  esFavorito: false,
  menuActual: "",
  DescripcionMenu: "",

};
// Captadores son como los computed que se encargan de realizar opeaciones (cálculo de datos, filtrado, etcetera).
// mantienn los datos en cache
const getters = {
  isAuthenticated: (state) => !!state.token,
  authStatus: (state) => state.status,
};

// las mutaciones son metodos sincronicos
// basic mutations, showing loading, success, error to reflect the api call status and the token when loaded

const mutations = {
  
  AUTH_REQUEST(state) {
    state.status = "loading";
  },

  AUTH_SUCCESS(state, data) {
    console.log(data)
    state.status = "success";
    state.token = data.token;
    (state.IdUsuario = data.idUsuario),
      (state.Usuario = data.usuario),
      (state.PassSeguro = data.passSeguro),
      (state.Nombres = data.nombres),
      (state.Apellidos = data.apellidos),
      (state.IdPerfil = data.idPerfil),
      (state.IdArea = data.idArea),
      (state.IdEmpresa = data.idEmpresa),
      (state.IdCaja = data.idCaja),
      (state.NroCaja = data.nroCaja),
      (state.IdLocalComercial = data.idLocalComercial),
      (state.LocalComercial = data.localComercial),
      (state.MenuVue = data.menuVue),
      (state.AccesoDirecto = data.accesoDirecto),
      (state.MenuFavorito = data.menuFavorito),
      (state.MenuBuscador = data.menuBuscador),
      (state.Cargo = data.cargo);
  },
  AUTH_ERROR(state) {
    state.status = "error";
  },
  AUTH_LOGOUT(state) {
    state.status = "logout";
    state.token = "";
    state.IdUsuario = "";
    state.Usuario = "";
    state.PassSeguro = "";
    state.Nombres = "";
    state.Apellidos = "";
    state.IdPerfil = "";
    state.IdArea = "";
    state.IdEmpresa = "";
    state.IdCaja = "";
    state.NroCaja = "";
    state.IdLocalComercial = "";
    state.localComercial = "";
    state.MenuVue = "";
    state.AccesoDirecto = "";
    state.MenuFavorito = "";
    state.MenuBuscador = "";
    state.menuActual = "";
    state.DescripcionMenu = "";
    state.esFavorito = false;
  },
  updateMenuVue(state, data) {
    state.MenuVue = data;
  }
};

// las acciones son metodos asincronicos que mediante las mutaciones alteran al estado
const actions = {
  AUTH_REQUEST({ commit, dispatch }, user) {
    return new Promise((resolve, reject) => {
      // The Promise used for router redirect in login
      commit("AUTH_REQUEST");
      axios
        .post("/users/authenticate", user)
        .then((resp) => {
          const token = resp.data.token;
          localStorage.setItem("user-token", token); // store the token in localstorage
          commit("AUTH_SUCCESS", resp.data);
          // you have your token, now log in your user :)
          // nose que onda dispatch("USER_REQUEST");
          resolve(resp);
          let redirect =
            typeof router.history.current.query.redirect == "undefined"
              ? "/"
              : router.history.current.query.redirect;
          router.push(redirect).catch((error) => {
            console.info(error.message);
          });
        })
        .catch((err) => {
          commit("AUTH_ERROR", err);
          commit(
            "snackbar/mostrarMensaje",
            {
              mensaje: err.response.data.error,
              color: "error",
              posicion: "bottom",
            },
            { root: true }
          );
          localStorage.removeItem("user-token");
          localStorage.clear();
          //reject(err);
        });
    });
  },
  AUTH_LOGOUT({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      commit("AUTH_LOGOUT");
      localStorage.removeItem("user-token");
      resolve();
      router.push("/login");
    });
  },

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
