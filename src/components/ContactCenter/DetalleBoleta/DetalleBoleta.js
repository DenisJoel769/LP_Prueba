import FacturaCobro from "@/components/ContactCenter/Comprobantes/FacturaCobro/FacturaCobro.vue";
import {
  mapActions
} from "vuex";

export default {
  components: {
    "factura-cobro": FacturaCobro,
  },

  data: () => ({
    detalleBoleta: false,
    facturaCobro: false,
    fotoArticulo: false,
    idFactura: null,
    datosDetalleBoleta: [],
    urlFotosArticulo: [],
    detalleArticulos: true,
    historialPagos: true,
  }),

  methods: {
    ...mapActions("LlamadaEntrante", ["insertAccion"]),

    async obtenerDetalleBoleta() {
      let token = localStorage.getItem("user-token");

      await axios
        .get("/api/DetalleBoleta/" + this.idEmpenho, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        })
        .then((response) => (console.log(this.datosDetalleBoleta = response.data)))
        .catch((err) => {
          console.warn(err.response.data.error);
        });

      var accion = {
        accion: "Detalle de Boleta",
        nroBoleta: this.datosDetalleBoleta.nroBoleta
      }
      this.insertAccion(accion);

    },

    mostrarComprobanteCobro(idFactura) {
      this.idFactura = idFactura;
      this.facturaCobro = true;
    },

    cerrarDialogFacturaCobro() {
      this.idFactura = null;
      this.facturaCobro = false;
    },

    async verImagenArticulo(idArticulo) {
      let token = localStorage.getItem("user-token");
      this.urlFotosArticulo = [];

      await axios
        .get("/api/ArticuloFoto/" + idArticulo, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        })
        .then((response) => (this.urlFotosArticulo = response.data))
        .catch((err) => {
          console.warn(err.response.data.error);
        });

      this.fotoArticulo = true;
    },
  },

  mounted() {
    this.obtenerDetalleBoleta();
  },
  watch: {
    idEmpenho: function (newValue, oldValue) {
      this.obtenerDetalleBoleta();
    }
  },
  props: {
    idEmpenho: {
      type: Number,
      default: null,
    },
  },
};