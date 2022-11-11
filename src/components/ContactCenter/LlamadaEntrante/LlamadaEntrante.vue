<template>
  <div>
    <v-dialog v-model="verDialogLlamEntrante" persistent width="500">
      <llamada-presentacion
        v-show="llamadaPresentacion"
        @confirm="confirmLlamadaPresentacion"
        @cancelar="cancelarLlam"
      ></llamada-presentacion>

      <validacion-datos
        v-show="validacionDatos"
        @confirm="confirmValidacionDatos"
        @return="mostrarLlamadaPresentacion"
        @cancelar="cancelarLlam"
        @finalizar="finalizarLlam"
      ></validacion-datos>

      <validacion-numero
        v-show="validacionNumero"
        @cancelar="cancelarLlam"
        @return="mostrarValidacionDatos"
        @confirm="confirmarValidNumero"
      ></validacion-numero>
    </v-dialog>

   

    <!-- Dialog de cancelar llamada -->
    <v-dialog v-model="cancelar" width="400" persistent>
      <v-card>
        <v-card-title class="justify-center tituloCardFinalizar mb-3 font-weight-bold"
          ><div style="width: 42vh">¿Deseas cancelar la llamada?</div></v-card-title
        >
        <v-card-text class="mb-n12">
          <div class="font-weight-bold" style="color: #063690">
            Agregar comentarios (opcional)
          </div>
          <v-textarea
            v-model="$store.state.LlamadaEntrante.comentarioLlamada"
            class="textComentario rounded-lg"
            no-resize
            rows="5"
            outlined
            placeholder="Agregar comentarios"
          ></v-textarea>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn
            fab
            dark
            elevation="2"
            small
            color="#1b7700"
            @click="aceptarCancelarLlamada"
          >
            <v-icon dark>fa-check</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            elevation="2"
            small
            color="#dc0000"
            class="ml-12"
            @click="cancelar = false"
          >
            <v-icon dark>fa-times</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog de finalizar llamada -->
    <v-dialog v-model="finalizar" width="400" persistent>
      <v-card>
        <v-card-title class="justify-center tituloCardFinalizar mb-3 font-weight-bold"
          ><div style="width: 42vh">¿Deseas finalizar la llamada?</div></v-card-title
        >
        <v-card-text class="mb-n12">
          <div class="font-weight-bold" style="color: #063690">
            Agregar comentarios (opcional)
          </div>
          <v-textarea
            v-model="$store.state.LlamadaEntrante.comentarioLlamada"
            class="textComentario rounded-lg"
            no-resize
            rows="5"
            outlined
            placeholder="Agregar comentarios"
          ></v-textarea>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn
            fab
            dark
            elevation="2"
            small
            color="#1b7700"
            @click="aceptarFinalizarLlamada"
          >
            <v-icon dark>fa-check</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            elevation="2"
            small
            color="#dc0000"
            class="ml-12"
            @click="finalizar = false"
          >
            <v-icon dark>fa-times</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

   

  </div>
</template>

<script>
import LlamadaPresentacion from "@/components/ContactCenter/LlamadaEntrante/LlamadaPresentacion.vue";
import ValidacionDatos from "@/components/ContactCenter/LlamadaEntrante/ValidacionDatos.vue";
import ValidacionNumero from "@/components/ContactCenter/LlamadaEntrante/ValidacionNumero.vue";
import router from "@/router";
import { mapActions } from "vuex";

export default {
  components: {
    "llamada-presentacion": LlamadaPresentacion,
    "validacion-datos": ValidacionDatos,
    "validacion-numero": ValidacionNumero,
  },

  data: () => ({
    llamadaPresentacion: true,
    validacionDatos: false,
    validacionNumero: false,
    cancelar: false,
    verDialogLlamEntrante: false,
    comentario: "",
    finalizar: false,
  }),

  methods: {
    ...mapActions("LlamadaEntrante", [
      "insertAccion",
      "cancelarLlamada",
      "finalizarLlamada",
    ]),

    mostrarLlamadaPresentacion() {
      this.insertAccion("Presentacion Llamada Entrante");
      this.llamadaPresentacion = true;
      this.validacionDatos = false;
      this.validacionNumero = false;
    },

    mostrarValidacionDatos() {
      this.insertAccion("Validacion de Datos");
      this.validacionDatos = true;
      this.llamadaPresentacion = false;
      this.validacionNumero = false;
    },

    mostrarValidacionNumero() {
      this.insertAccion("Validacion de Numero");
      this.validacionNumero = true;
      this.llamadaPresentacion = false;
      this.validacionDatos = false;
    },

    confirmLlamadaPresentacion(requiereValidacion) {
      try {
        //Si el motivo requiere validacion
        if (requiereValidacion) {
          this.mostrarValidacionDatos();
        } else {
          this.insertAccion(
            this.$store.state.LlamadaEntrante.componenteActual.llamadaMotivo
          );
          router.push("/ContactCenter/LlamadaEntrante").catch(() => {});
        }
      } catch (error) {
        console.error(error);
      }
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
        } else {
          this.insertAccion(
            this.$store.state.LlamadaEntrante.componenteActual.llamadaMotivo
          );

          router.push("/ContactCenter/LlamadaEntrante").catch(() => {});
        }
      } catch (error) {
        console.error(error);
      }
    },

    cancelarLlam() {
      this.cancelar = true;
    },

    aceptarCancelarLlamada() {
      var datos = {
        idUsuario: this.$store.state.LoginStore.IdUsuario,
        comentario: this.$store.state.LlamadaEntrante.comentarioLlamada,
      };

      this.cancelarLlamada(datos);
      this.verDialogLlamEntrante = false;
      this.validacionNumero = false;
      this.validacionDatos = false;
      this.cancelar = false;
      this.llamadaPresentacion = true;
    },

    finalizarLlam() {
      this.finalizar = true;
    },

    aceptarFinalizarLlamada() {
      var datos = {
        idUsuario: this.$store.state.LoginStore.IdUsuario,
        comentario: this.$store.state.LlamadaEntrante.comentarioLlamada,
      };

      this.finalizarLlamada(datos);
      this.verDialogLlamEntrante = false;
      this.validacionNumero = false;
      this.validacionDatos = false;
      this.finalizar = false;
      this.llamadaPresentacion = true;
    },

    confirmarValidNumero() {
      this.insertAccion(this.$store.state.LlamadaEntrante.componenteActual.llamadaMotivo);
      router.push("/ContactCenter/LlamadaEntrante").catch(() => {});
    },
  },
};
</script>

<style>
.textComentario.v-textarea.v-text-field--enclosed .v-text-field__slot textarea {
  color: #063690;
  line-height: 1;
}

.v-dialog > .v-card > .tituloCardFinalizar.v-card__title {
  font-size: 1.8rem;
  padding: 16px 24px 10px;
  color: white;
  background: #063690;
  line-height: 1;
  text-align: center;
  letter-spacing: 0.08rem;
}
</style>
