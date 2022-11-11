<template>
  <div>
    <animacion-llamada></animacion-llamada>
    <v-row class="justify-center">
      <div class="headline white--text">
        {{ $store.state.LlamadaEntrante.numeroTelefonoLlamada }}
      </div>
    </v-row>
    <div v-if="$store.state.LlamadaEntrante.datosCliente.idCliente != ''">
      <div class="ml-5 white--text caption">
        {{ $store.state.LlamadaEntrante.datosCliente.nombre }}
      </div>
      <div class="ml-5 white--text caption">
        {{ $store.state.LlamadaEntrante.datosCliente.apellido }}
      </div>
    </div>

    <div v-if="$store.state.LlamadaEntrante.datosCliente.idCliente != ''">
      <div class="ml-5 white--text caption">
        C.I
        {{
          new Intl.NumberFormat("es-PY", {
            maximumFractionDigits: 0,
          }).format($store.state.LlamadaEntrante.datosCliente.cedula)
        }}
      </div>
    </div>

    <div v-else>
      <div class="ml-5 white--text caption">
        {{ $store.state.LlamadaEntrante.nombre }}
      </div>
      <div class="ml-5 white--text caption">
        {{ $store.state.LlamadaEntrante.datosCliente.apellido }}
      </div>
    </div>

    <br />
    <div class="ml-5 white--text caption">Últimos Contactos</div>
    <v-card elevation="0" color="transparent" height="200"
      ><v-card-text></v-card-text
    ></v-card>
    <v-row class="justify-center">
      <v-card class="rounded-lg" height="90" color="white" elevation="0">
        <div style="color: #7494eb; font-size: 10px" class="ml-2 mt-1">
          Agregar Comentarios
        </div>
        <v-divider style="background: #7494eb"></v-divider>
        <v-textarea
          v-model="$store.state.LlamadaEntrante.comentarioLlamada"
          class="caption textComentario rounded-lg"
          no-resize
          rows="5"
          solo
          background-color="white"
        ></v-textarea>
      </v-card>
    </v-row>
    <br />

    <v-row class="justify-center">
      <cronometro></cronometro>
    </v-row>

    <v-row class="justify-center">
      <v-btn color="#ff0000" class="rounded-xl" small @click="finLlamada"
        >FINALIZAR LLAMADA</v-btn
      >
    </v-row>

    <v-dialog v-model="dialogFinalizar" width="400" persistent>
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
            @click="confirmarFinalizarLlamada"
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
            @click="dialogFinalizar = false"
          >
            <v-icon dark>fa-times</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import AnimacionLlamada from "@/components/ContactCenter/AnimacionLlamada.vue";
import router from "@/router";
import Cronometro from "@/components/ContactCenter/Cronometro.vue";
import { mapActions } from "vuex";

export default {
  components: {
    "animacion-llamada": AnimacionLlamada,
    cronometro: Cronometro,
  },

  data: () => ({
    comentario: null,
    dialogFinalizar: false,
  }),

  methods: {
    ...mapActions("LlamadaEntrante", ["finalizarLlamada"]),

    finLlamada() {
      this.dialogFinalizar = true;
    },

    confirmarFinalizarLlamada() {
      var datos = {
        idUsuario: this.$store.state.LoginStore.IdUsuario,
        comentario: this.$store.state.LlamadaEntrante.comentarioLlamada,
      };

      this.finalizarLlamada(datos);
      this.$store.state.LlamadaEntrante.verMotivosLlamada = false;
      router.push("/").catch(() => {});
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
