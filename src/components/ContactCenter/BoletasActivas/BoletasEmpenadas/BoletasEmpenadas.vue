<template>
  <div>
    <v-row class="mb-n5">
      <v-col offset-md="1" md="4">
        <div class="tituloEmp ml-3">
          Empeñado - {{ boletas.length }} Boletas
        </div>
      </v-col>
    </v-row>
    <v-sheet
      class="mx-auto d-flex justify-center"
      color="transparent"
      height="170"
    >
      <v-slide-group
        class="pa-4 iconSlideBoletaEmp"
        prev-icon="fa-caret-left"
        next-icon="fa-caret-right"
        show-arrows="always"
        style="width: 1070px"
      >
        <v-slide-item v-for="boleta in boletas" :key="boleta.idEmpenho">
          <v-card
            elevation="0"
            class="ml-10 iconCardBoletaEmp rounded-lg"
            width="110"
            height="140"
            color="#5FA21D"
            @click="verDetalleBoleta(boleta.idEmpenho)"
          >
            <v-card-text>
              <v-row>
                <div class="mt-n2 ml-1">
                  <div class="nroBoletaEmp">{{ boleta.nroBoleta }}</div>
                  <v-row>
                    <div class="ml-3 articuloBoletaEmp d-inline">
                      {{ boleta.articuloCategoria.split(";")[0].substr(0, 10) }}

                      <v-menu open-on-hover bottom offset-y>
                        <template v-slot:activator="{ on, attrs }">
                          <div
                            v-if="
                              boleta.articuloCategoria.split(';').length > 1
                            "
                            class="d-inline"
                            v-bind="attrs"
                            v-on="on"
                          >
                            +{{ boleta.articuloCategoria.split(";").length }}
                          </div>
                        </template>

                        <v-list style="background: #363636">
                          <v-list-item
                            v-for="(
                              item, index
                            ) in boleta.articuloCategoria.split(';')"
                            :key="index"
                          >
                            <v-list-item-title
                              style="color: #ffffff; font-size: 14px"
                              >{{ item }}</v-list-item-title
                            >
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </div>
                  </v-row>
                  <div class="detalleBoletaEmp">
                    A:
                    {{ boleta.atraso }}
                  </div>
                  <div class="detalleBoletaEmp">
                    V:
                    {{
                      new Date(boleta.fechaVencimiento).toLocaleDateString(
                        "es-py"
                      )
                    }}
                  </div>
                  <div class="detalleBoletaEmp" style="width: 70px">
                    P. Mínimo
                    {{
                      new Intl.NumberFormat("es-PY", {
                        maximumFractionDigits: 0,
                      }).format(boleta.pagoMinimo)
                    }}
                    Gs
                  </div>
                </div>
              </v-row></v-card-text
            >
            <v-card-actions class="mt-n4">
              <v-icon size="15" left color="#8d0404" v-show="boleta.aRematar"
                >fa-exclamation-triangle</v-icon
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
              <v-icon size="15" left color="#ffd014" v-show="boleta.retenido"
                >fa-lock</v-icon
              >
            </v-card-actions>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>

    <v-dialog persistent v-model="detalleBoleta" max-width="1150">
      <v-card class="rounded-xl overflow-x-auto" height="auto">
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

<script src="./BoletasEmpenadas.js"></script>

<style lang="scss">
$color-text-boleta: white;
$color-titulo: #005006;
$color-icon-slide-enabled: #5fa21d;
$color-icon-slide-disabled: #aed581;

.nroBoletaEmp {
  font-family: Montserrat;
  font-size: 17px;
  font-weight: 600;
  text-align: left;
  line-height: 1.22;
  color: $color-text-boleta;
}

.articuloBoletaEmp {
  font-family: Montserrat;
  font-size: 13px;
  font-weight: 600;
  text-align: left;
  line-height: 1.19;
  color: $color-text-boleta;
}

.detalleBoletaEmp {
  font-family: Montserrat;
  font-size: 11px;
  font-weight: 500;
  text-align: left;
  line-height: 1.21;
  color: $color-text-boleta;
}

.tituloEmp {
  font-family: Montserrat-bold;
  font-size: 18px;
  font-weight: bold;
  line-height: 1.23;
  color: $color-titulo;
}

.iconSlideBoletaEmp .v-icon.v-icon {
  font-size: 70px;
}

.iconCardBoletaEmp .v-icon.v-icon {
  font-size: 28px;
}

.iconSlideBoletaEmp .fa-caret-right {
  color: $color-icon-slide-enabled;
}

.iconSlideBoletaEmp .fa-caret-left {
  color: $color-icon-slide-enabled;
}

.iconSlideBoletaEmp .theme--light.v-icon.v-icon.v-icon--disabled {
  color: $color-icon-slide-disabled !important;
}
</style>
