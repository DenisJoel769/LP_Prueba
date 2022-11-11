<template>
  <div>
    <div>

    <v-row class="d-none d-lg-flex d-xl-flex" align="center" justify="center">

        <v-col
          v-for="accesoDirecto
           in $store.state.LoginStore.AccesoDirecto"
          :key="accesoDirecto.idAccesoDirecto"
        >
          <v-card
            width="19vh"
            height="17vh"
            elevation="2"
            class="rounded-xl mx-auto mt-lg-2 mt-xl-n12 iconAccesoDirecto"
            @click="accesoDirectoClic(accesoDirecto)"
          >
           <!--  Si tiene mas de 9 caracteres muestra el tooltip -->
            <v-tooltip left v-if="accesoDirecto.name.length > 10">
              <template v-slot:activator="{ on, attrs }">
                <v-card-title
                  v-bind="attrs"
                  v-on="on"
                  class="card-title justify-center"
                  >{{ accesoDirecto.name.substr(0, 9) }}</v-card-title
                >
              </template>
              <span>{{ accesoDirecto.name }}</span>
            </v-tooltip>

            <v-card-title v-else class="card-title justify-center">{{
              accesoDirecto.name.substr(0, 9)
            }}</v-card-title>

            <v-icon
              class="mt-n5 d-flex align-center"
              size="35"
              :color="accesoDirecto.iconColor"
              >{{ accesoDirecto.icon }}</v-icon        
            >
            
            </v-card>
        </v-col>

      </v-row>
      <v-sheet class="mx-auto d-lg-none d-xl-none" color="transparent">
        <v-slide-group
          v-model="model"
          class="pa-4 accesoDirecto"
          prev-icon="fa-caret-left"
          next-icon="fa-caret-right"
          show-arrows="always"
          style="font-size : 100px;"

        >       
          <v-slide-item
            v-for="accesoDirecto in $store.state.LoginStore.AccesoDirecto"
            :key="accesoDirecto.idAccesoDirecto"
          >
            <v-card
              width="17vh"
              height="16vh"
              elevation="2"
              class="rounded-xl ma-4 iconAccesoDirecto"
              style="margin-top: -80px"
              @click="accesoDirectoClic(accesoDirecto)"
            >

              <!-- Si tiene mas de 9 caracteres muestra el tooltip -->
             <v-tooltip left v-if="accesoDirecto.name.length > 10">
                <template v-slot:activator="{ on, attrs }">
                  <v-card-title
                    v-bind="attrs"
                    v-on="on"
                    class="card-title justify-center"
                    >{{ accesoDirecto.name.substr(0, 9) }}</v-card-title
                  >
                </template>
                <span>{{ accesoDirecto.name }}</span>
              </v-tooltip>

              <v-card-title v-else class="card-title justify-center">{{
                accesoDirecto.name.substr(0, 9)
              }}</v-card-title>
            <!--   <v-card-title v-else class="card-title justify-center">{{
                accesoDirecto.name.substr(0, 9)
              }}</v-card-title> -->

              <v-icon
                class="mt-n5 d-flex align-center"
                size="35"
                :color="accesoDirecto.iconColor"
                >{{ accesoDirecto.icon }}</v-icon
              >
              
              </v-card
            >
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </div>
    <llamada-entrante ref="refLlamadaEntrante"></llamada-entrante>
  </div>
</template>

<script>
import router from "@/router";
import store from "@/store";
import LlamadaEntrante from "@/components/ContactCenter/LlamadaEntrante/LlamadaEntrante.vue";
import LlamadaMotivo from "@/components/ContactCenter/LlamadaMotivo.vue";
import { mapActions } from "vuex";

export default {
  components: {
    "llamada-entrante": LlamadaEntrante,
    "llamada-motivo": LlamadaMotivo,
  },

  data: () => ({
    model: null,
    showArrows: true,
  }),

  methods: {
    ...mapActions("LlamadaEntrante", ["iniciarLlamada", "insertAccion"]),

    accesoDirectoClic(accesoDirecto) {
      if (accesoDirecto.tipoLlamada == null) {
        window.open(accesoDirecto.urlExterna);
      } else if (accesoDirecto.tipoLlamada == 1) {
        //Registra el inicio de la llamada
        var datos = {
          idUsuario: store.state.LoginStore.IdUsuario,
          cedula: "",
          nombre: "",
          apellido: "",
          numero: "",
          comentario: "",
          entranteSaliente: true,
        };

        this.iniciarLlamada(datos);
        this.$refs.refLlamadaEntrante.verDialogLlamEntrante = true;
      }
    },
  },
};
</script>

<style lang="scss">
.accesoDirecto .v-icon.v-icon {
  font-size: 80px;
}

.iconAccesoDirecto .v-icon.v-icon {
  font-size: 30px;
}
</style>
