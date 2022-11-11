import Aviso from "@/components/Home/Avisos/Aviso.vue";
import store from "@/store";

export default {
  components: {
    aviso: Aviso,
  },

  data() {
    return {
      aviso: {},
      avisos: [],
    };
  },

  methods: {
    mostrarAviso(item) {
      this.aviso = item;
      this.$refs.refAviso.leido = false;
      this.$refs.refAviso.showAviso = true;
    },

    guardarAvisoLeido(idAviso) {
      var datos = {
        IdAviso: idAviso,
        IdUsuario: store.state.LoginStore.IdUsuario,
      };
      let token = localStorage.getItem("user-token");

      axios({
        method: "post",
        url: "/api/Avisos/GuardarAvisoLeido",
        headers: { Authorization: `Bearer ${token}` },
        data: datos,
      })
        .then((response) => { })
        .catch(function (error) {
          console.log(error);
        });
    },

    obtenerAvisos() {
      let token = localStorage.getItem("user-token");

      axios
        .get("/api/avisos/" + store.state.LoginStore.IdUsuario, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => (this.avisos = response.data))
        .catch((err) => {
          console.warn(err.response.data.error);
        });
    },
  },

  mounted() {
    this.obtenerAvisos();
  },
};
