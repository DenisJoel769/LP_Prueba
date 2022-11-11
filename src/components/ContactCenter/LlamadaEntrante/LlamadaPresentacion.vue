<template>
  <div>
    <v-card class="rounded-xl">
      <v-form ref="refForm" v-model="validacion" lazy-validation>
        <v-card-text>
          <br />
          <div
            class="d-block tituloLlamadaPresentacion font-weight-bold text-center"
          >
            Ingresar número de teléfono
          </div>
          <div class="d-block subTituloLlamadaPresentacion text-center">
            (como aparece en el Génesis)
          </div>
          <v-row class="d-flex justify-center">
            <v-col cols="12" md="8" sm="8">
              <v-text-field
                :rules="[(v) => !!v || 'Requerido']"
                autocomplete="off"
                v-model="$store.state.LlamadaEntrante.numeroTelefonoLlamada"
                height="12px"
                autofocus
                class="d-block rounded-xl numero"
                outlined
              ></v-text-field></v-col
          ></v-row>

          <v-row class="d-flex justify-center mt-n9"
            ><speech
              titulo="Saludo"
              width="450px"
              :texto="textoPresentacion"
            ></speech
          ></v-row>

          <v-row class="d-flex justify-center mt-n2">
            <v-col cols="12" md="5" sm="5"
              ><div>
                <div
                  class="font-weight-bold"
                  style="font-size: 18px; color: #063690"
                >
                  Nombre
                </div>
                <v-text-field
                  :rules="[
                    validarUsuario.min(
                      3,
                      $store.state.LlamadaEntrante.nombre.length
                    ),
                  ]"
                  autocomplete="off"
                  outlined
                  class="rounded-lg"
                  placeholder="Primer Nombre"
                  v-model="$store.state.LlamadaEntrante.nombre"
                ></v-text-field></div
            ></v-col>
            <v-col cols="12" md="6" sm="6"
              ><speech
                titulo="Motivo"
                width="230px"
                :texto="`Señor ${$store.state.LlamadaEntrante.nombre},  ¿En qué le puedo ayudar?`"
              ></speech></v-col
          ></v-row>

          <v-row class="mt-n6 justify-center">
            <div
              style="
                font-size: 18px;
                font-weight: 600;
                line-height: 1.23;
                text-align: left;
                color: #063690;
              "
            >
              Motivo de la llamada
            </div>
          </v-row>
          <!--           <div class="dx-field">
            <DxSelectBox
              class="comboMotivo"
              drop-down-button-template="imageIcon"
              style="width: 400px"
              :data-source="llamadaMotivo"
              display-expr="llamadaMotivo"
              v-model="$store.state.LlamadaEntrante.componenteActual"
            >
              <template #imageIcon="{}">
                <v-icon color="white" size="35" class="d-flex justify-center"
                  >mdi-chevron-down</v-icon
                >
              </template>
            </DxSelectBox>
          </div> -->
          <v-row no-gutters style="height: 40px">
            <v-select
              class="comboMotivo"
              v-model="$store.state.LlamadaEntrante.componenteActual"
              :items="llamadaMotivo"
              item-text="llamadaMotivo"
              item-value="idLlamadaMotivo"
              label="Seleccionar"
              :menu-props="{ overflowY: true, maxHeight: 180 }"
              return-object
            >
            </v-select>
          </v-row>
        </v-card-text>
        <br />
        <br />
        <br />
        <v-card-actions>
          <v-row class="justify-center d-flex">
            <v-btn
              fab
              dark
              elevation="2"
              color="#1b7700"
              :disabled="!validacion"
              @click="confirmar"
            >
              <v-icon dark>fa-check</v-icon>
            </v-btn>
          </v-row>

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
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import Speech from "@/components/ContactCenter/Speech.vue";
import DxSelectBox from "devextreme-vue/select-box";
import { mapMutations } from "vuex";

export default {
  name: "LlamadaEntrante",
  components: {
    speech: Speech,
    DxSelectBox,
  },
  data: () => ({
    llamadaMotivo: [],
    dialogPresentacion: true,
    nombre: "",
    numeroTelefonoLlamada: "",
    validacion: true,
    validarUsuario: {
      min(min, v) {
        return (v || "") >= min || `Cantidad minima ${min}`;
      },
    },
  }),

  methods: {
    ...mapMutations("LlamadaEntrante", ["updateDatosLlamada"]),

    confirmar() {
      if (this.$refs.refForm.validate() == false) return;

      //Se registran los datos de la llamada
      var datos = {
        nombre: this.$store.state.LlamadaEntrante.nombre,
        numeroTelefonoLlamada: this.$store.state.LlamadaEntrante
          .numeroTelefonoLlamada,
      };
      this.updateDatosLlamada(datos);

      //Llamada al metodo confirmLlamadaPresentacion de LlamadaEntrante.vue
      let motivo = this.$store.state.LlamadaEntrante.componenteActual;
      if (motivo) this.$emit("confirm", motivo.requiereValidacion);
    },

    async obtenerMotivos() {
      let token = localStorage.getItem("user-token");

      await axios
        .get("/api/MotivoLlamada", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(
          (response) =>
            (this.llamadaMotivo = response.data.sort(
              (a, b) => a.orden - b.orden
            ))
        )
        .catch((err) => {
          console.warn(err.response.data.error);
        });
    },
  },
  //(v) => !!v || 'Requerido'
  mounted() {
    this.obtenerMotivos();
  },

  computed: {
    textoPresentacion() {
      let saludo =
        new Date().getHours() <= 12
          ? "La Plata Buen día"
          : "La Plata Buenas tardes";
      return `${saludo}, le saluda ${this.$store.state.LoginStore.Nombres} ${this.$store.state.LoginStore.Apellidos} ¿Con quien tengo el gusto?`;
    },
  },
};
</script>

<style lang="scss">
$text-color-titulo: #063690;
$text-color-sub-titulo: #7494eb;

.tituloLlamadaPresentacion {
  font-size: 18px;
  line-height: 1.23;
  color: $text-color-titulo;
}

.subTituloLlamadaPresentacion {
  font-family: Montserrat;
  font-size: 16px;
  line-height: 1.22;
  letter-spacing: normal;
  color: $text-color-sub-titulo;
}

.numero.theme--light.v-input input {
  color: #063690;
  font-size: 25px;
  font-weight: bold;
  line-height: 1.21;
  text-align: center;
}

/* .comboMotivo.theme--light.v-list list {
  background: #063690;
} */

.comboMotivo .dx-dropdowneditor-button.dx-button-mode-contained {
  background: #063690;
  width: 50px;
}

.comboMotivo .dx-texteditor-input {
  font-size: 14px;
  font-family: Montserrat;
}

.dx-scrollview-content {
  background: #063690;
  margin-left: -25px;
}

.dx-list .dx-empty-message,
.dx-list-item {
  color: #ffffff;
}

.dx-list:not(.dx-list-select-decorator-enabled) .dx-list-item.dx-state-hover {
  background-color: #063690;
  color: white;
}

.dx-list:not(.dx-list-select-decorator-enabled)
  .dx-list-item.dx-list-item-selected {
  background-color: rgba(0, 0, 0, 0.1);
  color: #ffffff;
}

.dx-dropdownlist-popup-wrapper .dx-list:not(.dx-list-select-decorator-enabled) {
  min-height: 33.0001px;
  height: 180px;
}

.dx-dropdownlist-popup-wrapper
  .dx-list:not(.dx-list-select-decorator-enabled)
  .dx-list-item-content {
  color: white;
  background: #063690;
}
</style>
