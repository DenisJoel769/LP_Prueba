import ValidacionDatos from "@/components/ContactCenter/LlamadaEntrante/ValidacionDatos.vue";
import ValidacionNumero from "@/components/ContactCenter/LlamadaEntrante/ValidacionNumero.vue";
import EstadoCuenta from "@/components/ContactCenter/MotivosLlamada/EstadoCuenta/EstadoCuenta.vue";
import Retencion from "@/components/ContactCenter/MotivosLlamada/Retencion/Retencion.vue";
import SimuladorPago from "@/components/ContactCenter/SimuladorPago/SimuladorPago.vue";
import SolicitudRetiro from "@/components/ContactCenter/MotivosLlamada/SolicitudRetiro/SolicitudRetiro.vue"
import { mapActions } from "vuex";
import router from "@/router";

export default {
  components: {
    "estado-cuenta": EstadoCuenta,
    "simulador-pago": SimuladorPago,
    "validacion-datos": ValidacionDatos,
    "validacion-numero": ValidacionNumero,
    retencion: Retencion,
    "solicitud-retiro": SolicitudRetiro
  },

  data: () => ({
    verDialogLlamEntrante: false,
    validacionDatos: false,
    validacionNumero: false,
    cancelar: false,
    componenteAMostrar: null,
    comentario: ""
  }),

  methods: {
    ...mapActions("LlamadaEntrante", ["insertAccion", "cancelarLlamada"]),
    validarDatos() {
      this.$store.state.LlamadaEntrante.componenteActual = {};
      this.verDialogLlamEntrante = true;
      this.validacionDatos = true;
    },

    cancelarLlam() {
      this.cancelar = true;
    },

    confirmValidacionDatos() {
      try {
        /*Formateo el numero en vez de tener +595972 o 595972 tengo 0972----
      para poder comparar con los numero registrados con el mismo formato */
        let numeroTelefonoLlamada = this.$store.state.LlamadaEntrante.numeroTelefonoLlamada
          .replace("+595", "0")
          .replace("595", "0");

        //Quito el 0 para
        let numeroCliente = this.$store.state.LlamadaEntrante.datosCliente.numeroTelefono
          .replace("+595", "0")
          .replace("595", "0");

        //Si el numero del que esta llamando es distinto al numero que esta registrado
        if (numeroTelefonoLlamada != numeroCliente) {
          this.mostrarValidacionNumero();
          this.insertAccion("Validacion de Numero");
        } else {
          this.validacionNumero = false;
          this.verDialogLlamEntrante = false;
          this.validacionDatos = false;
          this.$store.state.LlamadaEntrante.componenteActual = this.componenteAMostrar;
        }
      } catch (error) {
        console.error(error);
      }
    },

    mostrarValidacionDatos() {
      this.validacionDatos = true;
      this.validacionNumero = false;
    },

    mostrarValidacionNumero() {
      this.validacionNumero = true;
      this.validacionDatos = false;
    },

    aceptarCancelarLlamada() {
      var datos = {
        idUsuario: this.$store.state.LoginStore.IdUsuario,
        comentario: this.comentario
      }
      this.cancelarLlamada(datos);
      this.$store.state.LlamadaEntrante.verMotivosLlamada = false;
      this.verDialogLlamEntrante = false;
      this.validacionNumero = false;
      this.validacionDatos = false;
      this.cancelar = false;
      router.push("/").catch(() => { });

    },

    cerrarDialogValidNumero() {
      this.validacionNumero = false;
      this.verDialogLlamEntrante = false;
      this.validacionDatos = false;
      this.$store.state.LlamadaEntrante.componenteActual = this.componenteAMostrar;
    },
  },
  computed: {
    componenteActual() {
      return this.$store.state.LlamadaEntrante.componenteActual != null
        ? this.$store.state.LlamadaEntrante.componenteActual.componente
        : null;
    },
  },
  watch: {
    /*Observa la propiedad computada para consultar si el componente que se selecciono requiere
    la validacion del cliente*/
    componenteActual() {
      //Si no existe cliente es porque todavia no se valido..
      //Se consulta tambien si el motivo requiere validacion
      if (this.componenteAMostrar == null)
        this.componenteAMostrar = this.$store.state.LlamadaEntrante.componenteActual;
      if (
        !this.$store.state.LlamadaEntrante.datosCliente.idCliente &&
        this.$store.state.LlamadaEntrante.componenteActual.requiereValidacion ==
        1
      ) {
        this.insertAccion("Validacion de Datos");
        this.validarDatos();
      }
    },
  },

  mounted() {
    //Valida que exista una llamada en curso

    if (this.$store.state.LlamadaEntrante.idLlamadaRegistro == null) {
      this.$store.commit("snackbar/mostrarMensaje", {
        mensaje: "No hay una llamada en curso...!!",
        color: "error",
      });
      router.push("/");
      return;
    }
    this.$store.state.LlamadaEntrante.verMotivosLlamada = true;


    window.addEventListener('beforeunload', function (event) {
      event.returnValue = 'Write something'
    })
  },
};
