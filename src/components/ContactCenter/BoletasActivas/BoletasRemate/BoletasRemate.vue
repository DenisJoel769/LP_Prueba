<template>
  <div>
    <v-row class="mb-n6 mt-n5">
      <v-col offset-md="1" md="4">
        <div class="tituloRem ml-3">
          A la venta - {{ boletas.length }} Boletas
        </div>
      </v-col>
    </v-row>

    <v-sheet
      class="mx-auto d-flex justify-center"
      color="transparent"
      height="170"
    >
      <v-slide-group
        class="pa-4 iconSlideBoletaRem"
        prev-icon="fa-caret-left"
        next-icon="fa-caret-right"
        show-arrows="always"
        style="width: 1070px"
      >
        <v-slide-item v-for="boleta in boletas" :key="boleta.idEmpenho">
          <v-card
            elevation="0"
            class="ml-10 iconCardBoletaRem rounded-lg"
            width="110"
            height="140"
            color="#f02525"
            @click="verDetalleBoleta(boleta.idEmpenho)"
          >
            <v-card-text>
              <v-row>
                <div class="mt-n2 ml-1">
                  <div class="nroBoletaRem">{{ boleta.nroBoleta }}</div>
                  <div class="articuloBoletaRem">
                    {{ boleta.articuloCategoria.substr(0, 10) }}
                  </div>
                  <div class="detalleBoletaEmp">
                    A:
                    {{ boleta.atraso }}
                  </div>
                  <div class="detalleBoletaRem">
                    V:
                    {{
                      new Date(boleta.fechaVencimiento).toLocaleDateString(
                        "es-py"
                      )
                    }}
                  </div>
                  <div class="detalleBoletaRem" style="width: 70px">
                    P. Minimo
                    {{
                      new Intl.NumberFormat("es-PY", {
                        maximumFractionDigits: 0,
                      }).format(boleta.pagoMinimo)
                    }}
                    Gs
                  </div>
                </div>
                <v-spacer></v-spacer></v-row
            ></v-card-text>
            <v-card-actions class="mt-n3">
              <v-icon size="15" left color="#ffd014" v-show="boleta.retenido"
                >fa-lock</v-icon
              >
              <v-icon
                size="15"
                left
                color="black"
                v-show="!boleta.disponibleRetiro"
                >fa-ban</v-icon
              >
              <v-icon
                size="15"
                left
                color="#4afff9"
                v-show="boleta.disponibleRetiro"
                >fa-check-circle</v-icon
              >
            </v-card-actions>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>

    <v-dialog
      persistent
      v-model="detalleBoleta"
      max-width="1150"
      style="heigth: 600"
    >
      <v-card class="rounded-xl overflow-x-auto" height="580">
        <br />
        <detalle-boleta
          v-if="detalleBoleta"
          :idEmpenho="idEmpenho"
        ></detalle-boleta>

        <v-card-actions>
          <div
            style="color: #063690; font-size: 13px"
            class="ml-5 font-weight-bold"
          >
            Boleta anterior
            <v-btn
              icon
              color="success"
              :disabled="verAtras"
              @click="
                atras(boletas.findIndex((x) => x.idEmpenho === idEmpenho))
              "
            >
              <v-icon color="#063690">fa-chevron-circle-left</v-icon>
            </v-btn>
          </div>
          <div
            style="color: #063690; font-size: 13px"
            class="ml-5 font-weight-bold"
          >
            Siguiente Boleta
            <v-btn
              icon
              color="success"
              :disabled="verSiguiente"
              @click="
                siguiente(boletas.findIndex((x) => x.idEmpenho === idEmpenho))
              "
            >
              <v-icon color="#063690">fa-chevron-circle-right</v-icon>
            </v-btn>
          </div>
          <v-spacer></v-spacer>
          <div style="color: #063690; font-size: 13px" class="font-weight-bold">
            Cerrar
          </div>
          <v-btn icon color="success" @click="detalleBoleta = false">
            <v-icon color="#063690">fa-times-circle</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script src="./BoletasRemate.js"></script>

<style lang="scss">
$color-text-boleta: #ffffff;
$color-titulo: #8d0404;
$color-icon-slide-disabled: #e57373;
$color-icon-slide-enabled: #f02525;

.nroBoletaRem {
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  line-height: 1.22;
  color: $color-text-boleta;
}

.articuloBoletaRem {
  font-family: Montserrat;
  font-size: 12px;
  font-weight: 600;
  text-align: left;
  line-height: 1.19;
  color: $color-text-boleta;
}

.detalleBoletaRem {
  font-family: Montserrat;
  font-size: 10px;
  font-weight: 500;
  text-align: left;
  line-height: 1.21;
  color: $color-text-boleta;
}

.tituloRem {
  font-family: Montserrat-bold;
  font-size: 18px;
  font-weight: bold;
  line-height: 1.23;
  color: $color-titulo;
}

.iconSlideBoletaRem .v-icon.v-icon {
  font-size: 70px;
}

.iconCardBoletaRem .v-icon.v-icon {
  font-size: 30px;
}

.iconSlideBoletaRem .fa-caret-right {
  color: $color-icon-slide-enabled;
}

.iconSlideBoletaRem .fa-caret-left {
  color: $color-icon-slide-enabled;
}

.iconSlideBoletaRem .theme--light.v-icon.v-icon.v-icon--disabled {
  color: $color-icon-slide-disabled !important;
}
</style>
