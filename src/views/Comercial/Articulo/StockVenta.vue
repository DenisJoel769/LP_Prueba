<template>
  <div>
    <v-row justify="center">
      <v-col v-for="(articulo, index) in articulosVenta" :key="index" cols="auto">
        <v-card class="mx-auto my-auto rounded-xl" max-width="200">
          <v-img height="150" :src="articulo.foto"></v-img>

          <v-card-title class="caption">{{
            articulo.articuloCategoria.substr(0, 19)
          }}</v-card-title>

          <v-card-text style="font-size: 10px">
            <div>
              {{ articulo.descripcion.substr(0, 80) }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script src="./StockVenta.js"></script>

<style></style>
