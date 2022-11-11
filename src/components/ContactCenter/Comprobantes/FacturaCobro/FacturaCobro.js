export default {
  data: () => ({
    datosFactura: [],
    textoAsteriscos:
      "***************************************************************************",
    textoLineas: "======================================================",
  }),

  methods: {
    async obtenerDetalleCobro() {
      let token = localStorage.getItem("user-token");

      await axios
        .get("/api/DetalleBoleta/GetFacturaCobro/" + this.idFactura, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => (this.datosFactura = response.data))
        .catch((err) => {
          console.warn(err.response.data.error);
        });
        
    },
  },

  mounted() {
    this.obtenerDetalleCobro();
  },

  props: {
    idFactura: {
      type: Number,
      default: null,
    },
  },
};
