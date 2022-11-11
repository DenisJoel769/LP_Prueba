<!-- @format -->

<template>
  <v-app>
    <v-main>
      <router-view />
      <snackbar-mensaje></snackbar-mensaje>
    </v-main>
  </v-app>
</template>

<script>
import Snackbar from "@/components/Util/Snackbar.vue";

export default {
  name: "App",
  components: {
    "snackbar-mensaje": Snackbar,
  },
  data: () => ({
    menu: {},
  }),
  methods: {
    verificarFavorito() {
      var menuFavorito = this.$store.state.LoginStore.MenuFavorito;
      var pathActual = window.location.pathname.replace("/LpSac", "");
      return this.obtenerMenuFavorito(menuFavorito, pathActual);
    },

    obtenerMenuFavorito(menuFavorito, pathActual) {
      let esFavorito = false;
      try {
        menuFavorito.forEach((menu) => {
          if (menu.path.toUpperCase() === pathActual.toUpperCase()) {
            esFavorito = true;
          }
        });
        return esFavorito;
      } catch (error) {}
    },

    obtenerMenuDescripcion() {
      try {
        var menuVue = this.$store.state.LoginStore.MenuVue;
        var pathActual = window.location.pathname.replace("/LpSac", "");
        return this.obtenerMenu(menuVue, pathActual);
      } catch (error) {}
    },

    obtenerMenu(menuVue, pathActual) {
      try {
        menuVue.forEach((menu) => {
          if (menu.items.length !== 0) {
            this.obtenerMenu(menu.items, pathActual);
          } else if (menu.path === pathActual) {
            this.menu = menu;
          }
        });
        return this.menu.menuDescripcion;
      } catch (error) {}
    },
  },

  created() {},

  watch: {
    $route(to, from) {
      this.$store.state.LoginStore.DescripcionMenu =
        this.obtenerMenuDescripcion();
      this.$store.state.LoginStore.esFavorito = this.verificarFavorito();
    },
  },
};
</script>

<style lang="scss">
@import "@/Style/Main.scss";

#app {
  background-color: var(--v-background-base);
  font-family: $body-font-family;
}
</style>
