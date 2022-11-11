import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";

import store from "@/store";

export default {
  components: {
    DxDataGrid,
    DxColumn,
  },

  data() {
    return {
      localComercial: [],
      localComercialOrigen: null,
      localComercialDestino: null,
      valid: true,
      lazy: false,
      dialog: false,
      info:
        "Cambio de origen de todos los articulos activos por cierre de local.",
      textSnackBar: null,
      colorSnackBar: null,
      snackbar: false,
      dsMovimientoEmpenho: [],
      dsAsientoContable: []
    };
  },

  methods: {
    getLocalComercial() {
      let token = localStorage.getItem("user-token");

      axios
        .get("/api/LocalComercial", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => (this.localComercial = response.data))
        .catch((err) => {
          console.warn(err.response.data.error);
        });
    },

    async confirmarMovimiento() {
      this.dsAsientoContable = [];
      if (!this.$refs.form.validate()) {
        return;
      }
      let token = localStorage.getItem("user-token");

      await axios
        .get(
          "/api/MovimientoCompleto/" +
            this.localComercialOrigen.idLocalComercial +
            "/" +
            this.localComercialDestino.idLocalComercial,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => (this.dsMovimientoEmpenho = response.data))
        .catch((err) => {
          this.dsMovimientoEmpenho = [];
        });

        await axios
        .get(
          "/api/MovimientoCompleto/GetDetalleAsientoContable/" +
            this.localComercialOrigen.idLocalComercial +
            "/" +
            this.localComercialDestino.idLocalComercial,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => (this.dsAsientoContable = response.data))
        .catch((err) => {
          this.dsAsientoContable = [];
        });

      this.dialog = true;
    },

    async guardarMovimiento() {
      let token = localStorage.getItem("user-token");

      var datos = {
        idLocalComercialOrigen: this.localComercialOrigen.idLocalComercial,
        idLocalComercialDestino: this.localComercialDestino.idLocalComercial,
        idUsuario: store.state.LoginStore.IdUsuario,
      };
      this.dialog = false;

      await axios({
        method: "post",
        url: "/api/MovimientoCompleto",
        data: datos,
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          this.snackbar = true;
          this.textSnackBar = "Proceso realizado con éxito";
          this.colorSnackBar = "success";
          this.$refs.form.reset();
        })
        .catch((err) => {
          this.snackbar = true;
          this.textSnackBar = err.response.data.error;
          this.colorSnackBar = "error";
        });
    },
  },
  computed: {},

  mounted() {
    this.getLocalComercial();
  },
};
