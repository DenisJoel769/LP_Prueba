<template>
  <div>
    <v-form ref="formAviso" v-model="validFormAviso" :lazy-validation="true">
      <v-row class="mb-n10">
        <v-col offset-md="1" md="6">
          <v-text-field
            label="Titulo"
            placeholder=""
            v-model="titulo"
            required
            :rules="[(v) => !!v || 'Título es requerido']"
            autocomplete="off"
          ></v-text-field>
        </v-col>
        <v-col offset-md="1">
          <v-radio-group v-model="radios" :mandatory="false">
            <v-radio label="Generar Aviso" value="1"></v-radio>
            <v-radio label="Agregar URL" value="0"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col offset-md="1" md="6">
          <v-textarea
            rows="2"
            label="Contenido"
            :rules="[(v) => !!v || 'Contenido es requerido']"
            v-model="contenido"
            autocomplete="off"
            required
          ></v-textarea
        ></v-col>
        <v-col offset-md="1">
          <br />
          <v-btn
            color="primary"
            @click="guardar"
            :disabled="radios != null ? false : true"
            >Guardar Aviso</v-btn
          >
        </v-col></v-row
      >
      <v-row>
        <!-- Fecha de Inicio del Aviso -->
        <v-col offset-md="1" md="5">
          <v-dialog
            ref="dialogFechaInicio"
            v-model="modalFechaInicio"
            :return-value.sync="dateFechaInicio"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateFechaInicio"
                label="Fecha de Inicio"
                prepend-icon="fa-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="dateFechaInicio" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modalFechaInicio = false"
                >Cancelar</v-btn
              >
              <v-btn
                text
                color="primary"
                @click="$refs.dialogFechaInicio.save(dateFechaInicio)"
                >OK</v-btn
              >
            </v-date-picker>
          </v-dialog>
        </v-col>

        <!-- Fecha Fin del Aviso -->
        <v-col md="5">
          <v-dialog
            ref="dialogFechaFin"
            v-model="modalFechaFin"
            :return-value.sync="dateFechaFin"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateFechaFin"
                label="Fecha de Finalización"
                prepend-icon="fa-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="dateFechaFin" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modalFechaFin = false"
                >Cancelar</v-btn
              >
              <v-btn
                text
                color="primary"
                @click="$refs.dialogFechaFin.save(dateFechaFin)"
                >OK</v-btn
              >
            </v-date-picker>
          </v-dialog>
        </v-col>
      </v-row>
      <DxHtmlEditor
        v-show="radios == 1"
        v-model="valueContent"
        :value-type="editorValueType"
        :height="300"
      >
        <DxToolbar :multiline="isMultiline">
          <DxItem format-name="undo" />
          <DxItem format-name="redo" />
          <DxItem format-name="separator" />
          <DxItem :format-values="sizeValues" format-name="size" />
          <!--         <DxItem :format-values="fontValues" format-name="font" />
 -->
          <DxItem format-name="separator" />
          <DxItem format-name="bold" />
          <DxItem format-name="italic" />
          <DxItem format-name="underline" />
          <DxItem format-name="separator" />
          <DxItem format-name="alignLeft" />
          <DxItem format-name="alignCenter" />
          <DxItem format-name="alignRight" />
          <DxItem format-name="alignJustify" />
          <DxItem format-name="separator" />
          <DxItem format-name="orderedList" />
          <DxItem format-name="bulletList" />
          <DxItem format-name="separator" />
          <DxItem :format-values="headerValues" format-name="header" />
          <DxItem format-name="separator" />
          <DxItem format-name="color" />
          <DxItem format-name="background" />
        </DxToolbar>
      </DxHtmlEditor>
      <v-row v-if="radios == 0">
        <v-col md="6" offset-md="1">
          <v-text-field
            autocomplete="off"
            v-model="UrlAviso"
            label="URL del Aviso"
            placeholder=""
            required
            :rules="[(v) => !!v || 'Título es requerido']"
          ></v-text-field
        ></v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script src="./EditorAviso.js"></script>
<style></style>
