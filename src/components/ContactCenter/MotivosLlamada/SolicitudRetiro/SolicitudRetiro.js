import {
  triggerHandler
} from 'devextreme/events';
import {
  mapMutations
} from 'vuex';

export default {

  data: (vm) => ({
    model: null,
    todaslasboletas: [],
    tableClass: "tableBoletas",
    dateFecha: new Date().toISOString().substr(0, 10),
    menuFecha: false,
    loaderView: false,
    dialogCancelar: false,
    boletaDetallesInteres: 0,
    busquedaBoletaActiva: "",
    boletasActivasBusqueda: [],
    boletasTablaInteres: [],
    boletaTotalGeneral: 0,
    dialogConfirmRetiro: false,
    //fechapagoSeleccion: new Date().toISOString().substr(0, 10),   
    // Sumandole 2 dias mas a la fecha actual para obtener su interes total
    fechapagoSeleccion: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2).toISOString().substr(0, 10),
    totalGeneral: 0,
    interesFechaSolicitud: 0,
    //boletasTablaInteresAux: [],
    headers: [{
        text: "Id Empenho",
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
        text: "Articulo Categoria",
        value: "articuloCategoria",
        class: "white--text caption header",
        sortable: false,
      },

      {
        text: "Interes Normal",
        value: "interes",
        class: "white--text caption header",
        sortable: false,
      },
      {
        text: "Atraso",
        value: "atraso",
        class: "white--text caption header",
        sortable: false,
      },

      {
        text: "Monto por Boleta",
        value: "articuloCategoria",
        class: "white--text caption header",
        sortable: false,
      },
      {
        text: "Quitar Boleta",
        value: "articuloCategoria",
        class: "white--text caption header",
        sortable: false,
      },

    ],
    //boletasTabla: [],
    btnDisable: false,
    datosBoletasActivas: [],
    datosBoletasActivasInteres: [],

    ayudas: [{
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
      'updateBoletasRetiro', //also supports payload `this.nameOfMutation(amount)` 
    ]),

    //Funcion asincrona que obtiene los datos de la boleta (boletaTabla)
    async getBoletas() {

      this.loaderView = true;
      let token = localStorage.getItem("user-token");
      //var boletas = [];

      //let idCliente = this.$store.state.LlamadaEntrante.datosCliente.idCliente;
      if (this.idCliente) {

        /* =================================================================================== */
        /* Ver esta seccion por que no trae los datos, probar con Cobro */
        await axios
          .get("/api/BoletaActiva/" + this.idCliente, {
            headers: {
              Authorization: `Bearer ${token}`
            },
          })

          .then((response) => {
            //Calculando el interes con la fecha que el cliente quiera retirar 
            //this.interesFechaSolicitud = boletas.;
            this.todaslasboletas = response.data;

          })

          .catch((err) => {
            console.warn(err.response.data.error);
          });

        //Elimino las boletas ya seleccionadas anteriormente
        var boletasRetiro = await this.$store.state.LlamadaEntrante.boletasRetiro;

        for (let i = 0; i < this.todaslasboletas.length; i++) {

          let igual = false;
          for (let j = 0; j < boletasRetiro.length & !igual; j++) {
            if (this.todaslasboletas[i]['idEmpenho'] == boletasRetiro[j]['idEmpenho'])
              igual = true;
          }

          if (!igual) this.datosBoletasActivas.push(this.todaslasboletas[i]);

        }

        //VER
        /* ================================================================================ */
        //Filtro solo los que no esten disp para retiro 

        /* this.datosBoletasActivas = this.datosBoletasActivas.filter(retiro => retiro.disponibleRetiro == false); */

        /* ================================================================================ */
        //this.boletasTabla = boletasRetiro;

        this.boletasTablaInteres = await boletasRetiro;

        //Al inicio va ser lo mismo porque no se busco nada
        this.boletasActivasBusqueda = this.datosBoletasActivas;

        console.log(this.boletasActivasBusqueda);

        this.loaderView = false;
        //this.datosBoletasActivas = this.boletasActivas; //filtra propiedad computada

        if (this.boletasActivasBusqueda.length <= 0) {
          this.btnDisable = true
        }

      }

    },

    async agregarBoletaSeleccionada(boleta, nroBoleta) {

      try {

        //Agregando la ventana del loader para que el usuario no interactue con la aplicacion
        this.loaderView = true;

        /* Cada vez que se seleccione un item se vacia el campo de la busqueda de la Boleta */

        //Vaciando el buscador para actualizar los datos
        this.busquedaBoletaActiva = ""

        let token = localStorage.getItem("user-token");
        //console.log(boleta);
        let datos = {
          idEmpenho: boleta.idEmpenho,
          mesesCobro: boleta.mesesCobro,
          fechaPago: this.fechapagoSeleccion,
          cobroTipo: 4
        };

        await axios({
            method: "post",
            url: "/api/Cobro/CalcularCobro",
            data: datos,
            headers: {
              Authorization: `Bearer ${token}`
            },
          })

          .then((response) => {

            this.boletaDetallesInteres = response.data;

            //console.log(this.datosBoletasActivas);
            //console.log(this.boletasActivasBusqueda);
            /* Devuelve el valor a la Tabla de las boletas de abajo */

            // console.log(index);

            //this.boletasTablaInteres.unshift(this.boletaDetallesInteres);

            //console.log(this.boletasTablaInteres);

            /*Validacion para saber si la boleta que se quiere introducir ya se encuentra o no en la tabla donde se muestran los detalles de la boleta (this.boletasTablaInteres)*/
            let validacion = this.boletasTablaInteres.find(element => element.nroBoleta === nroBoleta)

            /*En caso de que la boleta que se desea introducir no se encuentra en la tabla donde se muestran los detalles (this.boletasTablaInteres), esta se introducira. 
            Si la boleta que se intenta agregar a la tabla donde se muestran los detalles de la boleta ya se encuentra se mostrara un mensaje de error
            */
            if (validacion === undefined) {

              /*  Agrego al estado de vuex mediante la mutacion */
              this.boletasTablaInteres.unshift(this.boletaDetallesInteres);

              //Obteniendo el indice del elemento seleccionado para eliminar
              let index = this.datosBoletasActivas.findIndex(elemento => elemento.nroBoleta === nroBoleta)

              //Eliminando el elemento de datosBoletas activas a traves del indice obtenido en index con (findIndex)

              if (index !== -1) {

                this.datosBoletasActivas.splice(index, 1);

              } else {

                /*En caso de que el indice devuelto por findIndex almacenado en la variable index 
                se imprimira el siguiente error*/
                this.$store.commit("snackbar/mostrarMensaje", {
                  mensaje: "Ha ocurrido un error en la seleccion de la boleta, por favor intentelo de nuevo.",
                  color: "error",
                });
                  
              }


              //Quitando la ventana del loader para que el usuario interactue con la aplicacion
              this.loaderView = false;
              //Habilitando el boton para seleccionar todo
              this.btnDisable = false

            } else {

              //En caso de que se intente introducir dos veces la misma boleta se imprimira este error.
              this.$store.commit("snackbar/mostrarMensaje", {
                mensaje: "La boleta que selecciono ya ha sido introducida.",
                color: "error",
              });

            }

            //this.datosBoletasActivas.splice(index, 1);

            //this.updateBoletasRetiro(this.datosBoletasActivas)

            /* this.boletasActivasBusqueda.splice(index, 1);
  
            this.updateBoletasRetiro(this.boletasActivasBusqueda) */

            //this.boletasActivasBusqueda = [];

            /* console.log(this.boletasActivasBusqueda);
            console.log(this.datosBoletasActivas); */

          })

          .catch((error) => {
            this.$store.commit("snackbar/mostrarMensaje", {
              mensaje: error.response.data.error,
              color: "error",
            });
          });

        //this.busquedaBoletaActiva = "";

      } catch (error) {
        console.error(error);
      }
      //this.getBoletas();
      //this.btnDisable = true

    },


    /*
      recibe la boleta que se selecciono y el indice en el que se encuentra en el array
      boletasTabla para poder eliminar y agregar de nuevo en el array datosBoletasActivas*/
    quitarBoletaTabla(boleta, precio) {

      try {

        //Agregando la ventana del loader para que el usuario no interactue con la aplicacion
        this.loaderView = true;
        //Reseteando el input de busquedaBoletaActiva.
        this.busquedaBoletaActiva = 0

        //Encontrando el indice de la boleta mediante el metodo findIndex.
        let index = this.boletasTablaInteres.findIndex(elemento => elemento.nroBoleta === boleta.nroBoleta)

        //Validando que la boleta seleccionada exista
        if (index !== -1) {

          //Elimina la boleta seleccionada
          this.boletasTablaInteres.splice(index, 1);

        }

        //Filtra las boletas de acuerdo al numero de boleta recibido.

        let boletaFiltro = this.todaslasboletas.find(boletaPrueba => boletaPrueba.idEmpenho === boleta.idEmpenho)

        //Inserta en el arreglo datosBoletasActivas el valor retornado en la variable boletaFiltro.
        //this.datosBoletasActivas.unshift(boletaFiltro);

        //this.boletasActivasBusqueda.unshift(boletaFiltro);
        this.datosBoletasActivas.unshift(boletaFiltro);

        //Quitando la ventana del loader para que el usuario interactue con la aplicacion
        this.loaderView = false;
        //this.boletasActivasBusqueda.splice(index, 1);
        //this.datosBoletasActivas.unshift(boletaFiltro);
       // this.updateBoletasRetiro(this.datosBoletasActivas);


      } catch (error) {
        console.error(error);
      }

      //En caso de que se quite una boleta el boton de seleccionar todo volvera a estar disponible
      this.btnDisable = false;

      //this.busquedaBoletaActiva = "";
      if (this.boletasTablaInteres.length === 0) this.tableClass = "tableBoletas";

    },

    async seleccionarTodo() {
      this.loaderView = true;

      //Vaciando los datos de las boletas activas (Boletas verdes de abajo)

      //this.boletasActivasBusqueda = []
      //this.datosBoletasActivas = []

      //Agregando la ventana del loader para que el nousuario interactue con la aplicacion
      this.btnDisable = true;


      /*  if (this.boletasActivasBusqueda.length <= 0) {


      } else {

        this.loaderView = true;
      }
 */
      try {
        //Borrando el numero de la boleta para enviar actualizar las boletas que aun no se agregaron
        this.busquedaBoletaActiva = "";
        /* this.todaslasboletas.forEach(element => { */
        /* Desactivando el boton de seleccionar Todo */

        //console.log(validacion);

        //Validando que al seleccionar todo unicamente se introduzca una sola vez cada elemento y no haya elementos

        //Agrego todas las boletas a la tabla
        await this.boletasActivas.forEach(boleta => {

          //Validando que unicamente seleccione las boletas con el estado de empeñado.

          if (boleta.transaccionEstado === "Empeñado") {

            //this.boletasActivas = [];

            let token = localStorage.getItem("user-token");

            let datos = {
              idEmpenho: boleta.idEmpenho,
              mesesCobro: boleta.mesesCobro,
              fechaPago: this.fechapagoSeleccion,
              cobroTipo: 4
            };

            axios({
                method: "post",
                url: "/api/Cobro/CalcularCobro",
                data: datos,
                headers: {
                  Authorization: `Bearer ${token}`
                },
              })

              .then((response) => {

                /*Validacion para saber si la boleta que se quiere introducir ya se encuentra o no en la tabla donde se muestran los detalles de la boleta (this.boletasTablaInteres)*/

                let validacion = this.boletasTablaInteres.find(element => element.nroBoleta === boleta.nroBoleta);
                
                /*En caso de que la boleta que se desea introducir no se encuentra en la tabla donde se muestran los detalles (this.boletasTablaInteres), esta se introducira. 
                Si la boleta que se intenta agregar a la tabla donde se muestran los detalles de la boleta ya se encuentra se mostrara un mensaje de error
                */
                if (validacion === undefined) {

                  //Asignando la respuesta del endpoint a la variable this.boletaDetalles
                  this.boletaDetallesInteres = response.data;

                  /* Devuelve el valor a la Tabla de las boletas de abajo */
                  this.boletasTablaInteres.unshift(this.boletaDetallesInteres);


                  /*  Calculando el total general a pagar */
                  this.totalGeneral = this.totalGeneral + this.boletaDetallesInteres.total;

                  /*  Agrego al estado de vuex mediante la mutacion, actualizo el estado mediante la mutacion */
                  //this.updateBoletasRetiro(this.boletasTablaInteres);

                  /* Vaciando los datos de las boletas activas y de las boletasActivasBusqueda (boletas verdes de abajo) */
                  this.datosBoletasActivas = [];
                  this.boletasActivasBusqueda = [];
                  this.loaderView = false;

                } else {

                  this.$store.commit("snackbar/mostrarMensaje", {
                    mensaje: "La boleta que selecciono ya ha sido introducida con el seleccionar todo.",
                    color: "error",
                  });

                }


              })
          };

        });

        //this.btnDisable = false;
        //Quitando la ventana del loader para que el usuario interactue con la aplicacion

      } catch (error) {
        console.error(error);
      }

      //Llamando a la funcion la cual obtiene las boletas (datosBoletasActivas);
      this.getBoletas();

      //this.loaderView = false;

    },

    buscarBoletasActivas() {
      /* 
        !VERIFICAR 
      */

      //Si la tabla donde se muestran las boletas verdes se vacia significa que no se han encontrado coincidencias con la boleta buscada por el usuario y se mostrara el siguiente mensaje de error
      /*    if (this.boletasActivasBusqueda.length <= 0) {

           this.$store.commit("snackbar/mostrarMensaje", {
             mensaje: "No se ha encontrado la boleta buscada.",
             color: "error",
           });
           
         } */

      if (!this.busquedaBoletaActiva) {
        this.boletasActivasBusqueda = this.datosBoletasActivas;
        this.btnDisable = false;
        return;
      }

      this.boletasActivasBusqueda = [];

      this.datosBoletasActivas.forEach((boleta) => {

        if (boleta.nroBoleta.toString().includes(this.busquedaBoletaActiva)) {
          this.boletasActivasBusqueda.push(boleta);
        } else if (
          boleta.articuloCategoria
          .toUpperCase()
          .includes(this.busquedaBoletaActiva.toUpperCase())
        ) {
          this.boletasActivasBusqueda.push(boleta);
        }
      });



    },

    async generarSolicitud() {

      //this.dialogCancelar = true;

      let token = localStorage.getItem("user-token");
      var boletasRetiro = this.$store.state.LlamadaEntrante.boletasRetiro;
      var correcto = false;


      for (let index = 0; index < boletasRetiro.length; index++) {

        var dato = {
          idEmpenho: boletasRetiro[index].idEmpenho,
          idSolicitante: this.$store.state.LoginStore.IdUsuario,
          fechaHoraSolicitud: new Date().toISOString().substr(0, 10)
        };
        //console.log(dato);
        
        await axios({
            method: "post",
            url: "/api/SolicitudRetiro",
            data: dato,
            headers: {
              Authorization: `Bearer ${token}`
            },
          })
          .then((response) => {
            /*  let index = this.datosBoletasActivas.findIndex(elemento => elemento.nroBoleta === nroBoleta)
            
            this.datosBoletasActivas() */
            
            this.boletasTablaInteres = []
            correcto = true

            this.updateBoletasRetiro(this.boletasTablaInteres);
            this.$store.state.LlamadaEntrante.componenteActual = {componente:"estado-cuenta"};            
          })
          .catch((error) => {
            correcto = false;
          });
          
          if (!correcto) {
            this.$store.commit("snackbar/mostrarMensaje", {
              mensaje: "Error al generar la solicitud de retiro",
              color: "error",
            });
            return;
          }      
        }
      

      this.$store.commit("snackbar/mostrarMensaje", {
        mensaje: "Solicitud de Retiro Generada Correctamente",
        color: "success",
      });

      this.dialogConfirmRetiro = false;

    },

    /* Funcion asincrona para cancelar la solicitud de Retiro*/
  /*   async cancelarSolicitudRetiro() {

      Vaciando la tabla donde se muestran todas las boletas.
      this.datosBoletasActivas = [];
      Vaciando la tabla donde se muestran todas las boletas seleccionadas
      this.boletasTablaInteres = []
      En caso de que se de click en el boton de cancelar solicitud el boton de seleccionar todo se habilitara
       this.loaderView = true;


      if (this.boletasActivasBusqueda.length <= 0) {
        this.btnDisable = true;

        this.loaderView = false;

      } else {

        this.loaderView = true;

      }
      this.dialogCancelar = true;

      let token = localStorage.getItem("user-token");

      let datos = {
        idEmpenhoDelete: this.$store.state.LlamadaEntrante.datosRetencion.idEmpenho
      };

      await axios({
          method: "delete",
          url: "/api/SolicitudRetiro",
          data: datos,
          headers: {
            Authorization: `Bearer ${token}`
          },
        })

        .then((response) => {
          console.log(response);
          this.busquedaBoletaActiva = "";

          this.dialogCancelar = false;

          this.totalGeneral = 0;

          this.$store.state.LlamadaEntrante.boletasRetiro = [];
          Cargando todas las boletas de nuevo en la parte de boletas Tabla (Donde figuran las boletas verdes a seleccionar)
          this.dialogCancelar = false;

          this.updateBoletasRetiro(this.boletasTablaInteres);

        })
        .catch((error) => {
          this.$store.commit("snackbar/mostrarMensaje", {
            mensaje: error.response.data.error,
            color: "error",
          });
        });

      Asignando la fecha actual mas los dos dias de espera para el cliente, con el objetivo de calcular los intereses
      this.fechapagoSeleccion = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2).toISOString().substr(0, 10)

      this.btnDisable = false;

      this.btnDisable = false;

      this.loaderView = false;

      this.getBoletas();
    } */

    async cancelarSolicitudRetiro() {

      //this.dialogCancelar = true;
      
      this.loaderView = true;

      let token = localStorage.getItem("user-token");
      var boletasRetiro = this.$store.state.LlamadaEntrante.boletasRetiro;
      var correcto = false;

      //Vaciando la tabla donde se muestran todas las boletas.
      this.datosBoletasActivas = [];
      //Vaciando la tabla donde se muestran todas las boletas seleccionadas
      this.boletasTablaInteres = []
      //En caso de que se de click en el boton de cancelar solicitud el boton de seleccionar todo se habilitara


      if (this.boletasActivasBusqueda.length <= 0) {
        this.btnDisable = true;

        this.loaderView = false;

      } else {

        this.loaderView = true;

      }
      for (let index = 0; index < boletasRetiro.length; index++) {

        var dato = {
          idEmpenho: boletasRetiro[index].idEmpenho,
          idSolicitante: this.$store.state.LoginStore.IdUsuario,
          fechaHoraSolicitud: new Date().toISOString().substr(0, 10)
        };

        await axios({
            method: "delete",
            url: "/api/SolicitudRetiro",
            data: dato,
            headers: {
              Authorization: `Bearer ${token}`
            },
          })
          .then((response) => {
            console.log(response);
            this.$store.state.LlamadaEntrante.boletasRetiro = [];
            this.dialogCancelar = false;
            correcto = true
            this.btnDisable = false
            this.updateBoletasRetiro(this.boletasTablaInteres);
          })
          .catch((error) => {
            correcto = false;
          });

        if (!correcto) {
          this.$store.commit("snackbar/mostrarMensaje", {
            mensaje: "Error al cancelar la solicitud de retiro",
            color: "error",
          });
          return;
        }
      }
      this.loaderView = false;
      this.getBoletas();

      this.$store.commit("snackbar/mostrarMensaje", {
        mensaje: "Solicitud de retiro cancelada Correctamente",
        color: "error",
      });
    },

  },


  mounted() {

    this.getBoletas();

    let boletasSimulador = this.$store.state.LlamadaEntrante.boletasSimulador;
    let boletasRetiro = this.$store.state.LlamadaEntrante.boletasRetiro;

    boletasSimulador.forEach(boleta => {
      //Si es de tipo retiro la boleta cargada en el simulador
      if (boleta.tipo == 2) {
        //Si la boleta cargada en el simulador no esta en la tabla del retiro 
        if (typeof boletasRetiro.find(boletaRet => boletaRet.idEmpenho == boleta.idEmpenho) === 'undefined') {
          boletasRetiro.push(boleta);
        }
      }
    });

  },

  watch: {

    idCliente() {
      this.getBoletas();
    },

    busquedaBoletaActiva() {
      this.btnDisable = true
      this.buscarBoletasActivas();
    },

    fechapagoSeleccion(fechaSeleccionada) {
      /* 
      TODO this.datosBoletasActivas Contiene las boletas activas que figuran abajo, las boletas verdes a seleccionar 
      */

      //console.log(this.datosBoletasActivas);


      //this.datosBoletasRetencion = [];

      /* 
        TODO this.todaslasboletas contienen todas las boletas que existan
      */
      // console.log(this.todaslasboletas);

      /* 

      */

      /* 
      TODO this.boletasTablaInteres contiene  las boletas que estan ubicadas en la grilla o tabla donde se muestran todos los detalles, este se obtiene de la respuesta del unshift de la respuesta del endpoint /api/Cobro/CalcularCobro el cual se almacena en la variable this.boletaDetallesInteres
      */
      //console.log(this.boletasTablaInteres);

      /* 
        TODO Contiene los mismos datos que this.boletasTablaInteres
      */

      /* 
        ! Eliminado
        console.log(this.boletasTabla);
      */

      /* 
        TODO Contiene los mismos datos que this.datosBoletasActivas
        ? No se puede Eliminar porque es una propiedad computada
        console.log(this.boletasActivas);
      */

      /* 
        TODO Contiene cada respuesta , (endpoint /api/Cobro/CalcularCobro) post de una boleta.
      */
      //console.log(this.boletaDetallesInteres);


      /*
      TODO Contiene las boletas a buscar
      
      */

      //console.log(this.boletasActivasBusqueda);

      try {

        this.totalGeneral = 0;
        /* console.log(this.boletasTabla);
        console.log(this.datosBoletasActivas); */
        let token = localStorage.getItem("user-token");

        /*Realizando el recorrido de las boletas que se encuentran en la tabla para realizar una nueva peticion en la cual se traigan los nuevos datos de las boletas de acuerdo a la fecha de pago modificada*/

        //console.log(this.boletasTabla);
        //console.log(this.boletasTablaInteresCalculado);

        if (this.boletasTablaInteres.length > 0) {

          //Agregando la ventana del loader para que el usuario no interactue con la aplicacion
          this.loaderView = true;
          this.boletasTablaInteres.forEach(boletasTablaFecha => {
            let datos = {
              idEmpenho: boletasTablaFecha.idEmpenho,
              mesesCobro: boletasTablaFecha.mesesCobro,
              fechaPago: fechaSeleccionada,
              cobroTipo: 4
            };

            axios({
                method: "post",
                url: "/api/Cobro/CalcularCobro",
                data: datos,
                headers: {
                  Authorization: `Bearer ${token}`
                },
              })

              .then((response) => {

                //Asignando la respuesta del endpoint a la variable boletaDetalles

                this.boletaDetallesInteres = response.data;

                /* Devuelve el valor a la Tabla de las boletas de abajo 
                  Agrego la boleta Seleccionada a la tabla uso unshift para agregar al comienzo del array asi no tengo que ordenar ...
                */

                this.boletasTablaInteres.unshift(this.boletaDetallesInteres);

                /*  Eliminando la boleta seleccionada con el checkbox*/
                //this.datosBoletasActivas.splice(this.boletasDetallesInteres, 1);

                /*  Agrego las boletas de la tabla mediante el estado manejado con vuex y su mutacion */
                //this.updateBoletasRetiro(this.boletasTablaInteres);

                //this.datosBoletasActivas.push(this.boletaDetallesInteres);

                /*  Calculando el total general a pagar */
                this.totalGeneral = this.totalGeneral + this.boletaDetallesInteres.total;
                //Quitando la ventana del loader para que el usuario interactue con la aplicacion
                this.loaderView = false;

              })

              //En caso de que ocurra un error en la peticion de la API
              .catch((error) => {
                this.$store.commit("snackbar/mostrarMensaje", {
                  mensaje: error.response.data.error,
                  color: "error",
                });
              });

          })

        } else {
          this.$store.commit("snackbar/mostrarMensaje", {
            mensaje: "Seleccione una boleta antes de cambiar la fecha.",
            color: "error",
          });
        }

        //Vaciando la tabla (grilla) donde se muestran los detalles de las boletas
        this.boletasTablaInteres = [];
        //En caso de que ocurra un error entrara en este fragmento y en la consola nos imprimira dicho error
        //this.boletasTabla.unshift(this.boletaDetallesInteres);

      } catch (error) {
        console.error(error);
      }
    }
  },

  computed: {

    tableBoletas() {
      return this.tableClass;
    },

    //Propiedad computada para ir calculando el monto total
    montoTotal() {

      this.totalGeneral = 0;
      //this.totalporBoleta = 0;
      this.boletasTablaInteres.forEach(boleta => {
        this.totalGeneral = this.totalGeneral + boleta.total;
      });
      return this.totalGeneral;
    },


    //Devuelve los valores que contienen las boletas de empeño a seleccionar

    boletasActivas() {

      //Mostrando y ordenando las boletas verdes de acuerdo al idEstadoEmpenho
      //console.log(this.boletasActivasBusqueda);
      return this.boletasActivasBusqueda.sort(function (a, b) {

        if (a.idEstadoEmpenho > b.idEstadoEmpenho) return 1;
        if (a.idEstadoEmpenho < b.idEstadoEmpenho) return -1;
        if ((a.idEstadoEmpenho === b.idEstadoEmpenho)) return 0;

          /* 
            Filtro para comprobar si no esta disponible para el retiro, para filtrar las boletas que solo sean de tipo empeñado, las que esten en remate, y las que esten en resguardo
            TODO Agregar un filtro si esta en resguardo mostrar las boletas
            Unicamente se mostrarn las boletas que no se hayan sido solicitado para el retiro
          */
      }).filter(retiro => retiro.solicitudRetiro === false && retiro.disponibleRetiro === false && retiro.idEstadoEmpenho === 12 && retiro.transaccionEstado === "Empeñado" && retiro.aRematar === true && retiro.resguardo == true);
      
      //return this.boletasActivasBusqueda;

    },

    //Devuelve la tabla que contiene todos los intereses y montos por boleta para imprimir en pantalla.
    boletasTablaInteresCalculado() {
      //Ordenando los elementos de la tabla donde se muestran los datos de las boletas de forma ascendente atraves del ID del empeño.
      return this.boletasTablaInteres.sort(function (a, b) {
        if (a.idEmpenho > b.idEmpenho) return 1;
        if (a.idEmpenho < b.idEmpenho) return -1;
        if ((a.idEmpenho === b.idEmpenho)) return 0;
      })

    },

    //Prueba Id Empenho 63412 - 62034
    idCliente() {
      return this.$store.state.LlamadaEntrante.datosCliente.idCliente;
    }

  },
};