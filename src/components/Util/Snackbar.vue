<template>
  <v-snackbar
    :top="posicion === 'top'"
    :bottom="posicion === 'bottom'"
    v-model="show"
    :color="color"
    timeout="5000"
  >
    {{ message }}
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      message: "",
      color: "",
      posicion: "",
    };
  },

  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "snackbar/mostrarMensaje") {
        this.message = state.snackbar.mensaje;
        this.color = state.snackbar.color;
        this.posicion = state.snackbar.posicion;
        this.show = true;
      }
    });
  },
};
</script>
