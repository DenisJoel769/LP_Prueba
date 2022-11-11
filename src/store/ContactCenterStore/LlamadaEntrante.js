/** @format */

const state = {
  verMotivosLlamada: false,
  componenteActual: null,
  comentarioLlamada: null,
  idLlamadaRegistro: null,
  fechaInicioLlamada: null,
  nroAccion: 1,
  acciones: [],
  nombre: "",
  totalGeneral: 0,
  numeroTelefonoLlamada: "",
  datosCliente: {
    idCliente: "",
    cedula: "",
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    ultimoEmpenho: "",
    ultimoLocal: "",
    numeroTelefono: "",
    clienteFotos: "",
  },

  boletasSimulador: [],
  boletasRetiro: [],
  boletasRetencion: [],
  datosRetencion: {
    idRetencion: null,
    observacion: "",
    fechaSolicitud: new Date().toISOString().substr(0, 10)
  }
};

const mutations = {
  updateIdLlamadaRegistro(state, idLlamadaRegistro) {
    state.idLlamadaRegistro = idLlamadaRegistro;
  },

  incrementAccion(state) {
    state.nroAccion++;
  },

  updateDatosLlamada(state, data) {
    state.nombre = data.nombre;
    state.numeroTelefonoLlamada = data.numeroTelefonoLlamada;
  },

  updateDatosCliente(state, data) {
    state.datosCliente.idCliente = data.idCliente;
    state.datosCliente.cedula = data.cedula;
    state.datosCliente.nombre = data.nombreORazonSocial;
    state.datosCliente.apellido = data.apellido;
    state.datosCliente.fechaNacimiento = data.fechaNacimiento;
    state.datosCliente.ultimoEmpenho = data.ultimoEmpenho;
    state.datosCliente.ultimoLocal = data.ultimoLocal;
    state.datosCliente.numeroTelefono = data.nroCelular;
    state.datosCliente.clienteFotos = data.clienteFotos;
  },

  updateBoletasSimulador(state, data) {
    state.boletasSimulador = data;
  },

  updateBoletasRetiro(state, data) {
    state.boletasRetiro = data;
  },

  updateBoletasRetencion(state, data) {
    state.boletasRetencion.push(data);
    // state.boletasRetencion = data;
  },
  // updateBoletaRetencion(state, data){
  //   state.boletasRetencion = data;
  // },

  updateFechaInicioLlamada(state) {
    state.fechaInicioLlamada = new Date();
  },

  finalizarLlamada(state) {
    (state.verMotivosLlamada = false),
      (state.componenteActual = null),
      (state.idLlamadaRegistro = null),
      (state.fechaInicioLlamada = null),
      (state.verValidacionDatos = false),
      (state.nroAccion = 1),
      (state.acciones = []),
      (state.nombre = ""),
      (state.numeroTelefonoLlamada = ""),
      (state.datosCliente = {
        idCliente: "",
        cedula: "",
        nombre: "",
        apellido: "",
        fechaNacimiento: "",
        ultimoEmpenho: "",
        ultimoLocal: "",
        numeroTelefono: "",
        clienteFotos: "",
      });
    state.nroAccion = 1;
    state.comentarioLlamada = null;
    state.boletasSimulador = [];
    state.boletasRetiro = [];
    state.boletasRetencion = [];
    
    state.datosRetencion = {
      idRetencion: null,
      observacion: "",
      fechaSolicitud: new Date().toISOString().substr(0, 10)
    }
  },
};

const actions = {
  insertAccion({ commit }, accion) {
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem("user-token");
      let action = null;
      let nroBoleta = null;
      if (accion.nroBoleta !== undefined) {
        action = accion.accion;
        nroBoleta = accion.nroBoleta;
      }
      else {
        action = accion;
      }

      var datos = {
        idLlamadaRegistro: state.idLlamadaRegistro,
        accion: action,
        nroAccion: state.nroAccion,
        nroBoleta: nroBoleta,
      };

      axios({
        method: "post",
        url: "/api/AccionLlamada",
        data: datos,
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          commit("incrementAccion");
          resolve(response);
        })
        .catch((err) => {
          console.warn(err.response.data.error);
          commit(
            "snackbar/mostrarMensaje",
            {
              mensaje: err.response.data.error,
              color: "error",
              posicion: "bottom",
            },
            { root: true }
          );
        });
    });
  },

  async iniciarLlamada({ commit, dispatch }, data) {
    let token = localStorage.getItem("user-token");
    commit("updateFechaInicioLlamada");
    await axios({
      method: "post",
      url: "/api/LlamadaRegistro",
      data: data,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        commit("updateIdLlamadaRegistro", response.data);
        //Registro de la primera Accion
        dispatch("insertAccion", "Inicio Llamada Entrante");
      })
      .catch((err) => {
        console.warn(err.response.data.error);
        commit(
          "snackbar/mostrarMensaje",
          {
            mensaje: err.response.data.error,
            color: "error",
            posicion: "bottom",
          },
          { root: true }
        );
      });
  },

  async cancelarLlamada({ commit, dispatch }, datos) {
    let token = localStorage.getItem("user-token");
    let url =
      "/api/LlamadaRegistro/Cancelar/" +
      state.idLlamadaRegistro +
      "/" +
      datos.idUsuario;


    await axios({
      method: "put",
      url: url,
      data: datos,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        //Registro de la accion cancelar, espero que finalice la promesa para poder limpiar los datos
        dispatch("insertAccion", "Llamada Cancelada").then((response) => {
          //Limpia todos los estados al finalizar la llamada
          commit("finalizarLlamada");
        });
      })
      .catch((err) => {
        console.warn(err.response.data.error);
        commit(
          "snackbar/mostrarMensaje",
          {
            mensaje: err.response.data.error,
            color: "error",
            posicion: "bottom",
          },
          { root: true }
        );
      });
  },

  async finalizarLlamada({ commit, dispatch }, datosFinLlamada) {
    let token = localStorage.getItem("user-token");
    let url = "/api/LlamadaRegistro/Finalizar/" + state.idLlamadaRegistro;

    //Si no se valido los datos del cliente en la llamada
    //En ambos casos se registra el numero de la llamada para que sea igual al registro del genesys
    var datosARegistrar = {};
    if (!state.datosCliente.idCliente) {
      datosARegistrar.nombre = state.nombre;
      datosARegistrar.numero = state.numeroTelefonoLlamada;
      datosARegistrar.comentario = datosFinLlamada.comentario;
      datosARegistrar.idUsuario = datosFinLlamada.idUsuario;
    } else {
      datosARegistrar.cedula = state.datosCliente.cedula;
      datosARegistrar.nombre = state.datosCliente.nombre;
      datosARegistrar.apellido = state.datosCliente.apellido;
      datosARegistrar.numero = state.numeroTelefonoLlamada;
      datosARegistrar.comentario = datosFinLlamada.comentario;
      datosARegistrar.idUsuario = datosFinLlamada.idUsuario;
    }

    await axios({
      method: "put",
      url: url,
      data: datosARegistrar,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        //Registro de la accion finalizar, espero que finalice la promesa para poder limpiar los datos
        dispatch("insertAccion", "Llamada Finalizada").then((response) => {
          //Limpia todos los estados al finalizar la llamada
          commit("finalizarLlamada");
        });
      })
      .catch((err) => {
        console.warn(err.response.data.error);
        commit(
          "snackbar/mostrarMensaje",
          {
            mensaje: err.response.data.error,
            color: "error",
            posicion: "bottom",
          },
          { root: true }
        );
      });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
