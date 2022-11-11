import { mapMutations } from 'vuex';

export default {
  data: (vm) => ({
    tableClass: "tableBoletas",
    dateFecha: new Date().toISOString().substr(0, 10),
    menuFecha: false,
    loaderView: false,
    busquedaBoletasSimulador: "",
    Simuladordebusqueda: [],

    loaderView: false,
    SimuladorCancelar: false,
    headers: [
      {
        text: "",
        value: "idEmpenho",
        class: "white--text caption header rounded-l-lg",
        sortable: false,
      },
      {
        text: "Boleta",
        value: "boleta",
        class: "white--text caption header",
        sortable: false,
      },
      {
        text: "Tipo",
        value: "tipo",
        class: "white--text caption header",
        sortable: true,
      },
      {
        text: "Saldo",
        value: "saldo",
        class: "white--text caption header",
        sortable: false,
      },
      {
        text: "Amortización",
        value: "amortizacion",
        class: "white--text caption header",
        sortable: false,
      },
      {
        text: "Meses",
        value: "meses",
        class: "white--text caption header",
        sortable: false,
      },
      {
        text: "Días",
        value: "dias",
        class: "white--text caption header",
        sortable: false,
      },
      {
        text: "Interés",
        value: "interes",
        class: "white--text caption header",
        sortable: false,
      },
      {
        text: "Descuento",
        value: "descuento",
        class: "white--text caption header",
        sortable: false,
      },
      {
        text: "Total:",
        value: "total",
        class: "white--text caption header",
        sortable: false,
      },
      {
        text: "",
        value: "",
        class: "white--text caption header rounded-r-lg",
        sortable: false,
      },
    ],
    boletasTabla: [],

    datosBoletasActivas: [],

    itemsSelect: [
      { id: 1, tipo: "Interes" },
      { id: 2, tipo: "Retiro" },
    ],

    ayudas: [
      {
        descripcion: "Pasará a remate",
        icon: "fa-exclamation-triangle",
        iconColor: "#8d0404",
      },
      {
        descripcion: "No disponible para retiro",
        icon: "fa-ban",
        iconColor: "#000000",
      },
      {
        descripcion: "Disponible para retiro",
        icon: "fa-check-circle",
        iconColor: "#0fcbc5",
      },
      {
        descripcion: "Artículo con retención",
        icon: "fa-lock",
        iconColor: "#ffd014",
      },
    ],
  }),

  methods: {
    ...mapMutations("LlamadaEntrante", [
      'updateBoletasSimulador', //also supports payload `this.nameOfMutation(amount)` 
    ]),

    async getBoletas() {
      let token = localStorage.getItem("user-token");
      var boletas = [];

      //let idCliente = this.$store.state.LlamadaEntrante.datosCliente.idCliente;
      this.loaderView = true
      if (this.idCliente) {
        await axios
          .get("/api/BoletaActiva/" + this.idCliente, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => (boletas = response.data))
          .catch((err) => {
            console.warn(err.response.data.error);
          });

        //Elimino las boletas ya seleccionadas anteriormente
        var boletasSimulador = this.$store.state.LlamadaEntrante.boletasSimulador;
        for (var i = 0; i < boletas.length; i++) {
          var igual = false;
          for (var j = 0; j < boletasSimulador.length & !igual; j++) {
            if (boletas[i]['idEmpenho'] == boletasSimulador[j]['idEmpenho'])
              igual = true;
          }
          if (!igual) this.datosBoletasActivas.push(boletas[i]);
        }
        /* Le asigna boletas dentro de la tabla */
        this.boletasTabla = boletasSimulador;
        //datos boletas activas le asigna boletas a simulador de busqueda 
        this.Simuladordebusqueda = this.datosBoletasActivas;
        //con loaderView false ocultamos el spiner que sale cada vez que se agrega una boleta  
        this.loaderView = false;
     
        }
      
    },

    /*
      recibe la boleta que se selecciono y el indice en el que se encuentra en el array
      datosBoletasActivas para poder eliminar y agregar en el array boletasTabla
    */
   agregarBoletaSeleccionada(boleta, index, nroBoleta) {
     try {
      this.loaderView = true 
       //Agrego la boleta Seleccionada a la tabla
       //uso unshift para agregar al comienzo del array asi no tengo que ordenar ...
       boleta.tipo = 1;
       boleta.saldo = 0;
       boleta.amortizacion = 0;
       boleta.meses = 0;
       boleta.dias = 0;
       boleta.descuento = 0;
        boleta.total = 0;
        boleta.interes = 0;
        this.boletasTabla.unshift(boleta);
        //Elimina la boleta seleccionada
        this.datosBoletasActivas.splice(index, 1);
        
        //Agrego al estado de vuex mediante la mutacion
        /*Validacion para que las boletas seleccionadas unicamente se introduzcan una vez*/
        let validacion = this.boletasTabla.find(element => element.nroBoleta === nroBoleta);
        
        if (validacion === undefined) {
          
          this.updateBoletasSimulador(this.boletasTabla);
          this.getBoletas();
        }           
        this.boletasTabla = [];
        this.datosBoletasActivas = [];
      } catch (error) {
        console.error(error);
      }
    },

    /*
      recibe la boleta que se selecciono y el indice en el que se encuentra en el array
      boletasTabla para poder eliminar y agregar de nuevo en el array datosBoletasActivas*/
    quitarBoletaTabla(boleta, index) {
      try {
        //Agrego la boleta Seleccionada a la tabla
        this.datosBoletasActivas.unshift(boleta);
        //Elimina la boleta seleccionada
        this.boletasTabla.splice(index, 1);
        //Actualizo el estado mediante la mutacion
        this.updateBoletasSimulador(this.boletasTabla);
      } catch (error) {
        console.error(error);
      }
      this.loaderView = false
      if (this.boletasTabla.length == 0) this.tableClass = "tableBoletas";
    },

    seleccionarTodo() {
      try {
        //Agrego todas las boletas a la tabla
        //uso unshift para agregar al comienzo del array asi no tengo que ordenar ...
        this.datosBoletasActivas.forEach((boleta) => {
          boleta.tipo = 1;
          boleta.saldo = 0;
          boleta.amortizacion = 0;
          boleta.meses = 0;
          boleta.dias = 0;
          boleta.descuento = 0;
          boleta.total = 0;
          boleta.interes = 0;
          this.boletasTabla.unshift(boleta);
        });

        this.datosBoletasActivas = [];
        //Actualizo el estado mediante la mutacion
        this.updateBoletasSimulador(this.boletasTabla);
        this.boletasTabla = [];
        this.getBoletas();
      } catch (error) {
        console.error(error);
      }
    },
    // busquedaBoletasSimulador: "",
    // Simuladordebusqueda: [],
    buscarBoletaSimulador(){
        if(!this.busquedaBoletasSimulador){
          //asignamos boletas de boletas activas a simuladordebusqueda
          this.Simuladordebusqueda = this.datosBoletasActivas;
        }
              //vacio la boletas asignadas
        this.Simuladordebusqueda = [];
        
        this.datosBoletasActivas.forEach((boleta) =>{
              
          if(boleta.nroBoleta.toString().includes(this.busquedaBoletasSimulador))
          this.Simuladordebusqueda.push(boleta);
          else if(
            boleta.articuloCategoria.toString()
            .toUpperCase()
            .includes(!this.busquedaBoletasSimulador.toUpperCase())
          )
            this.busquedaBoletasSimulador.push(boleta)
        });
    },

    async CancelarSimulador(){
      // // this.boletasSimulador = []
      // // this.boletasTabla = []
      // this.datosboletasActivas = [];
      // this.boletasTabla = [];

      // let token = localStorage.getItem("user-token")
      //   // var boletasSimulador = this.$store.state.LlamadaEntrante.boletasSimulador;
      //   // var correcto = false;
      //   // idRetencionBoletaCab: this.$store.state.LlamadaEntrante.datosRetencion.idSolicitud
      
      // await axios({
      //   method: "delete",
      //   url: "/api/Simulador",
      //   data: datos,
      //   headers: {
      //     Authorization: `Bearer ${token}`
      //   },
      // })
      // .then((response) => {
      //   this.boletasSimulador = false;
      //   this.$store.state.LlamadaEntrante.boletasActivas = [];
      //   this.$store.state.LlamadaEntrante.datosRetencion = {
      //     idRetencion: null,
      //     observacion: "",
      //     fechaSolicitud: new Date().toISOString().substr(0, 10)
      //   }
      //   this.getBoletas();
      // })
      // .catch((error) => {
      //   this.$store.commit("snackbar/mostrarMensaje", {
      //     mensaje: error.response.data.error,
      //     color: "error",
      //   });
      // });
    }
  },

  mounted() {
    this.getBoletas();
    this.boletasTabla = this.$store.state.LlamadaEntrante.boletasSimulador;
  },
  watch: {
    idCliente() {
      this.getBoletas();
    },
    busquedaBoletasSimulador(){
      this.buscarBoletaSimulador();
    }
  },
  computed: {
    tableBoletas() {
      return this.tableClass;
    },
    boletasActivas() {
      return this.Simuladordebusqueda.sort(function (a, b) {
        if (a.idEstadoEmpenho > b.idEstadoEmpenho) return 1;
        if (a.idEstadoEmpenho < b.idEstadoEmpenho) return -1;
        if ((a.idEstadoEmpenho === b.idEstadoEmpenho)) return 0;
      });
    },
    idCliente() {
      return this.$store.state.LlamadaEntrante.datosCliente.idCliente;
    }
  },
};
