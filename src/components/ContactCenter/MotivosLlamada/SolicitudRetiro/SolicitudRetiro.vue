<template>
  <div class="container px-5" v-cloak>

    <div class="d-flex justify-center" v-cloak>

      <div v-for="ayuda in ayudas" :key="ayuda.descripcion">
        <div class="ayuda ma-3">
          <v-icon size="15" left :color="ayuda.iconColor">{{ ayuda.icon }}</v-icon>
          {{ ayuda.descripcion }}
        </div>
      </div>

    </div>
    <!-- Para calcular el total general a pagar de todas las boletas seleccionadas -->

    <div class="d-flex my-4 px-5" v-cloak>
      <v-row class="ml-0 ">
        <v-card class="mb-n1 ml-4 " width="280" height="50" color="#1976D2">
          <v-card-text>
            <v-row>
              <div class="mt-n1 ml-3 " style="font-size: 12px; color: white; width: 150px">
                Fecha de Entrega
              </div>

              <v-menu ref="menuFecha" v-model="menuFecha" :close-on-content-click="false" transition="scale-transition"
                offset-y max-width="390px" min-width="300px">
                <template v-slot:activator="{ on, attrs }">
                  <v-chip class="mt-n1" color="white" text-color="#0449cb" v-bind="attrs" v-on="on" label small>
                    {{
                     fechapagoSeleccion
                    }}
                    <v-icon right small>fa-calendar-check</v-icon>
                  </v-chip>
                </template>

                <v-date-picker v-model="fechapagoSeleccion" no-title @input="menuFecha = false"></v-date-picker>

              </v-menu>

              <!--             <div class="mt-n1 ml-4" style="font-size: 12px; color: white; width: 100px">
              Días de Espera
            </div>

            <v-chip class="mt-n1" color="white" text-color="#0449cb" label small>
              {{ diasEspera }}
              días
            </v-chip> -->
            </v-row>
          </v-card-text>
          <!-- <v-card style="background: transparent" elevation="0">
          <v-chip style="width: 120px" class="caption ml-2 mt-2" color="primary" label>
            Total a pagar
          </v-chip>
          <v-chip class="ml-n1 caption font-weight-bold mt-2" color="primary" label outlined>
            9.999.999 G.
          </v-chip>
        </v-card> -->
        </v-card>

      </v-row>

    </div>

    <!-- <v-row justify="center">
      <v-btn
        color="white"
        small
        elevation="5"
        class="ma-2 text-none font-weight-bold"
        style="color: #063690"
      >
        <v-icon left dark>mdi-share-variant</v-icon>
        Compartir
      </v-btn>

      <v-card class="ml-2 mb-n1" width="250" height="50" color="#063690">
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

      <v-card style="background: transparent" elevation="0">
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
      </v-card>

      <v-card style="background: transparent" elevation="0">
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
      </v-card>
    </v-row> -->
    <v-row class="justify-center mt-3 text-center" style="height: 200px" v-cloak>

      <v-data-table height="220" fixed-header :headers="headers" :items="boletasTablaInteresCalculado"
        :class="tableBoletas" hide-default-footer :items-per-page="-1" style="background: transparent">

        <template v-slot:item="props" class="text-center">

          <tr class="espacio"></tr>
          <!--   <tr :class="
              props.item.idEstadoEmpenho == 12 
                ? 'styleBoletasEmp tableBoletasRowHoverOff'
                : 'styleBoletasRem tableBoletasRowHoverOff'
            " class="text-center"> -->
          <tr :class="'styleBoletasEmp tableBoletasRowHoverOff'" class="text-center">
            <!-- <td class="rounded-l-lg">
              <v-btn color="transparent" tile icon x-small v-model="props.item.idEmpenho"
                ><v-icon color="#063690">fa-plus</v-icon></v-btn
              >
            </td> -->

            <td class="rounded-l-lg ">
              {{ props.item.idEmpenho }}
            </td>

            <td>
              {{ props.item.nroBoleta }}
            </td>
            <!-- <td>
              {{ props.item.interesImporte}}
            </td> -->
            <!-- <td>
              {{ props.item}}
            </td> -->

            <!--  <td>
              {{ }}
            </td> -->
            <!--  <td>
              {{ props.item }}
            </td> -->

            <td>{{ props.item.articuloCategoria }}</td>

            <td>{{new Intl.NumberFormat("es-PY", {
                  maximumFractionDigits: 0,
                }).format(props.item.interesImporte)}} G.</td>

            <!--     <td>
              {{
                new Intl.NumberFormat("es-PY", {
                  maximumFractionDigits: 0,
                }).format(props.item.pagoMinimo)
              }}
              G.
            </td>
 -->
            <!--    <td>
              {{ new Date(props.item.fechaVencimiento).toLocaleDateString("es-py") }}
            </td>
 -->

            <!--  <td>
              {{
                new Intl.NumberFormat("es-PY", {
                  maximumFractionDigits: 0,
                }).format(props.item.pagoMinimo)
              }}
              G.
            </td> -->

            <td>{{ props.item.atraso}}</td>

            <td>{{new Intl.NumberFormat("es-PY", {
                  maximumFractionDigits: 0,
                }).format(props.item.total)}} G.</td>
            <!-- <td>{{ props.item.transaccionEstado }}</td> -->


            <td class="rounded-r-lg">
              <v-icon @click="quitarBoletaTabla(props.item,  props.item.total)">mdi-delete</v-icon>
            </td>

            <!--  <td class="rounded-r-lg">
              <v-icon @click="quitarBoletaTabla(props.item, props.index)">mdi-checkbox-marked</v-icon>
            </td> -->
            <!--  <td>
              {{
                new Intl.NumberFormat("es-PY", {
                  maximumFractionDigits: 0,
                }).format(props.item.saldo)
              }}
              G.
            </td>
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
                >mdi-checkbox-marked</v-icon
              >
            </td> -->
          </tr>

        </template>


      </v-data-table>

    </v-row>


    <v-row class="mb-n5 mt-4" v-cloak>
      <v-col offset-md="1" md="3">
        <v-text-field autocomplete="off" dense v-model="busquedaBoletaActiva" label="Buscar Boleta"
          append-outer-icon="fa-search" color="#063690" class="caption buscadorBoletas" style="font-size: 12px">
        </v-text-field>
      </v-col>
      <!-- =========================================================================== -->

      <!-- Agregado Boton de cancelar -->
      <v-row justify="center" class="mt-n8" align="center">

        <v-btn small color="primary" class="text-none mr-5" @click="seleccionarTodo" :disabled="btnDisable == true">
          Seleccionar todo</v-btn>

        <v-btn small color="error" class="text-none" @click="dialogCancelar = true">Cancelar</v-btn>

        <v-btn small color="success" class="text-none ml-5 mr-5" @click="generarSolicitud()" >Generar Solicitud</v-btn>
        <v-card style="background: transparent; margin-right:22px; text-align:center;" elevation="0">
          <v-chip style="width: 120px" class="caption  ms-4 mt-2 text-center" color="error" label >
            Monto total
          </v-chip>
          <v-chip class="ml-n1 caption font-weight-bold mt-2" color="error" label outlined>
            {{
            new Intl.NumberFormat("es-PY", {
              maximumFractionDigits: 0,
            }).format(montoTotal)
          }} Gs. </v-chip>
        </v-card>
      </v-row>

      <!-- =========================================================================== -->
    </v-row>

    <v-sheet color="transparent" v-cloak v-if="boletasActivas.length > 0">
      <v-slide-group class="iconSlideBoletaSimulador text-center" prev-icon="fa-caret-left" next-icon="fa-caret-right"
        show-arrows="always">
        <v-slide-item v-for="boleta in boletasActivas" :key="boleta.idEmpenho" v-slot="{ active, toggle }">
          <v-card elevation="0" class="ml-10 iconCardBoletaSimulador rounded-lg" width="100" height="100"
            :color="active ? '#0041f3' : '#5FA21D'" @click="toggle">

            <v-card-text style="height: 90px; text-align:center;">

              <v-row>
                <div class="mt-n2 ml-1">
                  <div class="nroBoleta">{{ boleta.nroBoleta }}</div>
                </div>


                <div class="mt-n4 ml-2">
                  <v-icon size="25" @click="agregarBoletaSeleccionada(boleta,  boleta.nroBoleta)">
                    mdi-checkbox-blank-outline
                  </v-icon>
                </div>
              </v-row>

              <v-row v-for="articulo in boleta.articuloCategoria.split(';')" :key="articulo.idArticulo">
                <div class="ml-1 articuloBoleta d-inline">
                  {{ articulo.split(";")[0].substr(0, 10) }}
                </div>
              </v-row>

            </v-card-text>

          </v-card>
        </v-slide-item>

      </v-slide-group>
    </v-sheet>

    <div class="mt-5" v-else>

      <v-alert border="right" colored-border type="error" elevation="2">
        <p class="mt-1"> No tiene boletas para solicitar retiro. </p>
      </v-alert>

    </div>

    <!-- Dialog de Confirmar Solicitud de Retiro -->
    <v-dialog v-model="dialogConfirmRetiro" width="400" v-cloak>
      <v-card width="400" class="rounded-xl">
        <v-card-title class="tituloConfirmRetiro justify-center font-weight-bold">
          <div style="font-size: 3vh">Confirmar Solicitud</div>
        </v-card-title>

        <v-card-text>
          <div class="mt-3 mb-n4 black--text" style="font-size: 15px">
            ¿Está seguro que quiere generar la solicitud de retiro para las boletas
            seleccionadas?
          </div>
        </v-card-text>

        <v-card-actions>
          <v-row no-gutters justify="center">
            <v-btn fab dark elevation="2" small color="#1b7700" @click="generarSolicitud">
              <v-icon dark>fa-check</v-icon>
            </v-btn>
            <v-btn fab dark elevation="2" small color="#dc0000" class="ml-6" @click="dialogConfirmRetiro = false">
              <v-icon dark>fa-times</v-icon>
            </v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div class="text-center" v-show="loaderView === true" style="position:relative; z-index:1000">

      <v-row align="center" justify="center">

        <v-row justify="center">

          <v-overlay>

            <v-progress-circular indeterminate color="primary"></v-progress-circular>

          </v-overlay>
        </v-row>

      </v-row>

    </div>

    <!-- Dialog de Cancelar Solicitud de Retiro -->
    <v-dialog v-model="dialogCancelar" width="450" v-cloak style="z-index:-100;">
      <v-card class="rounded-xl">
        <br />
        <v-card-text>
          <div class="text-center" style="color: #7494eb; font-size: 20px">
            ¿Estas seguro que deseas cancelar la Solicitud de Retiro?
          </div>
        </v-card-text>

        <v-card-actions>
          <v-row no-gutters justify="center">
            <v-btn fab dark elevation="2" small color="#1b7700">
              <v-icon dark @click="cancelarSolicitudRetiro()">fa-check</v-icon>
            </v-btn>
            <v-btn fab dark elevation="2" small color="#dc0000" class="ml-6" @click="dialogCancelar = false">
              <v-icon dark>fa-times</v-icon>
            </v-btn>
          </v-row>
        </v-card-actions>
        <br />
      </v-card>
    </v-dialog>



  </div>
</template>

<script src="./SolicitudRetiro.js"></script>

<style lang="scss">
  $color-boletas-emp: #90CAF9;
  $color-boletas-rem: #f02525;
  $color-text-emp: #063690;
  $color-text-rem: #ffffff;

  .tableBoletas.v-data-table>.v-data-table__wrapper>table>tbody>tr>td {
    font-size: 0.8rem;
    height: 35px;
  }

  .tableBoletas.v-data-table>.v-data-table__wrapper>table>thead>tr>th {
    height: 25px;
    background: #063690;
  }

  [v-cloak] {
    display: none;
  }

  /* .tableBoletasEmp {
  tr:hover {
    background-color: $color-boletas-emp !important;
  }
}

.tableBoletasRem {
  tr:hover {
    background-color: $color-boletas-rem !important;
  }
  th {
    color: $color-text-rem !important;
  }
}
 */
  .styleBoletasRem {
    background-color: $color-boletas-rem !important;
    color: $color-text-rem !important;
  }

  .styleBoletasEmp {
    background-color: $color-boletas-emp !important;
    border-color: $color-boletas-emp !important;
  }

  .tableBoletas tbody tr:not(.tableBoletasRowHoverOff):hover td {
    background-color: #dcdcdc;
    transition: all 0.01s ease-in-out;
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

  .v-dialog>.v-card>.tituloConfirmRetiro.v-card__title {
    font-size: 1.8rem;
    padding: 16px 24px 10px;
    color: white;
    background: #063690;
    line-height: 1;
    text-align: center;
    letter-spacing: 0.08rem;
  }
</style>