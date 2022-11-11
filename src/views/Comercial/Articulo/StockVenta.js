export default {
  data: () => ({
    articulosVenta: [],
  }),

  methods: {
    obtenerStock() {
      let token = localStorage.getItem("user-token");

      axios
        .get("/api/stockventa", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => (this.articulosVenta = response.data))
        .catch((err) => {
          console.warn(err.response.data.error);
        });
    }
  },

  mounted() {
    this.obtenerStock();
  }
}