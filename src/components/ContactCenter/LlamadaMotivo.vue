<template>
  <v-sheet class="mx-auto" color="transparent">
    <v-slide-group
      class="pa-4 iconMotivo"
      prev-icon="fa-caret-left"
      next-icon="fa-caret-right"
      show-arrows="always"
      center-active
    >
      <v-slide-item v-for="motivo in motivosLlamada" :key="motivo.idLlamadaMotivo">
        <v-card
          @click="actualizarComponente(motivo)"
          width="17vh"
          height="16vh"
          elevation="2"
          :class="`rounded-xl iconLlamadaMotivo ma-4 ${motivo.class}`"
          color="white"
        >
          <div style="height: 20px" class="mt-3 d-flex justify-center titleCardMotivo">
            {{ motivo.llamadaMotivo }}
          </div>
          <br />
          <v-icon class="mt-n4 d-flex align-center" size="35" color="#0041f3">{{
            motivo.icon
          }}</v-icon></v-card
        >
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    llamadaMotivo: [],
  }),

  methods: {
    ...mapActions("LlamadaEntrante", ["insertAccion"]),

    async cargarMotivos() {
      var motivos = [];

      let token = localStorage.getItem("user-token");

      await axios
        .get("/api/MotivoLlamada", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => (motivos = response.data.sort((a, b) => a.orden - b.orden)))
        .catch((err) => {
          console.warn(err.response.data.error);
        });

      motivos.forEach((motivo) => {
        motivo.class = "cardOpacity";
        this.llamadaMotivo.push(motivo);
      });

      //Actualiza al cargar el componente con el motivo actual seleccionado al principio
      this.obtenerComponentesRelacionados(
        this.$store.state.LlamadaEntrante.componenteActual
      );
    },

    actualizarComponente(item) {
      this.$store.state.LlamadaEntrante.componenteActual = item;
      //con este metodo pongo los colores como piden en los motivos que esten relacionados
      this.obtenerComponentesRelacionados(item);
      this.$store.state.LoginStore.menuActual = item.llamadaMotivo;
      this.insertAccion(item.llamadaMotivo);
    },

    obtenerComponentesRelacionados(item) {
      try {
        var motivos = [];

        //Posicion del motivo seleccionado
        let index = this.llamadaMotivo.findIndex(
          (element) => element.idLlamadaMotivo === item.idLlamadaMotivo
        );

        //Posicion de los motivos que tienen relacion con el seleccionado
        let indexRelacion = null;

        this.llamadaMotivo.forEach((motivo) => {
          /*Los padres y todos los hijos tienen la misma clase*/
          if (motivo.idLlamadaMotivoPadre == item.idLlamadaMotivo) {
            indexRelacion = this.llamadaMotivo.indexOf(motivo);
            this.llamadaMotivo[indexRelacion].class = "cardActivo";
          } else if (item.idLlamadaMotivoPadre == motivo.idLlamadaMotivo) {
            indexRelacion = this.llamadaMotivo.indexOf(motivo);
            this.llamadaMotivo[indexRelacion].class = "cardActivo";
          } else if (
            item.idLlamadaMotivoPadre != null &&
            item.idLlamadaMotivoPadre == motivo.idLlamadaMotivoPadre
          ) {
            indexRelacion = this.llamadaMotivo.indexOf(motivo);
            this.llamadaMotivo[indexRelacion].class = "cardActivo";
          } else {
            motivo.class = "cardOpacity";
          }
        });
        this.llamadaMotivo[index].class = "cardActivo";
      } catch (error) {
        console.error(error);
      }
    },
  },

  computed: {
    motivosLlamada() {
      return this.llamadaMotivo;
    },
  },

  mounted() {
    this.cargarMotivos();
  },
};
</script>

<style>
.iconMotivo .v-icon.v-icon {
  font-size: 80px;
}

.iconLlamadaMotivo .v-icon.v-icon {
  font-size: 30px;
}

.titleCardMotivo {
  font-family: Montserrat;
  font-size: 11px;
  font-weight: bold;
  line-height: 1;
  text-align: left;
  color: #063690;
}

.cardOpacity {
  opacity: 0.5;
}

.cardActivo {
  opacity: 1;
}
</style>
