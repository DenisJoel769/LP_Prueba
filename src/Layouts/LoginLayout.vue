<!-- @format -->

<template>
  <v-app>
    <div id="contenedor">
      <v-img class="fondoImagen" src="../assets/background-login.png">
        <v-main><router-view /></v-main
      ></v-img>
    </div>
  </v-app>
</template>

<style>
@media only screen and (min-width: 0px) and (max-width: 600px) {
  .fondoImagen {
    width: 100%;
  }
}
@media only screen and (min-width: 600px) and (max-width: 960px) {
  .fondoImagen {
    width: 100%;
    height: 100vh;
  }
}
@media only screen and (min-width: 960px) and (max-width: 1264) {
  .fondoImagen {
    width: 100%;
    height: 100vh;
  }
}
@media only screen and (min-width: 1264px) and (max-width: 1904px) {
  .fondoImagen {
    width: 100%;
    height: 100vh;
  }
}

.fondo {
  background-image: url(../assets/background-login.png);
  background-position: inherit;
  background-repeat: no-repeat;
  background-size: 95vw;
  position: absolute;
}
#app {
  background-color: white;
}
#contenedor {
  width: 100%;
  text-align: center;
}
</style>
