<template>
  <div>
    <component v-bind:is="componenteActual"></component>
    <!-- <estado-cuenta v-show="componenteActual == 'estado-cuenta'"></estado-cuenta>
    <simulador-pago v-show="componenteActual == 'simulador-pago'"></simulador-pago>
    <retencion v-show="componenteActual == 'retencion'"></retencion>
 -->
    <v-dialog v-model="verDialogLlamEntrante" persistent width="500">
      <validacion-datos
        @confirm="confirmValidacionDatos"
        @cancelar="cancelarLlam"
        v-show="validacionDatos"
      ></validacion-datos>

      <validacion-numero
        @cancelar="cancelarLlam"
        @return="mostrarValidacionDatos"
        @confirm="cerrarDialogValidNumero"
        v-show="validacionNumero"
      ></validacion-numero>
    </v-dialog>

    <v-dialog v-model="cancelar" width="400" persistent>
      <v-card>
        <v-card-title class="justify-center tituloCardFinalizar mb-3 font-weight-bold"
          ><div style="width: 42vh">¿Deseas cancelar la llamada?</div></v-card-title
        >
        <v-card-text class="mb-n12">
          <div class="font-weight-bold" style="color: #063690">
            Agregar comentarios (opcional)
          </div>
          <v-textarea
            v-model="comentario"
            class="textComentario rounded-lg"
            no-resize
            rows="5"
            outlined
            placeholder="Agregar comentarios"
          ></v-textarea>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn
            fab
            dark
            elevation="2"
            small
            color="#1b7700"
            @click="aceptarCancelarLlamada"
          >
            <v-icon dark>fa-check</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            elevation="2"
            small
            color="#dc0000"
            class="ml-12"
            @click="cancelar = false"
          >
            <v-icon dark>fa-times</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script src="./LlamadaEntrante.js"></script>

<style></style>
