import BoletasEmpenadas from "@/components/ContactCenter/BoletasActivas/BoletasEmpenadas/BoletasEmpenadas.vue";
import BoletasRemate from "@/components/ContactCenter/BoletasActivas/BoletasRemate/BoletasRemate.vue";
import BoletasRetiradas from "@/components/ContactCenter/BoletasInactivas/BoletasRetiradas/BoletasRetiradas.vue";
import BoletasVendidas from "@/components/ContactCenter/BoletasInactivas/BoletasVendidas/BoletasVendidas.vue";
import LlamadaEntrante from "@/components/ContactCenter/LlamadaEntrante/LlamadaEntrante.vue";
import { mapActions } from "vuex";

export default {
  components: {
    "boletas-empenadas": BoletasEmpenadas,
    "boletas-remates": BoletasRemate,
    "boletas-retiradas": BoletasRetiradas,
    "boletas-vendidas": BoletasVendidas,
    "llamada-entrante": LlamadaEntrante,
  },

  data: () => ({
    model: null,
    tipoBoleta: 1, // 1 Es boleta activa y 0 boleta inactiva
    busquedaBoletaActiva: "",
    busquedaBoletaInactiva: "",
    ayudas: [
      {
        descripcion: "Pasará a remate",
        icon: "fa-exclamation-triangle",
        iconColor: "#8d0404",
      },
      {
        descripcion: "No disponible para retiro",
        icon: "fa-ban",
        iconColor: "#000000",
      },
      {
        descripcion: "Disponible para retiro",
        icon: "fa-check-circle",
        iconColor: "#0fcbc5",
      },
      {
        descripcion: "Artículo con retención",
        icon: "fa-lock",
        iconColor: "#ffd014",
      },
    ],
    //datosBoletasActivas guarda todas las boletas para poder filtrar desde ahi cuando se busque
    datosBoletasActivas: [],
    datosBoletasInactivas: [],
    //Se guardan las boletas que se buscaron
    boletasActivasBusqueda: [],
    boletasInactivasBusqueda: [],
  }),

  methods: {
    ...mapActions("LlamadaEntrante", ["insertAccion"]),

    async getBoletasActivas() {
      let token = localStorage.getItem("user-token");

      if (this.idCliente) {
        await axios
          .get("/api/BoletaActiva/" + this.idCliente, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => (this.datosBoletasActivas = response.data))
          .catch((err) => {
            console.warn(err.response.data.error);
          });
        //Al inicio va ser lo mismo porque no se busco nada
        this.boletasActivasBusqueda = this.datosBoletasActivas;
      }


    },

    async getBoletasInactivas() {
      let token = localStorage.getItem("user-token");
      if (this.idCliente) {
        await axios
          .get("/api/BoletaInactiva/" + this.idCliente, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => (this.datosBoletasInactivas = response.data))
          .catch((err) => {
            console.warn(err.response.data.error);
          });

        //Al inicio va ser lo mismo porque no se busco nada
        this.boletasInactivasBusqueda = this.datosBoletasInactivas;
      }
    },

    buscarBoletasActivas() {
      if (!this.busquedaBoletaActiva) {
        this.boletasActivasBusqueda = this.datosBoletasActivas;
        return;
      }

      this.boletasActivasBusqueda = [];

      this.datosBoletasActivas.forEach((boleta) => {
        if (boleta.nroBoleta.toString().includes(this.busquedaBoletaActiva))
          this.boletasActivasBusqueda.push(boleta);
        else if (
          boleta.articuloCategoria
            .toUpperCase()
            .includes(this.busquedaBoletaActiva.toUpperCase())
        )
          this.boletasActivasBusqueda.push(boleta);
      });
    },

    buscarBoletasInactivas() {
      if (!this.busquedaBoletaInactiva) {
        this.boletasInactivasBusqueda = this.datosBoletasInactivas;
        return;
      }

      this.boletasInactivasBusqueda = [];

      this.datosBoletasInactivas.forEach((boleta) => {
        if (boleta.nroBoleta.toString().includes(this.busquedaBoletaInactiva))
          this.boletasInactivasBusqueda.push(boleta);
        else if (
          boleta.articuloCategoria
            .toUpperCase()
            .includes(this.busquedaBoletaInactiva.toUpperCase())
        )
          this.boletasInactivasBusqueda.push(boleta);
      });
    },

    abrirSimuladorPagos() {
      var comp = {
        componente: "simulador-pago",
      };

      //Asignamos el componente que va mostrar
      this.$store.state.LlamadaEntrante.componenteActual = comp;
      this.$store.state.LoginStore.menuActual = "Simulador de Cobro";
      this.insertAccion("Simulador de Cobro");
    },
  },

  computed: {
    boletasActivas() {
      return this.boletasActivasBusqueda;
    },

    boletasInactivas() {
      return this.boletasInactivasBusqueda;
    },

    idCliente() {
      return this.$store.state.LlamadaEntrante.datosCliente.idCliente;
    }
  },

  watch: {
    busquedaBoletaActiva() {
      this.buscarBoletasActivas();
    },

    busquedaBoletaInactiva() {
      this.buscarBoletasInactivas();
    },

    idCliente() {
      if (this.datosBoletasActivas !== []) {
        this.getBoletasActivas();
        this.getBoletasInactivas();
      }
    }
  },

  mounted() {
    //Si esta vacio es porque todavia no se valido al cliente para ver su estado de cuenta

    /*
    if (!this.$store.state.LlamadaEntrante.datosCliente.idCliente) {
      this.$store.state.LlamadaEntrante.verValidacionDatos = true;
      this.$refs.refLlamadaEntrante.verDialogLlamEntrante = true;

      return;
    } else {}*/

    this.getBoletasActivas();
    this.getBoletasInactivas();
  },
};
