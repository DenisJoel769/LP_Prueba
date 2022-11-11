<template>
  <llamada-motivo
    v-if="$store.state.LlamadaEntrante.verMotivosLlamada"
  ></llamada-motivo>
  <acceso-directo-contact v-else-if="idPerfil == 24"></acceso-directo-contact>
  <acceso-directo-usuarios v-else></acceso-directo-usuarios>
</template>

<script>
import AccesoDirectoUsuarios from "./AccesoDirectoUsuarios.vue";
import AccesoDirectoContact from "./AccesoDirectoContact.vue";
import LlamadaMotivo from "@/components/ContactCenter/LlamadaMotivo.vue";

export default {
  components: {
    "acceso-directo-usuarios": AccesoDirectoUsuarios,
    "acceso-directo-contact": AccesoDirectoContact,
    "llamada-motivo": LlamadaMotivo,
  },
  mounted() {},
  props: {
    idPerfil: {
      type: Number,
      default: null,
    },
  },
};
</script>

<style></style>
