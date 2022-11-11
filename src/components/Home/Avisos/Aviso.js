export default {
  components: {},

  data() {
    return {
      showAviso: false,
      leido: false,
    };
  },

  methods: {
    closeDialog() {
      this.showAviso = !this.showAviso;
    },

    guardarAvisoLeido() {
      //Validar que se marca como leído, no debería de pasar pero por las dudas...
      //Le pasa el evento personalizado del componente padre "Home" que guarda el aviso como leido
      if (this.leido) {
        this.$emit("clicked", this.aviso.idAviso);
        this.showAviso = false;
      }
    },
  },

  props: {
    aviso: {
      type: Object,
      default: null,
    },
  },
};
