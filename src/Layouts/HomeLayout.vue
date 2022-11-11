<template>
  <v-app
    id="app"
    style="background: linear-gradient(to left top, #0041f3, #0040da, #003dc2, #003aa9, #063690);"
  >
    <v-app-bar
      :height="`${appBarHeight}`"
      app
      class="navbar"
      dark
      :clipped-right="true"
    >
      <div
        class="ml-md-5 ml-lg-5 mr-sm-10  mr-lg-0  mr-md-0"
        style="width: 15vh; cursor: pointer"
      >
        <v-img src="@/assets/logo-laplata-min.png" @click="ImgClic"></v-img>

        <!-- prueba para acceso de retencion directo -->
       <router-link to="/validacion" v-show="false"><v-btn> RSuc.</v-btn></router-link> 
      </div>
      <div
        class="ml-md-5 ml-lg-5 mr-sm-10  mr-lg-0  mr-md-0"
        style="width: 15vh; cursor: pointer"
      >
        <!-- <v-img src="@/assets/logo-laplata-min.png" @click="ImgClic"></v-img> -->

        <!-- prueba para acceso de retencion directo -->
      </div>
      <div class="vertical-line"></div>
      <div class="ml-md-5 mb-md-n3">
        <v-menu offset-y :close-on-content-click="false">
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on" class="text-body-2 ml-lg-0 ml-md-0"
              >Menú de acceso
              <v-icon class="mb-1 ml-n1" right>mdi-chevron-down</v-icon>
            </span>
          </template>
          <div class="mt-md-3">
            <menu-acceso :nodes="menuVue"></menu-acceso>
          </div>
        </v-menu>
      </div>
      <div class="vertical-line"></div>
      <div class="ml-md-n10">
        <buscador-menu></buscador-menu>
      </div>
      <div class="vertical-line"></div>
      <div class="ml-md-5 font-weight-bold mb-md-n4" style="width: 250px;">
        {{ $store.state.LoginStore.menuActual.substr(0, 28) }}
      </div>
      <div class="vertical-line mr-md-4 mr-lg-4"></div>
      <div class="d-inline">
        <v-avatar size="40">
          <img src="@/assets/user-avatar.png" />
        </v-avatar>
      </div>
      <div class="ml-1">
        <div class="userName d-block mt-n2">
          {{ Nombres.split(" ")[0] }} {{ Apellidos.split(" ")[0] }}
        </div>
        <div class="userCargo d-block my-n2">
          {{ $store.state.LoginStore.Cargo.substr(0,18) }}, Local
          {{ $store.state.LoginStore.LocalComercial.substr(0, 13) }}
        </div>
      </div>
      <div class="ml-2">
        <v-btn icon small color="#ffffff"><v-icon>mdi-settings</v-icon></v-btn>
      </div>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <div class="vertical-line"></div>
      <div class="text-body-2 d-inline ml-md-11" style="color: white;">
        Cerrar Sesion
      </div>
      <div class="d-inline">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" @click="AUTH_LOGOUT({})">
              <v-icon size="25">fa-power-off</v-icon>
            </v-btn>
          </template>
          <span>Salir</span>
        </v-tooltip>
      </div>
    </v-app-bar>

    <v-container><router-view /></v-container>

    <v-footer app color="#f9c701" height="55px" :inset="true">
      <v-col cols="12">
        <acceso-directo
          :idPerfil="
            $store.state.LoginStore.IdPerfil == ''
              ? 0
              : $store.state.LoginStore.IdPerfil
             
          "
          style="margin-top: -110px;"
        ></acceso-directo></v-col
    ></v-footer>
  </v-app>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";
import store from "@/store";
import { DxTreeView } from "devextreme-vue/tree-view";
import router from "@/router";
import BuscadorMenu from "@/components/Layout/BuscadorMenu.vue";
import AccesoDirecto from "@/components/Layout/AccesoDirecto.vue";
import MenuAcceso from "@/components/Layout/MenuAcceso.vue";

export default {
  components: {
    DxTreeView,
    "buscador-menu": BuscadorMenu,
    "acceso-directo": AccesoDirecto,
    "menu-acceso": MenuAcceso,
  },

  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
    inicio: "/",
    operacion: "",
    menuVue: store.state.LoginStore.MenuVue,
  }),
  computed: {
    ...mapState("LoginStore", ["MenuVue", "Nombres", "Apellidos"]),
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },

    appBarHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "100px";
        case "sm":
          return "80px";
        case "md":
          return "65px";
        case "lg":
          return "55px";
        case "xl":
          return "55px";
      }
    },
  },
  methods: {
    ...mapActions("LoginStore", ["AUTH_LOGOUT"]),
    CambiarOperacion(operacion) {
      store.state.LoginStore.MenuActual = operacion;
    },

    ImgClic() {
      router.push("/").catch(() => {});
    },
  },

  mounted() {},
};
</script>

<style lang="scss">
.navbar {
  /* padding: 15px 10px; */
  background: radial-gradient(ellipse at right, #0041f3 80%, #063690 100%) fixed;
  border: none;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  margin-bottom: 5px;
  box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.1);
}

.v-application .userCargo {
  font-size: 0.7rem !important;
  font-weight: 400;
  line-height: 1.25rem;
  letter-spacing: 0.0178571429em !important;
  font-family: Montserrat !important;
}

.v-application .userName {
  font-size: 0.8rem !important;
  font-weight: 400;
  line-height: 1.5rem;
  letter-spacing: 0.03125em !important;
  font-family: Montserrat !important;
}

.v-application .buscador {
  font-size: 0.8rem !important;
  font-weight: 400;
  line-height: 1.5rem;
  letter-spacing: 0.03125em !important;
  font-family: Montserrat !important;
}

.v-application--is-ltr .buscador.v-text-field .v-label {
  transform-origin: top left;
  font-size: 12px;
}

.v-application .text-body-2 {
  font-size: 0.875rem !important;
  font-weight: 400;
  line-height: 1.25rem;
  letter-spacing: 0.0178571429em !important;
  font-family: Montserrat !important;
}

.v-application .caption {
  font-size: 0.75rem !important;
  font-weight: 400;
  letter-spacing: 0.0333333333em !important;
  line-height: 1.25rem;
  font-family: "Montserrat", sans-serif !important;
}

.dx-treeview-item.dx-state-hover {
  background-color: #012b78;
  color: white;
}

.dx-treeview-item-without-checkbox.dx-state-focused > .dx-treeview-item {
  background-color: #063690;
  color: white;
}

.dx-treeview-item .dx-treeview-item-content span {
  vertical-align: middle;
  font-family: Montserrat;
  font-size: 13px;
  margin-bottom: -10px;
}

.treeview.dx-widget {
  color: white !important;
  font-weight: 400;
  font-size: 13px;
  font-family: Montserrat !important;
  line-height: 1.35715;
}

.dx-treeview-toggle-item-visibility {
  color: white;
}

.dx-widget {
  color: rgba(0, 0, 0, 0.87) !important;
  font-weight: 400;
  font-size: 13px;
  font-family: Montserrat !important;
  line-height: 1.35715;
}

.v-menu__content {
  box-shadow: none !important;
}

.card-title {
  color: #063690;
  font-family: Montserrat-bold;
  font-size: 0.75rem !important;
}

.vertical-line {
  margin-left: 20px;
  max-height: 35px;
  margin-top: 10px;
  width: 1px; /* Line width */
  background-color: white; /* Line color */
  height: 100%; /* Override in-line if you want specific height. */
  float: left; /* Causes the line to float to left of content.
        You can instead use position:absolute or display:inline-block
        if this fits better with your design */
}

.v-application .headline {
  font-size: 1.5rem !important;
  font-weight: 400;
  line-height: 2rem;
  letter-spacing: normal !important;
  font-family: Montserrat !important;
}
</style>
