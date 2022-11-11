<template>
  <v-app id="app">
    <v-app-bar
      :height="`${appBarHeight}`"
      app
      class="navbar"
      dark
      :clipped-right="true"
    >
      <div
        class="ml-md-5 ml-lg-5 mr-sm-10 mr-lg-0 mr-md-0"
        style="width: 15vh; cursor: pointer"
      >
        <v-img src="@/assets/logo-laplata-min.png" @click="ImgClic"></v-img>
      </div>
      <div class="vertical-line"></div>
      <div class="ml-md-5 mb-md-n3">
        <v-menu
          offset-y
          :close-on-content-click="false"
          max-height="500"
          v-model="menuAcceso"
        >
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on" class="text-body-2 ml-lg-0 ml-md-0"
              >Menú de acceso
              <v-icon class="mb-1 ml-n1" right>mdi-chevron-down</v-icon>
            </span>
          </template>
          <div class="mt-md-3">
            <menu-acceso @selected="cerrarMenu" :nodes="menuVue"></menu-acceso>
          </div>
        </v-menu>
      </div>
      <div class="vertical-line"></div>
      <div class="ml-md-n10">
        <buscador-menu></buscador-menu>
      </div>
      <div class="vertical-line"></div>
      <div class="ml-md-5 font-weight-bold mb-md-n4" style="width: 250px">
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
          {{ $store.state.LoginStore.Cargo.substr(0, 18) }}, Local
          {{ $store.state.LoginStore.LocalComercial.substr(0, 13) }}
        </div>
      </div>
      <div class="ml-2">
        <v-btn icon small color="#ffffff"><v-icon>mdi-settings</v-icon></v-btn>
      </div>
      <v-spacer></v-spacer>
      <div class="vertical-line"></div>
      <div class="text-body-2 d-inline ml-md-11" style="color: white">
        Cerrar Sesión
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

    <v-navigation-drawer
      :v-if="`${drawer}`"
      class="d-none d-md-flex d-lg-flex d-xl-flex"
      :clipped="true"
      permanent
      color="#063690"
      :right="true"
      :app="drawer"
      dark
      width="31vh"
      height="100%"
      fixed
    >
    </v-navigation-drawer>

    <v-footer app color="#f9c701" height="55px" :inset="true">
      <v-col md="12">
        <acceso-directo
          :idPerfil="
            $store.state.LoginStore.IdPerfil == ''
              ? 0
              : $store.state.LoginStore.IdPerfil
          "
          style="margin-top: -110px"
        ></acceso-directo
      ></v-col>
    </v-footer>

    <v-container>
      <div class="d-flex justify-end">
        <div class="d-inline caption font-weight-bold" style="color: #8a8a8a">
          Agregar a favoritos
        </div>
        <div class="d-inline mt-n1 ml-1">
          <v-icon
            v-if="$store.state.LoginStore.esFavorito"
            color="#f9c701"
            @click="quitarFavorito"
          >
            mdi-star
          </v-icon>
          <v-icon v-else @click="agregarFavorito">mdi-star</v-icon>
        </div>
        <div class="d-inline ml-1" style="color: #8a8a8a">/</div>
        <div class="d-inline mt-n1 ml-1">
          <v-menu open-on-hover bottom offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on" color="#8a8a8a">mdi-help</v-icon>
            </template>
            <v-list style="background: #363636">
              <v-list-item>
                <v-list-item-title style="color: #ffffff; font-size: 14px">
                  {{ $store.state.LoginStore.DescripcionMenu }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
      <router-view
    /></v-container>
  </v-app>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";
import store from "@/store";
import { DxTreeView } from "devextreme-vue/tree-view";
import BuscadorMenu from "@/components/Layout/BuscadorMenu.vue";
import router from "@/router";
import AccesoDirecto from "@/components/Layout/AccesoDirecto.vue";
import AnimacionLlamada from "@/components/ContactCenter/AnimacionLlamada.vue";
import MenuAcceso from "@/components/Layout/MenuAcceso.vue";

export default {
  components: {
    DxTreeView,
    "buscador-menu": BuscadorMenu,
    "acceso-directo": AccesoDirecto,
    "animacion-llamada": AnimacionLlamada,
    "menu-acceso": MenuAcceso,
  },

  props: {
    source: String,
  },
  data: () => ({
    inicio: "/",
    operacion: "",
    menuVue: store.state.LoginStore.MenuVue,
    accesoDirecto: store.state.LoginStore.AccesoDirecto,
    menuAcceso: false,
  }),
  computed: {
    ...mapState("LoginStore", ["MenuVue", "Nombres", "Apellidos"]),
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },

    drawer() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return false;
        case "sm":
          return false;
        case "md":
          return true;
        case "lg":
          return true;
        case "xl":
          return true;
      }
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

    cerrarMenu() {
      this.menuAcceso = false;
    },

    async obtenerFavoritos() {
      let token = localStorage.getItem("user-token");

      let idUsuario = this.$store.state.LoginStore.IdUsuario;
      let idPerfil = this.$store.state.LoginStore.IdPerfil;

      await axios({
        method: "get",
        url: "/users/ObtenerFavoritos/" + idUsuario + "/" + idPerfil,
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          this.$store.state.LoginStore.MenuFavorito = response.data;
          this.$store.state.LoginStore.esFavorito =
            !this.$store.state.LoginStore.esFavorito;
        })
        .catch((error) => {
          this.$store.commit("snackbar/mostrarMensaje", {
            mensaje: error.response.data.error,
            color: "error",
          });
        });
    },

    async quitarFavorito() {
      let token = localStorage.getItem("user-token");

      var datos = {
        idUsuario: this.$store.state.LoginStore.IdUsuario,
        idMenuVue: this.buscarMenuFavorito(),
      };

      await axios({
        method: "delete",
        url: "/users/EliminarFavorito",
        data: datos,
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          this.obtenerFavoritos();
        })
        .catch((error) => {
          this.$store.commit("snackbar/mostrarMensaje", {
            mensaje: error.response.data.error,
            color: "error",
          });
        });
    },

    async agregarFavorito() {
      let token = localStorage.getItem("user-token");
      var menuVue = this.$store.state.LoginStore.MenuVue;
      var pathActual = window.location.pathname.replace("/LpSac", "");

      var datos = {
        idUsuario: this.$store.state.LoginStore.IdUsuario,
        idMenuVue: this.buscarMenuVue(menuVue, pathActual),
      };

      await axios({
        method: "post",
        url: "/users/AgregarFavorito",
        data: datos,
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          this.obtenerFavoritos();
        })
        .catch((error) => {
          this.$store.commit("snackbar/mostrarMensaje", {
            mensaje: error.response.data.error,
            color: "error",
          });
        });
    },

    buscarMenuFavorito() {
      var menuFavorito = this.$store.state.LoginStore.MenuFavorito;
      var pathActual = window.location.pathname.replace("/LpSac", "");

      let idMenuVue = null;
      try {
        menuFavorito.forEach((menu) => {
          if (menu.path.toUpperCase() === pathActual.toUpperCase()) {
            idMenuVue = menu.idMenuVue;
          }
        });
        return idMenuVue;
      } catch (error) {}
    },

    buscarMenuVue(menuVue, pathActual) {
      try {
        menuVue.forEach((menu) => {
          if (menu.items.length !== 0) {
            this.buscarMenuVue(menu.items, pathActual);
          } else if (menu.path === pathActual) {
            this.menu = menu;
          }
        });
        return this.menu.idMenuVue;
      } catch (error) {}
    },
  },

  created() {},
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
</style>
