import DetalleBoleta from "@/components/ContactCenter/DetalleBoleta/DetalleBoleta.vue";

export default {
  components: {
    "detalle-boleta": DetalleBoleta,
  },

  data: () => ({
    idEmpenho: null,
    detalleBoleta: false,
    verAtras:true,
    verSiguiente:false
  }),

  methods: {
    verDetalleBoleta(idEmpenho) {
      this.idEmpenho = idEmpenho;
      this.detalleBoleta = true;
    },

    cerrarDialogDetalle() {
      this.detalleBoleta = false;
    },
    siguiente(index) {
      if(index >= 0 && index < this.boletas.length - 1)
      this.verDetalleBoleta(this.boletas[index+1].idEmpenho);
     
    },
    atras(index) {
      if(index > 0)
      this.verDetalleBoleta(this.boletas[index-1].idEmpenho);
    },
    habilitarcampo() {
      this.verSiguiente = this.boletas.findIndex((x) => x.idEmpenho === this.idEmpenho) < this.boletas.length - 1 ?false:true;
      this.verAtras = this.boletas.findIndex((x) => x.idEmpenho === this.idEmpenho) > 0 ?false:true;
    },
  },  watch: {
    idEmpenho:
        function(newValue, oldValue) 
        {
        this.habilitarcampo();
        } 
},
  props: {
    boletas: {
      type: Array,
      default: null,
    },
  },
};
