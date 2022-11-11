<template>
  <div>
    <v-row class="mb-n5 mt-11">
      <v-col offset-md="1" md="1">
        <div class="tituloRet ml-3">Retirado</div>
      </v-col>
    </v-row>
    <v-sheet class="mx-auto d-flex justify-center" color="transparent" height="150">
      <v-slide-group
        class="pa-4 iconSlideBoletaRet"
        prev-icon="fa-caret-left"
        next-icon="fa-caret-right"
        show-arrows="always"
        style="width: 1070px"
      >
        <v-slide-item v-for="boleta in boletas" :key="boleta.idEmpenho">
          <v-card
            elevation="0"
            class="ml-10 iconCardBoletaRet rounded-lg"
            width="110"
            height="110"
            color="#949494"
          >
            <v-card-text>
              <v-row>
                <div class="mt-n2 ml-1">
                  <div class="nroBoletaRet">{{ boleta.nroBoleta }}</div>
                  <v-row>
                    <div class="ml-3 articuloBoletaRet d-inline">
                      {{ boleta.articuloCategoria.split(";")[0].substr(0, 10) }}

                      <v-menu open-on-hover bottom offset-y>
                        <template v-slot:activator="{ on, attrs }">
                          <div
                            v-if="boleta.articuloCategoria.split(';').length > 1"
                            class="d-inline"
                            v-bind="attrs"
                            v-on="on"
                          >
                            +{{ boleta.articuloCategoria.split(";").length }}
                          </div>
                        </template>

                        <v-list style="background: #363636">
                          <v-list-item
                            v-for="(item, index) in boleta.articuloCategoria.split(';')"
                            :key="index"
                          >
                            <v-list-item-title style="color: #ffffff; font-size: 14px">{{
                              item
                            }}</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </div>
                  </v-row>
                  <div class="detalleBoletaRet">
                    {{ new Date(boleta.fechaRetiro).toLocaleDateString("es-py") }}
                  </div>
                </div>
                <v-spacer></v-spacer> </v-row
            ></v-card-text>
            <v-card-actions class="mt-3">
              <v-icon size="15" left color="#565656">fa-sign-out-alt</v-icon>
              <!--               <v-spacer></v-spacer>
              <v-icon size="15" left color="#565656">fa-info</v-icon> -->
            </v-card-actions>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </div>
</template>

<script src="./BoletasRetiradas.js"></script>

<style lang="scss">
$color-text-boleta: #ffffff;
$color-titulo: #949494;
$color-icon-slide-enabled: #949494;
$color-icon-slide-disabled: #949494;

.nroBoletaRet {
  font-family: Montserrat;
  font-size: 17px;
  font-weight: 600;
  text-align: left;
  line-height: 1.22;
  color: $color-text-boleta;
}

.articuloBoletaRet {
  font-family: Montserrat;
  font-size: 13px;
  font-weight: 600;
  text-align: left;
  line-height: 1.19;
  color: $color-text-boleta;
}

.detalleBoletaRet {
  font-family: Montserrat;
  font-size: 11px;
  font-weight: 500;
  text-align: left;
  line-height: 1.21;
  color: $color-text-boleta;
}

.tituloRet {
  font-family: Montserrat;
  font-size: 18px;
  font-weight: bold;
  line-height: 1.23;
  color: $color-titulo;
}

.iconSlideBoletaRet .v-icon.v-icon {
  font-size: 70px;
}

.iconCardBoletaRet .v-icon.v-icon {
  font-size: 28px;
}

.iconSlideBoletaRet .fa-caret-right {
  color: $color-icon-slide-enabled;
}

.iconSlideBoletaRet .fa-caret-left {
  color: $color-icon-slide-enabled;
}

.iconSlideBoletaRet .theme--light.v-icon.v-icon.v-icon--disabled {
  color: $color-icon-slide-disabled !important;
}
</style>
