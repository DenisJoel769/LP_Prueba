<template>
  <div>
    <v-card class="rounded-xl">
      <div v-show="validarNumero">
        <v-card-text>
          <speech
            titulo="Verificar número"
            width="400"
            :texto="`Señor ${$store.state.LlamadaEntrante.nombre}, me confirma por favor si el ${$store.state.LlamadaEntrante.datosCliente.numeroTelefono} sigue siendo su número?`"
          ></speech>

          <v-row class="justify-center">
            <v-btn
              width="150"
              class="ma-2 text-none font-weight-bold rounded-lg"
              outlined
              color="#063690"
              @click="confirmar"
              >Sí, sigue siendo</v-btn
            >
            <v-btn
              width="150"
              class="ma-2 text-none font-weight-bold rounded-lg"
              outlined
              color="#063690"
              @click="
                (actualizarNumero = false),
                  (validarNumero = false),
                  (actualizarNumeroLlamada = true)
              "
              >No, actualizar</v-btn
            >
          </v-row>
        </v-card-text>
        <v-card-actions>
          <div>
            <v-btn outlined x-small fab color="#063690" @click="volverValidacionDatos">
              <v-icon>fa-arrow-left</v-icon>
            </v-btn>
            <div class="d-inline" style="font-size: 14px; color: #7494eb">Atrás</div>
          </div>

          <v-row class="justify-center"></v-row>

          <div class="justify-end">
            <v-btn
              @click="$emit('cancelar')"
              fab
              dark
              x-small
              elevation="2"
              color="#dc0000"
            >
              <v-icon>fa-phone-slash</v-icon>
            </v-btn>
          </div>
        </v-card-actions>
      </div>

      <!-- Pantalla que pregunta si su numero es el que esta llamando  -->
      <div v-show="actualizarNumeroLlamada">
        <v-card-text>
          <speech
            titulo="Verificar número"
            width="400"
            :texto="`Señor ${$store.state.LlamadaEntrante.nombre} , el número del cual nos está llamando es su número actual?`"
          ></speech>

          <v-row class="justify-center">
            <v-btn
              width="150"
              class="ma-2 text-none font-weight-bold rounded-lg"
              outlined
              color="#063690"
              @click="modificarNumeroLlamada"
              >Sí, es el número</v-btn
            >
            <v-btn
              width="150"
              class="ma-2 text-none font-weight-bold rounded-lg"
              outlined
              color="#063690"
              @click="
                (actualizarNumero = true),
                  (validarNumero = false),
                  (actualizarNumeroLlamada = false)
              "
              >No, actualizar</v-btn
            >
          </v-row>
        </v-card-text>
        <v-card-actions>
          <div>
            <v-btn
              outlined
              x-small
              fab
              color="#063690"
              @click="
                (actualizarNumero = false),
                  (validarNumero = true),
                  (actualizarNumeroLlamada = false)
              "
            >
              <v-icon>fa-arrow-left</v-icon>
            </v-btn>
            <div class="d-inline" style="font-size: 14px; color: #7494eb">Atrás</div>
          </div>

          <v-row class="justify-center"></v-row>

          <div class="justify-end">
            <v-btn
              @click="$emit('cancelar')"
              fab
              dark
              x-small
              elevation="2"
              color="#dc0000"
            >
              <v-icon>fa-phone-slash</v-icon>
            </v-btn>
          </div>
        </v-card-actions>
      </div>

      <!-- Pantalla para actualizar el numero de telefono del cliente  -->
      <div v-show="actualizarNumero">
        <v-row no-gutters>
          <v-form
            @submit.prevent
            ref="formNumeroActualizado"
            v-model="validForm"
            lazy-validation
          >
            <v-card-text>
              <speech
                titulo="Verificar número"
                width="400"
                texto="¿Me podría facilitar su número de contacto para comunicarnos con usted?"
              ></speech>

              <v-row class="justify-center mt-6 mb-1">
                <v-text-field
                  class="shrink numeroActualizado"
                  :rules="numeroTelefonoRules"
                  v-model="telefonoActualizado"
                  label="Agregar número principal"
                  autocomplete="off"
                  dense
                />
              </v-row>
            </v-card-text>
            <v-card-actions>
              <div>
                <v-btn
                  outlined
                  x-small
                  fab
                  color="#063690"
                  @click="
                    (actualizarNumero = false),
                      (validarNumero = false),
                      (actualizarNumeroLlamada = true)
                  "
                >
                  <v-icon>fa-arrow-left</v-icon>
                </v-btn>
                <div class="d-inline" style="font-size: 14px; color: #7494eb">Atrás</div>
              </div>

              <v-row class="justify-center">
                <v-btn
                  @click="confirmarNumeroActualizado"
                  class="mt-n2"
                  fab
                  dark
                  small
                  elevation="2"
                  color="#1b7700"
                >
                  <v-icon dark>fa-check</v-icon>
                </v-btn>
              </v-row>

              <div class="justify-end">
                <v-btn
                  @click="$emit('cancelar')"
                  fab
                  dark
                  x-small
                  elevation="2"
                  color="#dc0000"
                >
                  <v-icon>fa-phone-slash</v-icon>
                </v-btn>
              </div>
            </v-card-actions>
          </v-form>
        </v-row>
      </div>
    </v-card>
  </div>
</template>

<script>
import Speech from "@/components/ContactCenter/Speech.vue";
import router from "@/router";

export default {
  components: {
    speech: Speech,
  },

  data: () => ({
    actualizarNumero: false,
    actualizarNumeroLlamada: false,
    validarNumero: true,
    telefonoActualizado: null,
    numeroTelefonoRules: [
      (v) => !!v || "Numero es requerido",
      (v) => /^\(?09[6-9]\)?[0-9]{7}$/.test(v) || "Formato no valido",
    ],
    validForm: true,
  }),

  methods: {
    volverValidacionDatos() {
      this.$emit("return");
    },

    confirmar() {
      this.$emit("confirm");
    },

    async confirmarNumeroActualizado() {
      if (this.$refs.formNumeroActualizado.validate() == false) return;
      let token = localStorage.getItem("user-token");
      let url =
        "/api/cliente/ActualizarNumero/" +
        this.$store.state.LlamadaEntrante.datosCliente.idCliente +
        "/" +
        this.$store.state.LoginStore.IdUsuario;

      var datos = {
        nroContacto: this.telefonoActualizado,
      };

      await axios({
        method: "put",
        url: url,
        data: datos,
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          this.$emit("confirm");
        })
        .catch((err) => {
          console.warn(err.response.data.error);
          commit(
            "snackbar/mostrarMensaje",
            {
              mensaje: err.response.data.error,
              color: "error",
              posicion: "bottom",
            },
            { root: true }
          );
        });
    },

    async modificarNumeroLlamada() {
      let token = localStorage.getItem("user-token");

      let url =
        "/api/cliente/ActualizarNumero/" +
        this.$store.state.LlamadaEntrante.datosCliente.idCliente +
        "/" +
        this.$store.state.LoginStore.IdUsuario;

      var datos = {
        nroContacto: this.$store.state.LlamadaEntrante.numeroTelefonoLlamada
          .replace("+595", "0")
          .replace("595", "0"),
      };

      await axios({
        method: "put",
        url: url,
        data: datos,
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          this.$emit("confirm");
        })
        .catch((err) => {
          console.warn(err.response.data.error);
          commit(
            "snackbar/mostrarMensaje",
            {
              mensaje: err.response.data.error,
              color: "error",
              posicion: "bottom",
            },
            { root: true }
          );
        });
    },
  },
};
</script>

<style>
.numeroActualizado.theme--light.v-input input {
  color: #063690;
  font-size: 18px;
  font-weight: bold;
  line-height: 1.21;
  text-align: center;
}
</style>
