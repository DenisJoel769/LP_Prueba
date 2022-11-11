<template>
  <div>
    <v-row justify="center">
      <v-dialog
        v-model="showAviso"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="closeDialog">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Aviso</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn v-if="!aviso.leido" dark text @click="guardarAvisoLeido"
                >Guardar</v-btn
              >
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text>
            <iframe
              :src="`${aviso.urlAviso}`"
              width="100%"
              height="550px"
            ></iframe>
            <v-checkbox
              v-if="!aviso.leido"
              class="mt-n2"
              v-model="leido"
              label="Marcar aviso como leido"
            ></v-checkbox>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row></div
></template>

<script src="./Aviso.js"></script>
