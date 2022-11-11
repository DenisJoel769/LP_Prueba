/** @format */

const state = {
  mensaje: "",
  color: "",
  posicion: "", //
};

export const mutations = {
  mostrarMensaje(state, payload) {
    state.mensaje = payload.mensaje;
    state.color = payload.color;
    state.posicion = payload.posicion === undefined ? "bottom" : payload.posicion;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
