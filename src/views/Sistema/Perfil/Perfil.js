export default {
  data: () => ({
    perfiles: [],
    dialog: false,
    headers: [
      {
        text: "Perfil",
        align: "start",
        sortable: false,
        value: "perfil",
      },
      { text: "", value: "actions", sortable: false },
    ],
    editedItem: {
      perfil: "",
    },
    defaultItem: {
      perfil: "",
    },
    editedIndex: -1,
  }),

  methods: {
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

    guardar() {
      if (this.editedIndex > -1) {
        this.editarPerfil();
      } else {
        this.insertarPerfil();
      }
      this.cerrar();
    },

    cerrar() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    editItem(item) {
      this.editedIndex = this.perfiles.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem(item) {
      const index = this.perfiles.indexOf(item);
      let token = localStorage.getItem("user-token");
      let idPerfil = item.idPerfil

      if (confirm("Estas seguro de eliminar el elemento ?")) {
        await axios({
          method: "delete",
          url: "/api/perfil/" + idPerfil,
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((response) => {
            this.perfiles.splice(index, 1);
          })
          .catch((error) => {
            this.$store.commit("snackbar/mostrarMensaje", {
              mensaje: error.response.data.error,
              color: "error",
            });
          });

      }
    },

    async insertarPerfil() {
      let token = localStorage.getItem("user-token");

      await axios({
        method: "post",
        url: "/api/perfil",
        data: this.editedItem,
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          this.obtenerPerfiles();
        })
        .catch((error) => {
          this.$store.commit("snackbar/mostrarMensaje", {
            mensaje: error.response.data.error,
            color: "error",
          });
        });
    },

    async editarPerfil() {
      let token = localStorage.getItem("user-token");
      let idPerfil = this.editedItem.idPerfil

      await axios({
        method: "put",
        url: "/api/perfil/" + idPerfil,
        data: this.editedItem,
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          this.obtenerPerfiles();
        })
        .catch((error) => {
          this.$store.commit("snackbar/mostrarMensaje", {
            mensaje: error.response.data.error,
            color: "error",
          });
        });
    }
  },

  watch: {
    dialog(val) {
      val || this.cerrar();
    },
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Perfil" : "Editar Perfil";
    },
  },

  mounted() {
    this.obtenerPerfiles();
  },
};
