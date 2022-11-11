import {
  DxTreeList,
  DxColumn,
} from "devextreme-vue/tree-list";
import { DxCheckBox } from 'devextreme-vue/check-box';
import { mapMutations } from 'vuex';

export default {
  components: {
    DxTreeList,
    DxColumn,
    DxCheckBox
  },
  data: () => ({
    listaPerfilPermiso: [],
    dsParentMenu: [],
    perfiles: [],
    perfil: null,
    popupOptions: {
      title: "Menu",
      showTitle: true,
      width: 700,
      position: { my: "top", at: "top", of: window },
    },
  }),

  methods: {
    ...mapMutations("LoginStore", ["updateMenuVue"]),

    async obtenerPerfiles() {
      let token = localStorage.getItem("user-token");

      await axios
        .get("/api/perfil", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => (this.perfiles = response.data))
        .catch((err) => {
          console.warn(err.response.data.error);
        });
    },

    async obtenerPermisoPerfiles() {
      let token = localStorage.getItem("user-token");
      if (this.perfil) {
        await axios
          .get("/api/perfilpermiso/" + this.perfil, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => (this.listaPerfilPermiso = response.data))
          .catch((err) => {
            console.warn(err.response.data.error);
          });
      }
    },

    async procesarPermiso(data, permisoMenu) {
      let token = localStorage.getItem("user-token");

      var datos = {
        idPerfil: this.perfil,
        idMenuVue: data.data.idMenuVue,
        permiso: permisoMenu,
        idUsuario: this.$store.state.LoginStore.IdUsuario
      }

      await axios({
        method: "post",
        url: "/api/perfilpermiso",
        data: datos,
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          this.obtenerPermisoPerfiles();
          this.actualizarMenuVue();
        })
        .catch((error) => {
          this.$store.commit("snackbar/mostrarMensaje", {
            mensaje: error.response.data.error,
            color: "error",
          });
        });
    },

    async actualizarMenuVue() {
      let token = localStorage.getItem("user-token");

      await axios
        .get("/users/ObtenerMenuVue/" + this.$store.state.LoginStore.IdPerfil, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => (this.updateMenuVue(response.data)))
        .catch((err) => {
          console.warn(err.response.data.error);
        });
    },
  },

  watch: {
    perfil() {
      this.obtenerPermisoPerfiles();
    }
  },

  mounted() {
    this.obtenerPerfiles();
    this.obtenerPermisoPerfiles();
  },
};
