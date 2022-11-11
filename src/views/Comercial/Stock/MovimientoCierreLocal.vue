<template>
  <div>
    <v-form ref="form" v-model="valid" :lazy-validation="lazy">
      <v-row>
        <v-col offset-md="3" cols="12" md="3"
          ><v-select
            v-model="localComercialOrigen"
            :items="localComercial"
            item-text="localComercial"
            item-value="idLocalComercial"
            label="Seleccione"
            hint="Elige la sucursal origen"
            persistent-hint
            append-outer-icon="mdi-arrow-up"
            :rules="[(v) => !!v || 'Elige la sucursal origen']"
            return-object
          ></v-select
        ></v-col>
        <v-col cols="12" md="3"
          ><v-select
            v-model="localComercialDestino"
            :items="localComercial"
            item-text="localComercial"
            item-value="idLocalComercial"
            label="Seleccione"
            hint="Elige la sucursal destino"
            persistent-hint
            append-outer-icon="mdi-arrow-down"
            :rules="[(v) => !!v || 'Elige la sucursal destino']"
            return-object
          ></v-select
        ></v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="8" offset-md="2">
          <v-alert
            border="top"
            colored-border
            type="info"
            elevation="2"
            color="#2196f3"
            class="caption font-italic"
          >
            {{ info }}
          </v-alert>
        </v-col>
        <v-col offset-md="8">
          <v-btn color="primary" @click="confirmarMovimiento">Guardar</v-btn>
        </v-col>
      </v-row>
    </v-form>

    <v-dialog scrollable v-model="dialog" max-width="750">
      <v-card>
        <v-card-title absolute class="headline grey lighten-2"
          >Confirmar Movimiento</v-card-title
        >
        <v-container>
          <v-row>
            <v-col cols="auto">
              <DxDataGrid
                :show-borders="true"
                :data-source="dsMovimientoEmpenho"
                :show-column-lines="true"
                :row-alternation-enabled="true"
              >
                <DxColumn width="300" data-field="detalle" caption="Detalle">
                </DxColumn>
                <DxColumn
                  width="200"
                  data-field="saldo"
                  caption="Saldo"
                  format="‎₲ ###,###,###"
                >
                </DxColumn>
                <DxColumn
                  width="100"
                  data-field="localComercialOrigen"
                  caption="Actual"
                >
                </DxColumn>
                <DxColumn
                  width="100"
                  data-field="localComercialDestino"
                  caption="Destino"
                >
                </DxColumn>
              </DxDataGrid>
            </v-col>
          </v-row>
          <br />
          <div>Genera el siguiente asiento:</div>
          <v-row>
            <v-col cols="auto">
              <DxDataGrid
                :show-borders="true"
                :data-source="dsAsientoContable"
                :show-column-lines="true"
                :row-alternation-enabled="true"
              >
                <DxColumn
                  width="130"
                  data-field="idCuentaContable"
                  caption="Id Cuenta Contable"
                >
                </DxColumn>
                <DxColumn
                  width="240"
                  data-field="conceptoCuentaContable"
                  caption="Concepto C.Contable"
                >
                </DxColumn>
                <DxColumn
                  width="125"
                  data-field="debe"
                  caption="Debe"
                  format="‎₲ ###,###,###"
                >
                </DxColumn>
                <DxColumn
                  width="125"
                  data-field="haber"
                  caption="Haber"
                  format="‎₲ ###,###,###"
                >
                </DxColumn>
                <DxColumn width="100" data-field="objeto" caption="Objeto">
                </DxColumn>
              </DxDataGrid>
            </v-col>
          </v-row>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="guardarMovimiento">
            Aceptar
          </v-btn>

          <v-btn color="blue darken-1" text @click="dialog = false">
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :color="`${colorSnackBar}`" :timeout="5000">
      {{ textSnackBar }}
    </v-snackbar>
  </div>
</template>

<script src="./MovimientoCierreLocal.js"></script>
