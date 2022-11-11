<template>
  <div>
    <v-row class="mb-n5 mt-n5">
      <v-col offset-md="1" md="1">
        <div class="tituloVend ml-3">Retirado</div>
      </v-col>
    </v-row>
    <v-sheet class="mx-auto" color="transparent" height="150">
      <v-slide-group
        class="pa-4 iconSlideBoletaVend"
        prev-icon="fa-caret-left"
        next-icon="fa-caret-right"
        show-arrows="always"
      >
        <v-slide-item v-for="n in 6" :key="n">
          <v-card
            elevation="0"
            class="ml-10 iconCardBoletaVend rounded-lg"
            width="120"
            height="110"
            color="#949494"
          >
            <v-card-text>
              <v-row>
                <div class="mt-n2 ml-1">
                  <div class="nroBoletaVend">667733/1</div>
                  <div class="articuloBoletaVend">Licuadora</div>
                  <div class="detalleBoletaVend">V.: 14/10/20</div>
                </div>
                <v-spacer></v-spacer> </v-row
            ></v-card-text>
            <v-card-actions class="mt-3">
              <v-icon size="15" left color="#565656">fa-shopping-cart</v-icon>
              <v-spacer></v-spacer>
              <v-icon size="15" left color="#565656">fa-info</v-icon>
            </v-card-actions>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </div>
</template>

<script>
export default {
  data: () => ({}),
};
</script>

<style lang="scss">
$color-text-boleta: #ffffff;
$color-titulo: #949494;
$color-icon-slide-enabled: #949494;
$color-icon-slide-disabled: #949494;

.nroBoletaVend {
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  line-height: 1.22;
  color: $color-text-boleta;
}

.articuloBoletaVend {
  font-family: Montserrat;
  font-size: 12px;
  font-weight: 600;
  text-align: left;
  line-height: 1.19;
  color: $color-text-boleta;
}

.detalleBoletaVend {
  font-family: Montserrat;
  font-size: 10px;
  font-weight: 500;
  text-align: left;
  line-height: 1.21;
  color: $color-text-boleta;
}

.tituloVend {
  font-family: Montserrat;
  font-size: 18px;
  font-weight: bold;
  line-height: 1.23;
  color: $color-titulo;
}

.iconSlideBoletaVend .v-icon.v-icon {
  font-size: 70px;
}

.iconCardBoletaVend .v-icon.v-icon {
  font-size: 28px;
}

.iconSlideBoletaVend .fa-caret-right {
  color: $color-icon-slide-enabled;
}

.iconSlideBoletaVend .fa-caret-left {
  color: $color-icon-slide-enabled;
}

.iconSlideBoletaVend .theme--light.v-icon.v-icon.v-icon--disabled {
  color: $color-icon-slide-disabled !important;
}
</style>
