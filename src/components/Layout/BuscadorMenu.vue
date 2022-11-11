<template>
  <div>
    <v-autocomplete
      dense
      class="ml-md-15 mb-md-n5 buscador"
      :items="items"
      label="¿Qué deseas buscar?"
      item-text="descripcion"
      item-value="path"
      single-line
      append-outer-icon="fa-search"
      hide-no-data
      hide-selected
      @change="pruebaCambio"
      :disabled="disabled"
    ></v-autocomplete>
  </div>
</template>

<script>
import store from "@/store";
import router from "@/router";

export default {
  data: () => ({
    busqueda: "",
    items: store.state.LoginStore.MenuBuscador,
  }),
  methods: {
    pruebaCambio(event) {
      router.push(event).catch(() => {});
    },
  },

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  mounted() {},
};
</script>

<style>
.buscador.v-text-field .v-input__append-inner {
  margin-left: auto;
  padding-left: 4px;
  display: none;
}
</style>
