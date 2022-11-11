<template>
  <div>
    <div class="d-flex justify-center mt-n4">
      <div v-for="ayuda in ayudas" :key="ayuda.descripcion">
        <div class="ayuda ma-3">
          <v-icon size="15" left :color="ayuda.iconColor">{{ ayuda.icon }}</v-icon>
          {{ ayuda.descripcion }}
        </div>
      </div>
    </div>

    <v-row class="justify-start">
      <v-btn
        color="white"
        small
        elevation="5"
        class="ma-2 text-none font-weight-bold"
        style="color: #5caeda"
      >
        <v-icon left dark>mdi-share-variant</v-icon>
        Compartir
      </v-btn>

     <v-card class="ml-2 mb-n1" width="250" height="50" color="#5caeda">
        <v-card-text>
          <v-row>
            <div class="mt-n1 ml-5" style="font-size: 12px; color: white; width: 100px">
              Fecha a Pagar
            </div>
            <v-menu
              ref="menuFecha"
              v-model="menuFecha"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-chip
                  class="mt-n1"
                  color="white"
                  text-color="#0449cb"
                  v-bind="attrs"
                  v-on="on"
                  label
                  small
                >
                  {{ dateFecha.split("-").reverse().join("/") }}
                  <v-icon right small>fa-calendar-check</v-icon>
                </v-chip>
              </template>
              <v-date-picker
                v-model="dateFecha"
                no-title
                @input="menuFecha = false"
              ></v-date-picker>
            </v-menu>
          </v-row>
        </v-card-text>
      </v-card> 
      <!-- <v-card style="background: transparent" elevation="0">
        <v-chip style="width: 150px" class="caption ml-2 mt-2" color="primary" label>
          Descuento Total 25%
        </v-chip>
        <v-chip
          class="ml-n1 caption font-weight-bold mt-2"
          color="primary"
          label
          outlined
        >
          9.999.000 G.
        </v-chip>
      </v-card> -->

      <!-- <v-card style="background: transparent" elevation="0">
        <v-chip style="width: 120px" class="caption ml-2 mt-2" color="primary" label>
          Total a pagar
        </v-chip>
        <v-chip
          class="ml-n1 caption font-weight-bold mt-2"
          color="primary"
          label
          outlined
        >
          9.999.999 G.
        </v-chip>
      </v-card> -->
    </v-row>

    <v-row class="justify-center mt-2" style="height: 200px" width="200px">
      <v-data-table
        height="220"
        fixed-header
        :headers="headers"
        :items="boletasTabla"
        :class="tableBoletas"
        hide-default-footer
        :items-per-page="-1"
        style="background: transparent"
       >
        <template v-slot:item="props">
          <tr class="espacio"></tr>
           <tr
            :class="
              props.item.idEstadoEmpenho == 12
                ? 'styleBoletasEmp tableBoletasRowHoverOff'
                : 'styleBoletasRem tableBoletasRowHoverOff'
            "
           >
            <td class="rounded-l-lg">
              <v-btn color="transparent" tile icon x-small v-model="props.item.idEmpenho"
                ><v-icon color="#063690">fa-plus</v-icon></v-btn
              >
            </td>
            <td>{{ props.item.nroBoleta }}</td>
            <td>
              <v-select
                v-model="props.item.tipo"
                :items="itemsSelect"
                item-text="tipo"
                item-value="id"
                style="width: 20vh; height: 2vh"
                class="caption mt-n8"
              >
              </v-select>
            </td>
            <td>
              {{
                new Intl.NumberFormat("es-PY", {
                  maximumFractionDigits: 0,
                }).format(props.item.saldo)
              }}
              G.
            </td>
            <td fgcolor="red">
              <v-text-field
                v-model="props.item.amortizacion"
                class="caption mt-n8"
                style="width: 20vh; height: 2vh"
                suffix="Gs."
                :disabled="props.item.tipo == 2 ? true : false"
              ></v-text-field>
            </td>
            <td>
              <v-text-field
                v-model="props.item.meses"
                class="caption mt-n8"
                style="width: 5vh; height: 2vh"
                :disabled="props.item.tipo == 2 ? true : false"
              ></v-text-field>
            </td>
            <td>{{ props.item.dias }}</td>
            <td>
              {{
                new Intl.NumberFormat("es-PY", {
                  maximumFractionDigits: 0,
                }).format(props.item.interes)
              }}
              G.
            </td>
            <td>
              {{
                new Intl.NumberFormat("es-PY", {
                  maximumFractionDigits: 0,
                }).format(props.item.descuento)
              }}
              G.
            </td>
            <td>
              {{
                new Intl.NumberFormat("es-PY", {
                  maximumFractionDigits: 0,
                }).format(props.item.total)
              }}
              G.
            </td>
            <td class="rounded-r-lg">
              <v-icon @click="quitarBoletaTabla(props.item, props.index)"
                >mdi-delete</v-icon
              >
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-row>
    <!--Modificacion -->
    <v-row class="justify-end" style="width: 95%">
                 <v-card style="background: transparent" elevation="0">
                      <v-chip style="width: 150px" class="caption ml-2 mt-7" color="primary" label>
                        Descuento Total 25%
                      </v-chip>
                        <v-chip
                          class="ml-n1 caption font-weight-bold mt-7"
                          color="primary"
                          label
                          outlined
                        >
                        9.999.000 G.
                      </v-chip>
                 </v-card>
                  <v-card style="background: transparent" elevation="0">
                      <v-chip style="width: 120px" class="caption ml-2 mt-7" color="primary" label>
                        Total a pagar
                      </v-chip>
                      <v-chip
                        class="ml-n1 caption font-weight-bold mt-7"
                        color="primary"
                        label
                        outlined
                      >
                        9.999.999 G.
                      </v-chip>
                </v-card>
    </v-row>
    
    <v-row class="mb-n5 mt-4">
      <!-- <v-col offset-md="1" md="3">
        <v-text-field
          autocomplete="off"
          v-model="buscarBoletaSimulador"
          dense
          label="Buscar Boleta"
          append-outer-icon="fa-search"
          color="#063690"
          class="caption buscadorBoletas"
          style="font-size: 12px"
        ></v-text-field>
      </v-col> -->
      <!-- <v-col offset-md="1" md="3">
        <v-text-field aria-autocomplete="off" v-model="busquedaBoletaRetencion" label="Buscar Boleta"
          append-outer-icon="fa-search" color="#063690" caption="aption buscadorBoletas" style="font-size: 12px">
        </v-text-field>
      </v-col> -->
      <v-col offset-md= "1" md="3">
          <v-text-field aria-autocomplete="off" v-model="busquedaBoletasSimulador" label="Buscar Boleta" 
          append-outer-icon="fa-search" color="#063690" caption="aption buscadorBoletas" style="font-size: 12px">
          </v-text-field>
      </v-col>

      <v-col>
        <v-btn small color="primary" class="text-none" @click="seleccionarTodo"
          >Seleccionar todo</v-btn
        >
         <v-btn  class="caption ml-2" small color="error" small-class="text-none" @click="CancelarSimulador = true">Cancelar</v-btn>
      </v-col>
       
    </v-row>

    <v-sheet color="transparent">
      <v-slide-group
        class="iconSlideBoletaSimulador"
        prev-icon="fa-caret-left"
        next-icon="fa-caret-right"
        show-arrows="always"
      >
        <v-slide-item v-for="(boleta, index) in boletasActivas" :key="boleta.idEmpenho">
          <v-card
            elevation="0"
            class="ml-10 iconCardBoletaSimulador rounded-lg"
            width="100"
            height="100"
            :color="boleta.idEstadoEmpenho == 12 ? '#5FA21D' : '#f02525'"
          >
            <v-card-text style="height: 90px">
              <v-row>
                <div class="mt-n2 ml-1">
                  <div class="nroBoleta">{{ boleta.nroBoleta }}</div>
                </div>
                <div class="mt-n4 ml-2">
                  <v-icon size="25" @click="agregarBoletaSeleccionada(boleta, index)" 
                    >mdi-checkbox-blank-outline</v-icon
                  >
                </div>
              </v-row>

              <v-row
                v-for="articulo in boleta.articuloCategoria.split(';')"
                :key="articulo.idArticulo"
              >
                <div class="ml-1 articuloBoleta d-inline">
                  {{ articulo.split(";")[0].substr(0, 10) }}
                </div>
              </v-row>
            </v-card-text>

            <v-card-actions class="mt-n4">
              <v-icon size="15" left color="#8d0404" v-show="boleta.aRematar"
                >fa-exclamation-triangle</v-icon
              >
              <v-icon size="15" left color="black" v-show="!boleta.disponibleRetiro"
                >fa-ban</v-icon
              >
              <v-icon size="15" left color="#4afff9" v-show="boleta.disponibleRetiro"
                >fa-check-circle</v-icon
              >
            </v-card-actions>
          </v-card>
        </v-slide-item>
      </v-slide-group>
<!-- 
              <div class="text-center mb-5 mt-2" v-show="loaderView">
                  <v-progress-circular 
                     indeterminate
                  color="primary" >                 
                  </v-progress-circular>
              </div> -->
              <div class="text-center" v-show="loaderView" style="position: relative; z-index:1000" >
                <v-row align="center" justify="center">
                  <v-row justify="center">
                      <v-overlay>
                        <v-progress-circular indeterminate color="primary"> </v-progress-circular>
                      </v-overlay>
                  </v-row>
                </v-row>
              </div>
    </v-sheet>
  </div>
</template>

<script src="./SimuladorPago.js"></script>

<style lang="scss">
$color-boletas-emp: #bdfb80;
$color-boletas-rem: #f02525;
$color-text-emp: #063690;
$color-text-rem: #ffffff;

.tableBoletas.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  font-size: 0.8rem;
  height: 35px;
}

.tableBoletas.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  height: 25px;
  background: #063690;
}

.tableBoletas tbody tr:not(.tableBoletasRowHoverOff):hover td {
  background-color: #dcdcdc;
  transition: all 0.01s ease-in-out;
}

.styleBoletasRem {
  background-color: $color-boletas-rem !important;
  color: $color-text-rem !important;
}

.styleBoletasEmp {
  background-color: $color-boletas-emp !important;
  border-color: $color-boletas-emp !important;
}

.espacio {
  height: 4px;
}

$color-text-boleta: white;
$color-icon-slide-enabled: #5fa21d;
$color-icon-slide-disabled: #aed581;

.nroBoleta {
  font-family: Montserrat;
  font-size: 13px;
  font-weight: 600;
  text-align: left;
  line-height: 1.22;
  color: $color-text-boleta;
}

.articuloBoleta {
  font-family: Montserrat;
  font-size: 10px;
  font-weight: 500;
  text-align: left;
  line-height: 1.19;
  color: $color-text-boleta;
}

.iconSlideBoletaSimulador .v-icon.v-icon {
  font-size: 70px;
}

.iconCardBoletaSimulador .v-icon.v-icon {
  font-size: 28px;
}

.iconSlideBoletaSimulador .fa-caret-right {
  color: $color-icon-slide-enabled;
}

.iconSlideBoletaSimulador .fa-caret-left {
  color: $color-icon-slide-enabled;
}

.iconSlideBoletaSimulador .theme--light.v-icon.v-icon.v-icon--disabled {
  color: $color-icon-slide-disabled !important;
}

.ayuda {
  font-size: 13px;
  font-weight: 600;
  line-height: 1.21;
  letter-spacing: normal;
  text-align: left;
  color: #0449cb;
}

.buscadorBoletas .v-label {
  font-size: 12px;
}
</style>
