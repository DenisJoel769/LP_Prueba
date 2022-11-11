<template>
  <div class="container container__width" >
    <v-card class="rounded-xl ">
      <v-card-text>

        <v-row class="justify-center">
          <v-col md="5">
            <div
              class="font-weight-bold mb-n4"
              style="color: #063690; font-size: 14px"
            >
              Ingresar nº de cédula
            </div>     
            <v-text-field
              v-model="cedula"
              autocomplete="off"
              single-line
              class="rounded-xl"
              @keyup.enter="obtenerCliente"
            ></v-text-field>
          </v-col>

          <!-- Seccion para traer las fotos  de las cedulas-->
          <v-col md="1">
            <v-btn class="ml-n5 mt-7" icon small color="#aeaeae">
              <v-icon @click="mostrarFotoCedula()">fa-image</v-icon>
            </v-btn>
          </v-col>
          <v-col md="4">
            <v-autocomplete
              class="bucadorCliente caption"
              :items="clienteBuscador"
              label="Busqueda"
              append-outer-icon="fa-search"
              item-text="clienteBuscador"
              item-value="clienteBuscador"
              hide-no-data
              hide-selected
              v-model="search"
              @change="obtenerClientePorBuscador"
            ></v-autocomplete>
          </v-col>
        </v-row>



           <v-divider></v-divider>
      </v-card-text>

      <v-card-actions>
        <div>
          <v-btn
            outlined
            x-small
            fab
            color="#063690"
            @click="volverLlamadaEntrante"
          >
            <v-icon>fa-arrow-left</v-icon>
          </v-btn>
          <div class="ml-1 d-inline" style="font-size: 14px; color: #7494eb">
            Atrás
          </div>
        </div>

        <v-row justify="center" no-gutters>

             <v-btn
              dark
              label
              style="margin-top: 1px;"
              x-small
              color="#0D47A1"
               @click="obtenerCliente"      
              >
                Ingresar
              </v-btn>
        </v-row>

        <div class="d-flex justify-end">
          <v-btn
            @click="$emit('estadoInicial')"
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

    </v-card>

    <!-- Muestra las fotos de la cedula del cliente -->
    <v-dialog width="400" v-model="clienteCedula">
      <v-carousel
        v-if="
          clienteCedula &&
          $store.state.LlamadaEntrante.datosCliente.clienteFotos.length > 0
        "
        :show-arrows="false"
        class="rounded-xl"
        height="auto"
        width="auto"
      >
        <v-carousel-item
          v-for="item in $store.state.LlamadaEntrante.datosCliente.clienteFotos"
          :key="item.idClienteFoto"
          :src="item.url"
        >
        </v-carousel-item>
      </v-carousel>
      <!-- Si no hay fotos  -->
      <v-img v-else src="@/assets/articulo_sin_foto.jpg"></v-img>
    </v-dialog>

    <!-- Dialog que aparece cuando es un cliente incorrecto, el boton finaliza la llamada -->
    <v-dialog width="450" v-model="dialogClienteIncorrecto">
      <v-card class="rounded-xl">
        <v-card-text>
          <v-row justify="center">
            <speech
              class="mt-4"
              titulo="Validacion Incorrecta"
              width="400px"
              texto="Por políticas de confidencialidad no nos permiten dar información a terceros, por favor si fuera tan amable de indicar al titular que se ponga en contacto con nosotros"
            ></speech>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-row justify="center" no-gutters>
            <v-btn
              @click="$emit('finalizar')"
              fab
              dark
              x-small
              elevation="2"
              color="#dc0000"
            >
              <v-icon>fa-phone-slash</v-icon>
            </v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <router-view></router-view>
  </div>
</template>

<script>

import Speech from "@/components/ContactCenter/Speech.vue";
import { mapMutations } from "vuex";
import router from 'vue-router'

export default {
  components: {
    speech: Speech,
  },
  data: () => ({
    clienteBuscador: [],
    search: null,
    cedula: "",
    clientes: [],
    clienteCedula: false,
    checkNombre: false,
    checkFechaNacimiento: false,
    checkUltimoEmpenho: false,
    checkUltimoLocal: false,
    btnClienteCorrecto: false,
    btnClienteValidar: false,
    btnClienteIncorrecto: false,
    mostrarIconosValidacion: false,
    dialogClienteIncorrecto: false,
  }),
  methods: {
    ...mapMutations("LlamadaEntrante", ["updateDatosCliente"]),
    //Llamada al metodo mostrarLlamadaPresentacion de LlamadaEntrante.vue
    volverLlamadaEntrante() {
      this.$emit("return");
    },

    seleccionarTodoCheckbox(){

      if (this.checkNombre && this.checkFechaNacimiento && this.checkUltimoEmpenho && this.checkUltimoLocal) {
        this.checkNombre = false;
        this.checkFechaNacimiento = false;
        this.checkUltimoEmpenho = false;
        this.checkUltimoLocal = false;
        
      }else{     
        this.checkNombre = true;
        this.checkFechaNacimiento = true;
        this.checkUltimoEmpenho = true;
        this.checkUltimoLocal = true;
      }

    },
       
       
    //Llamada al metodo confirmValidacionDatos de LlamadaEntrante.vue
    confirmar() {
      // Si la cedula esta vacia no pasa
      if (!this.cedula) return;
      this.$emit("confirm");
    },

   async obtenerCliente() {
      let token = localStorage.getItem("user-token");
      var datosCliente = {
        idCliente: "",
        cedula: "",
        nombre: "",
        apellido: "",
        fechaNacimiento: "",
        ultimoEmpenho: "",
        ultimoLocal: "",
        numeroTelefono: "",
        clienteFotos: "",
      };

      await axios
        .get("/api/cliente/ObtenerClienteValidacion/" + this.cedula, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(
          (response) => (
            (datosCliente = response.data),
            (this.btnClienteIncorrecto = true),
            (this.updateDatosCliente(datosCliente),
            (this.mostrarIconosValidacion = true)),
            this.$router.push('retencion')
          )
        )
        .catch((err) => {
          this.updateDatosCliente(datosCliente);
          this.mostrarIconosValidacion = false;
          this.btnClienteIncorrecto = false;
          this.$store.commit("snackbar/mostrarMensaje", {
            mensaje: err.response.data.error,
            color: "error",
          });
        });
    },
    obtenerClientePorBuscador() {
      let filtrarcedula = this.clientes.filter((str) => {
        return str.nombreORazonSocial
          .toLowerCase()
          .trim()
          .startsWith(this.search.toLowerCase().trim());
      });
      this.cedula = filtrarcedula[0].nroCedula;
      //this.obtenerCliente();
      
    },

    async obtenerListadoClientes() {
      let token = localStorage.getItem("user-token");

      await axios
        .get("/api/cliente/ObtenerClienteBuscador/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => this.filtrarNombreCliente(response.data))
        .catch((err) => {
          console.warn(err.response.data.error);
        });
    },

    mostrarFotoCedula() {
      this.clienteCedula = true;
    },

    filtrarNombreCliente(json) {
      this.clientes = json;
      for (var i = 0; i < json.length; i++) {
        this.clienteBuscador.push(json[i].nombreORazonSocial.toLowerCase());
      }
    },

    verificarDatosCorrectos() {
      //verifica que todos los datos esten correctos
      if (
        this.checkNombre &&
        this.checkFechaNacimiento &&
        this.checkUltimoEmpenho &&
        this.checkUltimoLocal
      ) {
        this.btnClienteCorrecto = true;
        this.btnClienteIncorrecto = false;
        this.btnClienteValidar = false;
      } else if (
        !this.checkNombre &&
        !this.checkFechaNacimiento &&
        !this.checkUltimoEmpenho &&
        !this.checkUltimoLocal
      ) {
        this.btnClienteIncorrecto = true;
        this.btnClienteValidar = false;
        this.btnClienteCorrecto = false;
      } else {
        this.btnClienteValidar = true;
        this.btnClienteCorrecto = false;
        this.btnClienteIncorrecto = false;
      }
    },
  },

  computed: {},

  watch: {
    checkNombre() {
      this.verificarDatosCorrectos();
    },

    checkFechaNacimiento() {
      this.verificarDatosCorrectos();
    },

    checkUltimoLocal() {
      this.verificarDatosCorrectos();
    },

    checkUltimoEmpenho() {
      this.verificarDatosCorrectos();
    },
  },

  mounted() {
    this.obtenerListadoClientes();
    //this.verificarDatosCorrectos();
  },
};
</script>

<style lang="scss">
  .bucadorCliente .v-label {
    font-size: 12px;
    .btncheckValidacion{
      margin-right: 20%;

    }
  }
  .container__width{

    min-width: 350px;
    max-width: 500px;

    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

  }
</style>
