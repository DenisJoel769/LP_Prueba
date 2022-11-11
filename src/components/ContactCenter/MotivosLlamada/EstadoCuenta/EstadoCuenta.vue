<template>
  <div>
    <v-row
      ><v-col offset-md="1" md="3">
        <div>
          <v-btn
            style="border-color: #efefef; border-style: solid"
            small
            absolute
            dark
            fab
            :color="tipoBoleta == 1 ? '#0041f3' : '#7494eb'"
            @click="tipoBoleta = 1"
          >
            <v-icon>fa-clipboard-check</v-icon>
          </v-btn>
          <v-chip
            class="ma-2"
            :color="tipoBoleta == 1 ? '#0041f3' : '#7494eb'"
            style="width: 32vh; height: 25px"
            text-color="white"
            @click="tipoBoleta = 1"
          >
            <div class="ml-6 font-weight-bold" style="font-size: 15px">
              BOLETAS ACTIVAS
            </div>
          </v-chip>
        </div>
      </v-col>

      <v-col md="2">
        <div class="ml-n12">
          <v-btn
            style="border-color: #efefef; border-style: solid"
            small
            absolute
            dark
            fab
            :color="tipoBoleta == 0 ? '#565656' : '#a8acb2'"
            @click="tipoBoleta = 0"
          >
            <v-icon>fa-clipboard</v-icon>
          </v-btn>
          <v-chip
            class="ma-2"
            :color="tipoBoleta == 0 ? '#565656' : '#a8acb2'"
            style="width: 32vh; height: 25px"
            text-color="white"
            @click="tipoBoleta = 0"
          >
            <div class="ml-6 font-weight-bold" style="font-size: 15px">
              BOLETAS INACTIVAS
            </div>
          </v-chip>
        </div>
      </v-col>
      <v-col md="3">
        <v-text-field
          v-show="tipoBoleta == 1"
          v-model="busquedaBoletaActiva"
          autocomplete="off"
          dense
          label="Buscar Boleta"
          append-outer-icon="fa-search"
          color="#063690"
          class="caption buscadorBoletas"
          style="font-size: 12px"
        ></v-text-field>

        <v-text-field
          v-show="tipoBoleta == 0"
          v-model="busquedaBoletaInactiva"
          autocomplete="off"
          dense
          label="Buscar Boleta"
          append-outer-icon="fa-search"
          color="#063690"
          class="caption buscadorBoletas"
          style="font-size: 12px"
        ></v-text-field>
      </v-col>
    </v-row>

    <div class="d-flex justify-center mt-n4">
      <div v-for="ayuda in ayudas" :key="ayuda.descripcion" v-show="tipoBoleta == 1">
        <div class="ayuda ma-3">
          <v-icon size="15" left :color="ayuda.iconColor">{{ ayuda.icon }}</v-icon>
          {{ ayuda.descripcion }}
        </div>
      </div>

      <v-chip
        v-show="tipoBoleta == 1"
        class="caption font-weight-bold rounded-lg mt-n2 ml-5"
        large
        style="
          width: 150px;
          white-space: pre-wrap;
          line-height: 1.2;
          webkit-box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.75);
        "
        text-color="#063690"
        color="white"
        label
        @click="abrirSimuladorPagos"
        :disabled="false"
      >
        <v-icon size="40" left>mdi-chart-bar</v-icon>SIMULADOR DE PAGOS</v-chip
      >
    </div>

    <!-- Componentes que muestran de acuerdo a la seleccion de boletas...activas o inactivas -->
    <!-- 1 es boleta activa y 0 boleta inactiva -->
    <div v-show="tipoBoleta == 1">
      <boletas-empenadas
        :boletas="boletasActivas.filter((x) => x.idEstadoEmpenho == 12)"
      ></boletas-empenadas>
      <br />
      <boletas-remates
        :boletas="boletasActivas.filter((x) => x.idEstadoEmpenho == 13)"
      ></boletas-remates>
    </div>
    <div v-show="tipoBoleta == 0">
      <boletas-retiradas
        :boletas="boletasInactivas.filter((x) => x.idEstadoEmpenho == 15)"
      ></boletas-retiradas>
      <br />
      <boletas-vendidas
        :boletas="boletasInactivas.filter((x) => x.idEstadoEmpenho == 14)"
      ></boletas-vendidas>

      <llamada-entrante ref="refLlamadaEntrante"></llamada-entrante>
    </div>
  </div>
</template>

<script src="./EstadoCuenta.js"></script>

<style>
.buscadorBoletas .v-label {
  font-size: 12px;
}

.ayuda {
  font-size: 13px;
  font-weight: 600;
  line-height: 1.21;
  letter-spacing: normal;
  text-align: left;
  color: #0449cb;
}
</style>
