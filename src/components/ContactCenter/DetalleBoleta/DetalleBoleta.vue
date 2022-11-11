<template>
  <div>
    <v-row no-gutters style="min-width: 1000px" align="center" class="mt-n3">
      <v-col lg="3" md="2">
        <div class="ml-10">
          <!-- <div style="color: #063690; font-size: 16px" class="font-weight-bold">
            BOLETA
          </div> -->
          <div
            style="
              color: #063690;
              font-size: 30px;
              font-family: Montserrat-bold;
            "
            class="my-n2"
          >
            {{ datosDetalleBoleta.nroBoleta }}
          </div>
        </div>
      </v-col>
      <v-col md="9" lg="9" class="ml-n8">
        <v-card width="720" class="ml-12 rounded-lg" flat tile>
          <v-card>
            <v-subheader
              style="font-size: 13px; color: white"
              dark
              class="headerCardDetalle"
            >
              <v-row>
                <div style="width: 130px" class="tituloCardDetalle">
                  Fecha de Empeño
                </div>

                <div style="width: 130px" class="tituloCardDetalle ml-2">
                  Pagado hasta
                </div>

                <div style="width: 130px" class="tituloCardDetalle ml-2">
                  Vencimiento
                </div>

                <div style="width: 130px" class="ml-2 tituloCardDetalle">
                  Fecha Límite
                  <v-menu open-on-hover bottom offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon v-bind="attrs" v-on="on" class="ml-5" size="12"
                        >fa-info</v-icon
                      >
                      
                    </template>

                    <v-list style="background: #363636">
                      <v-list-item>
                        <v-list-item-title
                          style="color: #ffffff; font-size: 14px"
                        >
                          90 días de espera</v-list-item-title
                        >
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>

                <div style="width: 130px" class="ml-2">Próximo Remate</div>
              </v-row>
            </v-subheader>

            <v-subheader
              style="font-size: 15px; color: #063690; max-height: 30px"
              dark
            >
              <v-row>
                <div style="width: 130px" class="contenidoCardDetalle">
                  {{
                    new Date(
                      datosDetalleBoleta.fechaOperacionEmpenho
                    ).toLocaleDateString("es-py")
                  }}
                </div>

                <div style="width: 130px" class="contenidoCardDetalle ml-2">
                  {{
                    new Date(datosDetalleBoleta.pagadoHasta).toLocaleDateString(
                      "es-py"
                    )
                  }}
                </div>

                <div style="width: 130px" class="contenidoCardDetalle ml-2">
                  {{
                    new Date(
                      datosDetalleBoleta.fechaVencimiento
                    ).toLocaleDateString("es-py")
                  }}
                </div>

                <div style="width: 130px" class="contenidoCardDetalle ml-2">
                  {{
                    new Date(datosDetalleBoleta.fechaLimite).toLocaleDateString(
                      "es-py"
                    )
                  }}
                  <v-icon
                    size="15"
                    left
                    color="#ffd014"
                    v-show="datosDetalleBoleta.retenido"
                    >fa-lock</v-icon
                  >
                </div>

                <div style="width: 130px" class="ml-2">
                  {{
                    new Date(
                      datosDetalleBoleta.fechaProximoRemate
                    ).toLocaleDateString("es-py")
                  }}
                </div>
              </v-row>
            </v-subheader>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
    <br />
    <v-row no-gutters style="min-width: 1000px" align="center">
      <v-col lg="3" md="3">
        <div class="ml-10">
          <div
            class="d-inline"
            style="
              color: #063690;
              font-size: 18px;
              font-family: Montserrat-bold;
            "
          >
            Origen
          </div>
          <div
            class="d-inline ml-10"
            style="
              color: #063690;
              font-size: 18px;
              font-family: Montserrat-bold;
            "
          >
            Estado
          </div>
        </div>

        <v-row class="ml-10">
          <div
            style="color: #063690; font-size: 16px; height: 50px; width: 90px"
            class="font-weight-bold"
          >
            {{ String(datosDetalleBoleta.localComercialOrigen).substr(0, 25) }}
          </div>
          <div
            style="color: #063690; font-size: 16px; height: 50px"
            class="font-weight-bold ml-5"
          >
            {{ datosDetalleBoleta.transaccionEstado }}
          </div>
        </v-row>
      </v-col>
      <v-col lg="9" md="10" class="ml-n8">
        <v-card width="800" class="ml-12 rounded-lg" flat tile>
          <v-card>
            <v-subheader
              style="font-size: 13px; color: white"
              dark
              class="headerCardDetalle"
            >
              <v-row>
                <div style="width: 120px" class="tituloCardDetalle">
                  Prestamo
                </div>

                <div style="width: 120px" class="tituloCardDetalle ml-2">
                  Amortización
                </div>

                <div style="width: 120px" class="tituloCardDetalle ml-2">
                  Saldo
                </div>

                <div style="width: 120px" class="tituloCardDetalle ml-2">
                  Interés Normal
                </div>

                <div style="width: 150px" class="tituloCardDetalle ml-2">
                  Descuento
                </div>

                <div style="width: 120px" class="ml-2">Interés con Desc.</div>
              </v-row>
            </v-subheader>

            <v-subheader
              style="font-size: 15px; color: #063690; height: 30px"
              dark
            >
              <v-row>
                <div style="width: 120px" class="contenidoCardDetalle">
                  {{
                    new Intl.NumberFormat("es-PY", {
                      maximumFractionDigits: 0,
                    }).format(datosDetalleBoleta.prestamo)
                  }}
                  Gs
                </div>

                <div style="width: 120px" class="contenidoCardDetalle ml-2">
                  {{
                    new Intl.NumberFormat("es-PY", {
                      maximumFractionDigits: 0,
                    }).format(datosDetalleBoleta.amortizacion)
                  }}
                  Gs
                </div>

                <div style="width: 120px" class="contenidoCardDetalle ml-2">
                  {{
                    new Intl.NumberFormat("es-PY", {
                      maximumFractionDigits: 0,
                    }).format(datosDetalleBoleta.saldo)
                  }}
                  Gs
                </div>

                <div style="width: 120px" class="contenidoCardDetalle ml-2">
                  {{
                    new Intl.NumberFormat("es-PY", {
                      maximumFractionDigits: 0,
                    }).format(datosDetalleBoleta.interesSinDescuento)
                  }}
                  Gs
                </div>

                <div style="width: 40px" class="contenidoCardDetalle ml-2">
                  {{
                    new Intl.NumberFormat("es-PY", {
                      maximumFractionDigits: 0,
                    }).format(datosDetalleBoleta.descuentoInteres)
                  }}
                  %
                </div>

                <div style="width: 102px" class="contenidoCardDetalle ml-2">
                  {{
                    new Intl.NumberFormat("es-PY", {
                      maximumFractionDigits: 0,
                    }).format(datosDetalleBoleta.montoDescuentoInteres)
                  }}
                  Gs
                </div>

                <div style="width: 120px" class="ml-2">
                  {{
                    new Intl.NumberFormat("es-PY", {
                      maximumFractionDigits: 0,
                    }).format(datosDetalleBoleta.interesMensual)
                  }}
                  Gs
                </div>
              </v-row>
            </v-subheader>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters class="ml-8 mt-5 mb-n4">
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado"></div>
      <div class="ml-2 cuadrado d-md-none d-lg-flex"></div>
      <div class="ml-2 cuadrado d-md-none d-lg-flex"></div>
    </v-row>

    <br />
    <!-- Tablas de datos -->
    <v-row no-gutters justify="center" style="min-width: 1150px">
      <v-card
        elevation="0"
        width="93%"
        height="40"
        color="#063690"
        style="border-radius: 0px"
      >
        <v-row class="mt-1">
          <div
            class="font-weight-bold ml-6"
            style="
              color: #ffffff;
              font-size: 20px;
              cursor: pointer;
              width: 270px;
            "
            @click="historialPagos = !historialPagos"
          >
            HISTORIAL DE PAGO
          </div>
          <v-icon
            @click="historialPagos = !historialPagos"
            size="30"
            color="#ffffff"
            class="ml-n8 mr-8"
            >fa-caret-down</v-icon
          >
          <v-card
            class="mt-n1"
            elevation="0"
            width="70%"
            height="40"
            color="#063690"
          >
            <v-subheader
              style="
                font-size: 13px;
                color: white;
                background: #063690;
                max-height: 20px;
              "
              dark
            >
              <v-row>
                <div
                  style="
                    width: 175px;
                    height: 15px;
                    border-right: 1px solid #ffffff;
                  "
                  class="ml-4"
                >
                  Tiempo de Empeño
                </div>
                <div
                  style="
                    width: 165px;
                    height: 15px;
                    border-right: 1px solid #ffffff;
                  "
                  class="ml-4"
                >
                  Meses pagados
                </div>
                <div
                  style="
                    width: 175px;
                    height: 15px;
                    border-right: 1px solid #ffffff;
                  "
                  class="ml-4"
                >
                  Tiempo de Atraso
                </div>
                <div style="width: 175px; height: 15px" class="ml-4">
                  Pasó a Remate
                </div>
              </v-row>
            </v-subheader>

            <v-subheader
              style="
                font-size: 15px;
                color: #063690;
                background: white;
                height: 19px;
                border-radius: 0px;
                width: 775px;
              "
              dark
            >
              <v-row>
                <div
                  style="
                    width: 175px;
                    height: 15px;
                    border-right: 1px solid #7494eb;
                    font-size: 13px;
                  "
                  class="ml-4"
                >
                  {{ datosDetalleBoleta.tiempoEmpenho }}
                </div>
                <div
                  style="
                    width: 165px;
                    height: 15px;
                    border-right: 1px solid #7494eb;
                    font-size: 13px;
                  "
                  class="ml-4"
                >
                  {{ datosDetalleBoleta.mesesPagados }}
                </div>
                <div
                  style="
                    width: 175px;
                    height: 15px;
                    border-right: 1px solid #7494eb;
                    font-size: 13px;
                  "
                  class="ml-4"
                >
                  {{ datosDetalleBoleta.atraso }}
                </div>
                <div
                  style="width: 175px; height: 15px; font-size: 13px"
                  class="ml-4"
                >
                  {{ datosDetalleBoleta.pasoARemate }}
                </div>
              </v-row>
            </v-subheader>
          </v-card>
        </v-row>
      </v-card>
    </v-row>

    <v-row
      v-show="historialPagos"
      no-gutters
      justify="center"
      style="min-width: 1100px"
    >
      <v-card
        elevation="0"
        width="93%"
        height="25"
        class="overflow-y-auto overflow-x-hidden ml-n1"
      >
        <v-row justify="center" align="center" class="mt-1">
          <div style="width: 30px"></div>
          <div style="width: 150px" class="historialPagoHeader">Fecha</div>
          <div style="width: 250px" class="historialPagoHeader">Caja</div>
          <div style="width: 150px" class="historialPagoHeader">
            Meses Pagados
          </div>
          <div style="width: 150px" class="historialPagoHeader">
            Amortización
          </div>
          <div style="width: 150px" class="historialPagoHeader">Saldo</div>
          <div style="width: 150px" class="historialPagoHeader">
            Total Pagado
          </div>
        </v-row>
        <div class="d-flex justify-center">
          <v-divider class="divisoria"></v-divider>
        </div>
      </v-card>

      <v-card
        elevation="0"
        width="93%"
        height="81"
        class="overflow-y-auto overflow-x-hidden"
      >
        <div
          v-for="pago in datosDetalleBoleta.historialPago"
          :key="pago.idCobros"
        >
          <v-row justify="center" align="center" style="height: 30px">
            <div style="width: 30px">
              <v-icon
                @click="mostrarComprobanteCobro(pago.idFactura)"
                size="15"
                color="#063690"
                >fa-plus</v-icon
              >
            </div>
            <div style="width: 150px" class="historialPagoDetalle">
              {{
                new Date(pago.fecha).toLocaleDateString("es-py") +
                " " +
                new Date(pago.fecha).toLocaleTimeString("es-py")
              }}
            </div>
            <div style="width: 250px" class="historialPagoDetalle">
              {{ pago.caja }}
            </div>
            <div style="width: 150px" class="historialPagoDetalle">
              {{ pago.mesesPagados }}
            </div>
            <div style="width: 150px" class="historialPagoDetalle">
              {{
                new Intl.NumberFormat("es-PY", {
                  maximumFractionDigits: 0,
                }).format(pago.amortizacion)
              }}
              Gs
            </div>
            <div style="width: 150px" class="historialPagoDetalle">
              {{
                new Intl.NumberFormat("es-PY", {
                  maximumFractionDigits: 0,
                }).format(pago.saldo)
              }}
              Gs
            </div>
            <div style="width: 150px" class="historialPagoDetalle">
              {{
                new Intl.NumberFormat("es-PY", {
                  maximumFractionDigits: 0,
                }).format(pago.totalPagado)
              }}
              Gs
            </div>
          </v-row>
          <div class="d-flex justify-center">
            <v-divider class="divisoria"></v-divider>
          </div>
        </div>
      </v-card>
    </v-row>
    <br />

    <v-row no-gutters justify="center" class="mt-n3">
      <v-card
        elevation="0"
        width="93%"
        height="35"
        color="#7494eb"
        style="border-radius: 0px"
      >
        <v-row class="mt-1">
          <div
            class="font-weight-bold ml-6"
            style="
              color: #ffffff;
              font-size: 20px;
              cursor: pointer;
              width: 270px;
            "
            @click="detalleArticulos = !detalleArticulos"
          >
            ARTÍCULO
          </div>
          <v-icon
            @click="detalleArticulos = !detalleArticulos"
            size="30"
            color="#ffffff"
            class="ml-n8"
            >fa-caret-down</v-icon
          >
        </v-row>
      </v-card>
    </v-row>

    <v-row
      v-show="detalleArticulos"
      no-gutters
      justify="center"
      style="min-width: 1100px"
    >
      <!-- Cabecera -->
      <v-card
        elevation="0"
        width="93%"
        height="25"
        class="overflow-y-auto overflow-x-hidden"
      >
        <v-row justify="center" align="center" class="mt-1">
          <div style="width: 75px" class="tabArticuloHeader">Foto</div>
          <div style="width: 75px" class="tabArticuloHeader">Codigo</div>
          <div style="width: 550px" class="tabArticuloHeader mr-4">
            Descripción
          </div>
          <div style="width: 120px" class="tabArticuloHeader">Préstamo</div>
          <div style="width: 200px" class="tabArticuloHeader">
            Ubicación actual:
          </div>
        </v-row>
        <div class="d-flex justify-center">
          <v-divider class="divisoria"></v-divider>
        </div>
      </v-card>
      <!-- Detalle -->
      <v-card
        elevation="0"
        width="93%"
        height="105"
        class="overflow-y-auto overflow-x-hidden"
      >
        <div
          v-for="articulo in datosDetalleBoleta.detalleArticulo"
          :key="articulo.IdArticulo"
        >
          <v-row justify="center" align="center">
            <!--       <div style="width: 150px" class="tabArticuloDetalle">
              <v-row no-gutters>
                <v-icon size="20" @click="verImagenArticulo(articulo.idArticulo)"
                  >fa-image</v-icon
                >
                <div class="mx-2">
                  <div class="tabArticuloDetalle mb-n1">
                    {{ articulo.articuloCategoria.substr(0, 15) }}
                  </div>
                  <div class="tabArticuloDetalle" style="font-family: Montserrat-bold">
                    {{ articulo.articuloCodigo }}
                  </div>
                </div>
              </v-row>
            </div> -->

            <div style="width: 75px" class="tabArticuloDetalle">
              <v-icon size="20" @click="verImagenArticulo(articulo.idArticulo)"
                >fa-image</v-icon
              >
            </div>

            <div style="width: 75px" class="tabArticuloDetalle">
              {{ articulo.articuloCodigo }}
            </div>

            <div style="width: 550px" class="tabArticuloDetalle mr-4">
              {{ articulo.descripcion }}
            </div>
            <div style="width: 120px" class="tabArticuloDetalle">
              {{
                new Intl.NumberFormat("es-PY", {
                  maximumFractionDigits: 0,
                }).format(articulo.prestamo)
              }}
              Gs
            </div>
            <div style="width: 200px" class="tabArticuloDetalle">
              {{ articulo.ubicacionActual }}
            </div>
          </v-row>
          <div class="d-flex justify-center mt-1">
            <v-divider class="divisoria"></v-divider>
          </div>
        </div>
      </v-card>
    </v-row>

    <!-- Muestra el comprobante de cobro, paso por props el id de la factura -->
    <v-dialog width="430" v-model="facturaCobro">
      <factura-cobro
        v-click-outside="cerrarDialogFacturaCobro"
        :idFactura="idFactura"
        v-if="facturaCobro"
      ></factura-cobro>
    </v-dialog>

    <!-- Muestra las fotos del articulo -->
    <v-dialog width="600" v-model="fotoArticulo">
      <v-carousel
        v-if="fotoArticulo && urlFotosArticulo.length > 0"
        :show-arrows="false"
        class="rounded-xl"
      >
        <v-carousel-item
          v-for="(item, i) in urlFotosArticulo"
          :key="i"
          :src="item.urlMin"
        ></v-carousel-item>
      </v-carousel>
      <!-- Si no hay fotos  -->
      <v-img v-else src="@/assets/articulo_sin_foto.jpg"></v-img>
    </v-dialog>
  </div>
</template>

<script src="./DetalleBoleta.js"></script>

<style lang="scss">
$color-cuadrado: #7494eb;

.headerCardDetalle {
  background: #063690;
  max-height: 25px;
  color: white;
}

.separador {
  margin-left: 20px;
  max-height: 35px;
  margin-top: 10px;
  width: 1px; /* Line width */
  background-color: white; /* Line color */
  height: 100%; /* Override in-line if you want specific height. */
  float: left; /* Causes the line to float to left of content.
        You can instead use position:absolute or display:inline-block
        if this fits better with your design */
}

.tituloCardDetalle {
  border-right: 1px solid #ffffff;
}

.contenidoCardDetalle {
  border-right: 1px solid #7494eb;
}

.cuadrado {
  width: 9px;
  height: 10px;
  background: $color-cuadrado;
}

.historialPagoHeader {
  font-family: Montserrat-bold;
  font-size: 13px;
  color: #063690;
}

.historialPagoDetalle {
  font-family: Montserrat;
  font-size: 11px;
  font-weight: bold;
  color: #063690;
}

.tabArticuloHeader {
  font-family: Montserrat-bold;
  font-size: 13px;
  color: #063690;
}

.tabArticuloDetalle {
  font-family: Montserrat;
  font-size: 11px;
  font-weight: bold;
  color: #063690;
}

.divisoria {
  border-color: #063690 !important;
  opacity: 50%;
  max-width: 98%;
}
</style>
