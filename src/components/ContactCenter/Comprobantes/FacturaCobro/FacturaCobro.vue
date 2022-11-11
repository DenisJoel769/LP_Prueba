<template>
  <v-card class="rounded-xl">
    <v-row no-gutters justify="center">
      <v-card height="500" elevation="0" width="390" class="overflow-x-hidden">
        <v-row no-gutters justify="center" class="colorText1">
          {{ datosFactura.empresa }}
        </v-row>
        <v-row no-gutters justify="center" class="colorText2"
          >R.U.C: {{ datosFactura.empresaRuc }}</v-row
        >
        <v-row no-gutters justify="center" class="colorText2">{{
          datosFactura.empresaDireccion
        }}</v-row>
        <v-row no-gutters justify="center" class="colorText2"
          >Telef: {{ datosFactura.empresaTelefono }}</v-row
        >
        <v-row no-gutters justify="start" class="colorText2"
          >{{ datosFactura.localComercial }}
          {{ datosFactura.localComercialDireccion }}</v-row
        >
        <v-row no-gutters justify="start" class="colorText2"
          >Timbrado: {{ datosFactura.timbrado }}</v-row
        >
        <v-row no-gutters justify="start" class="colorText2"
          >Fecha Inicio Vigencia:
          {{ new Date(datosFactura.timbradoFechaInicio).toLocaleDateString("es-py") }}
        </v-row>
        <v-row no-gutters justify="start" class="colorText2"
          >Fecha Fin Vigencia:
          {{ new Date(datosFactura.timbradoFechaFin).toLocaleDateString("es-py") }}
        </v-row>
        <v-row no-gutters justify="center" class="colorText1">FACTURA CONTADO</v-row>
        <v-row no-gutters justify="start" class="colorText2">
          <v-row no-gutters> Nro: </v-row>
          <v-row no-gutters justify="end" class="colorText2">
            {{ datosFactura.nroFacturacompleta }}
          </v-row>
        </v-row>
        <v-row no-gutters justify="start" class="colorText2">
          <v-row no-gutters> Fecha: </v-row>
          <v-row no-gutters justify="end">
            {{ new Date(datosFactura.fechaFactura).toLocaleDateString("es-py") }}
          </v-row>
        </v-row>
        <v-row no-gutters justify="center" class="colorText1">{{
          datosFactura.transaccionTipo
        }}</v-row>
        <v-row no-gutters justify="center" class="colorText2">{{
          textoAsteriscos
        }}</v-row>
        <v-row no-gutters justify="start" class="colorText2"
          >CI/RUC: {{ datosFactura.nroDocumento }}</v-row
        >
        <v-row no-gutters justify="start" class="colorText2"
          >CLIENTE: {{ datosFactura.nombreoRazonSocial }}</v-row
        >
        <v-row no-gutters justify="center" class="colorText2">{{
          textoAsteriscos
        }}</v-row>
        <v-row no-gutters justify="start">
          <v-row no-gutters class="colorText1">Cant</v-row>
          <v-row no-gutters justify="center" class="colorText1">Descripcion</v-row>
          <v-row no-gutters justify="end" class="colorText1">Monto</v-row>
        </v-row>
        <v-row
          no-gutters
          justify="start"
          v-for="detalleCobro in datosFactura.facturaCobroDetalle"
          :key="detalleCobro.idFacturaDetalle"
          class="colorText2"
        >
          <v-row no-gutters>{{ detalleCobro.cantidad }}</v-row>
          <v-row no-gutters justify="center">{{ detalleCobro.descripcion }}</v-row>
          <v-row no-gutters justify="end">{{ detalleCobro.monto }}</v-row>
        </v-row>
        <v-row no-gutters justify="center" class="colorText2">{{ textoLineas }}</v-row>
        <v-row no-gutters justify="start" class="colorText1">USTED PAGO:</v-row>
        <v-row
          no-gutters
          justify="start"
          v-for="detalleCobro in datosFactura.facturaCobroComentario"
          :key="detalleCobro.facturaCobroComentario"
          class="colorText2"
        >
          <v-row no-gutters>{{ detalleCobro.comentario }}</v-row>
        </v-row>
        <v-row no-gutters justify="center" class="colorText2">{{ textoLineas }}</v-row>
        <v-row no-gutters justify="start">
          <v-row no-gutters class="colorText2"> Total a pagar en Gs: </v-row>
          <v-row no-gutters justify="end" class="colorText2">
            {{
              new Intl.NumberFormat("es-PY", {
                maximumFractionDigits: 0,
              }).format(datosFactura.totalFactura)
            }}
          </v-row>
        </v-row>
        <v-row no-gutters justify="center" class="colorText2">
          {{ datosFactura.totalFacturaLetras }}
        </v-row>
        <v-row no-gutters justify="center" class="colorText2">{{ textoLineas }}</v-row>
        <v-row no-gutters justify="start" class="colorText2">
          <v-row no-gutters class="colorText2"> Total Grav. 10 %: </v-row>
          <v-row no-gutters justify="end" class="colorText2">
            {{
              new Intl.NumberFormat("es-PY", {
                maximumFractionDigits: 0,
              }).format(datosFactura.totalGravada10)
            }}
          </v-row>
        </v-row>
        <v-row no-gutters justify="start" class="colorText2">
          <v-row no-gutters> Total Grav. 5 %: </v-row>
          <v-row no-gutters justify="end" class="colorText2">
            {{
              new Intl.NumberFormat("es-PY", {
                maximumFractionDigits: 0,
              }).format(datosFactura.totalGravada5)
            }}
          </v-row>
        </v-row>
        <v-row no-gutters justify="start" class="colorText2">
          <v-row no-gutters class="colorText2"> Total Exenta: </v-row>
          <v-row no-gutters justify="end" class="colorText2">
            {{
              new Intl.NumberFormat("es-PY", {
                maximumFractionDigits: 0,
              }).format(datosFactura.totalExenta)
            }}
          </v-row>
        </v-row>
        <v-row no-gutters justify="center" class="colorText2">{{ textoLineas }}</v-row>
        <v-row no-gutters justify="center" class="colorText1">Liquidacion del IVA</v-row>
        <v-row no-gutters justify="start" class="colorText2">
          <v-row no-gutters> 10%: </v-row>
          <v-row no-gutters justify="end">
            {{
              new Intl.NumberFormat("es-PY", {
                maximumFractionDigits: 0,
              }).format(datosFactura.iva10)
            }}
          </v-row>
        </v-row>
        <v-row no-gutters justify="start" class="colorText2">
          <v-row no-gutters> 5%: </v-row>
          <v-row no-gutters justify="end">
            {{
              new Intl.NumberFormat("es-PY", {
                maximumFractionDigits: 0,
              }).format(datosFactura.iva5)
            }}
          </v-row>
        </v-row>
        <v-row no-gutters justify="start" class="colorText2">
          <v-row no-gutters> Total Iva: </v-row>
          <v-row no-gutters justify="end">
            {{
              new Intl.NumberFormat("es-PY", {
                maximumFractionDigits: 0,
              }).format(datosFactura.totalIva)
            }}
          </v-row>
        </v-row>
        <v-row no-gutters justify="center" class="colorText2">{{ textoLineas }}</v-row>
        <v-row no-gutters justify="center" class="colorText1">Forma Pago:</v-row>
        <v-row no-gutters justify="start" class="colorText2">
          <v-row no-gutters> Efectivo: </v-row>
          <v-row no-gutters justify="end">
            {{
              new Intl.NumberFormat("es-PY", {
                maximumFractionDigits: 0,
              }).format(datosFactura.totalFactura)
            }}
          </v-row>
        </v-row>
        <v-row no-gutters justify="center" class="colorText2">{{ textoLineas }}</v-row>
        <v-row no-gutters justify="start" class="colorText2"
          >Vendedor: {{ datosFactura.usuarioNombreApellido }}</v-row
        >
        <v-row no-gutters justify="center" class="colorText2"
          >MUCHAS GRACIAS POR SU PREFERENCIA</v-row
        >
        <v-row no-gutters justify="center" class="colorText2"
          >DUDAS O CONSULTAS LLAMAR AL</v-row
        >
        <v-row no-gutters justify="center" class="colorText2">021-688-6600</v-row>
        <v-row no-gutters justify="start" class="colorText2">
          <v-row no-gutters> Original Cliente: </v-row>
          <v-row no-gutters justify="end"> ID: {{ datosFactura.idFactura }} </v-row>
        </v-row>
        <v-row no-gutters justify="start" class="colorText2"
          >Duplicado Archivo Tributario</v-row
        >
      </v-card>
    </v-row>
  </v-card>
</template>

<script src="./FacturaCobro.js"></script>

<style lang="scss">
$text-color: #063690;

.colorText1 {
  font-family: Montserrat-bold;
  font-size: 15px;
  color: $text-color;
}

.colorText2 {
  font-family: Montserrat;
  font-size: 13px;
  font-weight: bold;
  color: $text-color;
}
</style>
