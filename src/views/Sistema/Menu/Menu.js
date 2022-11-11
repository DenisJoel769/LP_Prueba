import {
  DxTreeList,
  DxEditing,
  DxColumn,
  DxValidationRule,
  DxLookup,
  DxButton,
} from "devextreme-vue/tree-list";
import { mapMutations } from 'vuex';

export default {
  components: {
    DxTreeList,
    DxEditing,
    DxColumn,
    DxValidationRule,
    DxLookup,
    DxButton,
  },
  data: () => ({
    listaMenu: [],
    dsParentMenu: [],
    headers: [
      {
        text: "Nombre",
        align: "start",
        value: "name",
        groupable: false,
      },
      { text: "Descripcion", value: "menuDescripcion", align: "start" },
      { text: "Path", value: "path", align: "start" },
    ],
    popupOptions: {
      title: "Menu",
      showTitle: true,
      width: 700,
      position: { my: "top", at: "top", of: window },
    },
  }),

  methods: {
    ...mapMutations("LoginStore", ["updateMenuVue"]),

    onEditorPreparing(e) {
      if (e.dataField === 'parentMenuId' && e.row.data.parentMenuId === 0) {
        e.editorOptions.disabled = true;
        e.editorOptions.value = null;
      }
    },

    onInitNewRow(e) {
      e.data.parentMenuId = null;
      e.data.menuDescripcion = "";
      e.data.path = "";
      e.data.aparitionOrder = null;
      e.data.icon = "";
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

    async obtenerMenu() {
      let token = localStorage.getItem("user-token");

      await axios
        .get("/api/menu", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => (this.listaMenu = response.data))
        .catch((err) => {
          console.warn(err.response.data.error);
        });
    },

    async obtenerMenuCombo() {
      let token = localStorage.getItem("user-token");

      await axios
        .get("/api/menu/ObtenerMenuCombo", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => (this.dsParentMenu = response.data))
        .catch((err) => {
          console.warn(err.response.data.error);
        });
    },

    async insertar(e) {
      let token = localStorage.getItem("user-token");

      e.data.parentMenuId = !e.data.parentMenuId ? 0 : e.data.parentMenuId;

      let datos = e.data;

      await axios({
        method: "post",
        url: "/api/Menu",
        data: datos,
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          this.obtenerMenu();
          this.actualizarMenuVue();
        })
        .catch((error) => {
          this.$store.commit("snackbar/mostrarMensaje", {
            mensaje: error.response.data.error,
            color: "error",
          });
        });
    },

    async actualizar(e) {
      let idMenuVue = e.key;
      let token = localStorage.getItem("user-token");

      var datos = e.oldData;

      await axios({
        method: "put",
        url: "/api/Menu/" + idMenuVue,
        data: datos,
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          this.obtenerMenu();
          this.actualizarMenuVue();
        })
        .catch((error) => {
          this.$store.commit("snackbar/mostrarMensaje", {
            mensaje: error.response.data.error,
            color: "error",
          });
        });
    },

    async eliminar(e) {
      let token = localStorage.getItem("user-token");
      let idMenuVue = e.key;

      await axios({
        method: "delete",
        url: "/api/Menu/" + idMenuVue,
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          this.obtenerMenu();
          this.actualizarMenuVue();
        })
        .catch((error) => {
          this.$store.commit("snackbar/mostrarMensaje", {
            mensaje: error.response.data.error,
            color: "error",
          });
        });
    },
  },

  mounted() {
    this.obtenerMenu();
    this.obtenerMenuCombo();
  },
};
