<!-- @format -->

<template>
  <v-row justify="center">
    <v-col lg="4" md="4" sm="5" xs="12">
      <v-card
        class="formLogin login"
        height="320"
        width="250"
        v-on:keyup.enter="AUTH_REQUEST({ username: user, password: pass })"
      >
        <v-card-text>
          <v-form>
            <v-text-field
              label="Usuario"
              name="Usuario"
              prepend-icon="mdi-account"
              type="text"
              v-model="user"
              autocomplete="off"
            />
            <v-text-field
              id="password"
              label="Password"
              name="password"
              prepend-icon="mdi-lock"
              v-model="pass"
              autocomplete="off"
              type="password"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            width="120px"
            style="border-radius: 50px 0px 40px 0px"
            color="primary"
            @click="AUTH_REQUEST({ username: user, password: pass })"
            >Ingresar</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col lg="4" md="4" sm="4" xs="12">
      <v-carousel
        class="mt-10"
        :interval="3000"
        :show-arrows="false"
        hide-delimiters
        cycle
        hide-delimiter-background
        show-arrows-on-hover
      >
        <v-carousel-item>
          <!-- <div class="texto1 text-left">
              <v-icon size="25" class="mb-10 ml-1">fa-quote-left</v-icon>
              Medidas de Seguridad de Covid-19
              <v-icon size="25" class="mb-10">fa-quote-right</v-icon>
            </div>
            <div class="texto2 text-left">
              Uso obligatorio del Tapabocas. Lavarse las manos después de cada
              transacción. Utilizar la máscara de protección.
            </div> -->
          <div class="texto1">Bienvenido</div>
        </v-carousel-item>
      </v-carousel>
    </v-col>
    <v-col lg="4" md="4" sm="3" xs="12">
      <v-img class="imagen" src="@/assets/logo_tapabocas.png"></v-img>
    </v-col>
  </v-row>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";

export default {
  data: () => ({
    visible: false,
    user: "",
    pass: "",
  }),
  methods: {
    ...mapActions("LoginStore", ["AUTH_REQUEST"]),
  },

  mounted() {
    this.visible = true;
    localStorage.removeItem("user-token");
  },
  props: {
    source: String,
  },
};
</script>

<style lang="scss">
@media only screen and (min-width: 0px) and (max-width: 600px) {
  .imagen {
    margin-top: -250px;
    margin-left: 0;
  }
  .login {
    margin-left: 60px;
    padding-top: 35px;
  }
  .texto1 {
    font-style: normal;
    font-weight: bold;
    font-size: 35px;
    color: rgba(255, 255, 255, 1);
  }

  .texto2 {
    margin-top: -6px;
    text-align: left;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    color: rgba(255, 255, 255, 1);
  }
}
@media only screen and (min-width: 601px) and (max-width: 960px) {
  .imagen {
    margin-top: 400px;
    margin-left: -320px;
  }
  .texto1 {
    font-style: normal;
    font-weight: bold;
    font-size: 35px;
    color: rgba(255, 255, 255, 1);
  }

  .texto2 {
    margin-top: -6px;
    text-align: left;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    color: rgba(255, 255, 255, 1);
  }
}
@media only screen and (min-width: 961px) and (max-width: 1264px) {
  .imagen {
    margin-top: 400px;
    margin-left: -50px;
  }
  .login {
    margin-top: 190px;
    margin-left: 65px;
    padding-top: 35px;
  }
  .texto1 {
    font-style: normal;
    font-weight: bold;
    font-size: 35px;
    color: rgba(255, 255, 255, 1);
  }

  .texto2 {
    margin-top: -6px;
    text-align: left;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    color: rgba(255, 255, 255, 1);
  }
}
@media only screen and (min-width: 1265px) and (max-width: 1904px) {
  .imagen {
    margin-top: 350px;
    margin-left: -40px;
  }
  .login {
    margin-top: 190px;
    margin-left: 80px;
    padding-top: 40px;
  }
  .texto1 {
    font-style: normal;
    font-weight: bold;
    font-size: 35px;
    color: rgba(255, 255, 255, 1);
  }

  .texto2 {
    margin-top: -6px;
    text-align: left;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    color: rgba(255, 255, 255, 1);
  }
}
@media only screen and (min-width: 1905px) and (max-width: 2000px) {
  .imagen {
    margin-top: 450px;
    margin-left: -80px;
  }
  .login {
    margin-top: 450px;
    margin-left: 150px;
    padding-top: 40px;
  }
  .texto1 {
    font-style: normal;
    font-weight: bold;
    font-size: 35px;
    color: rgba(255, 255, 255, 1);
  }

  .texto2 {
    margin-top: -6px;
    text-align: left;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    color: rgba(255, 255, 255, 1);
  }
}

.formLogin.v-sheet.v-card {
  border-radius: 70px 0px 70px 0px;
}
</style>
