import Speech from "@/components/ContactCenter/Speech.vue";
import router from "@/router";
import CollectionWidget from "devextreme/ui/collection/ui.collection_widget.base";
import Swal from 'sweetalert2'
import moment from 'moment'

import {
  mapMutations
} from 'vuex';
import { triggerHandler } from "devextreme/events";

export default {
  components: {
    speech: Speech,
  },

  data: () => ({
    tableClass: "tableBoletasRetencion",
    ocultarboleta: true,
    column: null,
    boletasArriba: [],
    dialogInicio: false,
    btnDisable: false,
    busquedaBoletaRetencion: "",
    boletasRetencionBusqueda: [],
    boletasRetencionVisible: [],
    boletaPrincipal: [],
    dialog2: false,
    solicExoGR: false,
    aprobacion: false,
    diabled: false,
    loaderView: false,
    dialogCancelar: false,
    dialogSolicitud: false,
    ModalEliminar: false,
    dialogNotificacion: false,
    menuFecha: false,
    totalporBoleta: 0,
    totalGeneralBoleta: 0,
    menuFechaInicio: false,
    requiereNotificacion: null,
    checkbox: [],
    checkboxBool: [],
    numeroDePagos: 1,
    medioElegidoNotificacion: false,
    allCheck: false,
    dateFechaApagar: new Date().toISOString(),
    dateFecha: new Date().toISOString().substr(0, 10),
    diasEspera: '',
  //  fechaRemate: newBoleta.idEstadoEmpenho == 13 ? moment(newBoleta.fechaPasoRemate) : moment(newBoleta.fechaProximoRemate),
  //   fechaAPagar: moment(this.dateFechaApagar),
  //   diasEspera: fechaAPagar.diff(fechaRemate, 'day'),
    headers: [
      {
        text: "Boleta",
        value: "nroBoleta",
        class: "white--text caption header rounded-l-lg",
        sortable: false,
      },
      {
        text: "Articulo",
        value: "articulocategoria",
        class: "white--text caption header",
        sortable: false,
      },
      {
        text: "Interes Mensual",
        value: "pagoMinimo",
        class: "white--text caption header",
        sortable: false,
      },
      {
        text: "Gasto de Remate",
        value: "gastoRemate",
        class: "white--text caption header",
        sortable: false,
      },
      {
        text: "Meses a Pagar",
        value: "cantidadPagos",
        class: "white--text caption header",
        sortable: false,
      },
      {
        text: "UltimaEx.",
        value: "cantidadPagos",
        class: "white--text caption header"
      },
      {
        text: "Cantidad de Pagos",
        value: "CantidadPagos",
        class: "white--text caption header",
        sortable: false,
      },
      {
        text: "Atraso",
        value: "atrasopago",
        class: "white--text caption header",
        sortable: false,
      },
      {
        text: "Fecha de Remate",

        class: "white--text caption header",
        sortable: false,
      },
      {
        text: "¿Existe?",
        value: "aprobacion",
        class: "white--text caption header",
        sortable: false,
      },
      {
        text: "Total a pagar GR",
        value: "totalconnExoneracion",
        class: "white--text caption header",
        sortable: false,
      },
      {
        text: "Solicitud de Ex.",
        value: "solicitudDeEx",
        class: "white--text caption header",
        sortable: false,
      },
      {
        text: "Total con exoneracion GR",
        value: "totalConExoneracion",
        class: "white--text caption header",
        sortable: false,
      },
      {
        text: "Aprobacion",
        value: "aprobacion",
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
    datosBoletasRetencion: [],
    boletasRojas: [],
    filter: [],
    BizagiTiken: "",
    motivoRetencion: "",
    IdUsuarioSolic: "",
    IdCliente: "",
    NombreUsuario: "",
    TokenBizagi: "",
    bizagiParameters: {
      startParameters: []
    },
  BoletasBizagi: []
  }),
  methods: {
    ...mapMutations("LlamadaEntrante", ["updateBoletasRetencion"]),
    async getBoletas() {
      let token = localStorage.getItem("user-token");
      var boletas = []
      this.loaderView = true
      if (this.idCliente) {
        await axios
          .get("/api/BoletaActiva/" + this.idCliente, {
            headers: {
              Authorization: `Bearer ${token}`
            },
          })
          .then((response) => (boletas = response.data))
          .catch((err) => {
            console.warn(err.response.data.error);
          });

        //Elimino las boletas ya seleccionadas anteriormente

        this.boletaPrincipal = boletas

        var boletasRet = this.$store.state.LlamadaEntrante.boletasRetencion;
        for (var i = 0; i < boletas.length; i++) {
          var igual = false;
          for (var j = 0; j < boletasRet.length & !igual; j++) {
            if (boletas[i]['idEmpenho'] == boletasRet[j]['idEmpenho'])
              igual = true;
          }
          //if (!igual) this.datosBoletasRetencion.push(boletas[i]);
        }
        this.loaderView = false;
        this.actualizarBoleta();
      }
    },

    async addBizagiBoletas(){
      let datos = 'grant_type=client_credentials&scope=api'
      await axios ({
        method: "post",
        url:  'http://192.168.11.141/BPM_DEV/oauth2/server/token',
        data: datos,
        headers: {
          'Authorization': 'Basic Nzc5ZGUwY2I1ZTM1NzIwNTVhN2YwYmZmNjM3NTU1YzliZGI5ZjY3NTpmYjliZDZmY2Q0ZDcyMWFkMWNjMThmNjQ5ZGMyNDNmYjJjZTM2Mzkx',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      })
      .then((response) => {
        this.bizagiParameters.startParameters = []
        this.bizagiParameters.startParameters.push(

            {
              xpath:"LP_Retencion.FechaAPagar",
              value: this.dateFechaApagar
            },

            {
              xpath: "LP_Retencion.MotivoSolicitud",
              value: this.motivoRetencion
            },
            {
              xpath: "LP_Retencion.IdSolicitante",
              value: this.IdUsuarioSolic
            },

            {
              xpath: "LP_Retencion.NombreCreador",
              value: this.NombreUsuario
            },
            {
              xpath:"LP_Retencion.IdCliente",
              value: this.IdCliente
            },
            {
              xpath: "LP_Retencion.CedulaCliente",
              value: this.$store.state.LlamadaEntrante.datosCliente.cedula
            },
            {
              xpath: "LP_Retencion.NombreCliente",
              value: this.NombreCliente
            },
            {
              xpath:"LP_Retencion.LP_RetencionBoletas",

              type:"collection",

              rows:[]

            },
        )
        this.bizagiTockent = response.data.access_token;
      })
      .catch((error) => {
        this.$store.commit("snackbar/mostrarMensaje", {
          mensaje: error.response.data.error,
          color: "error",
        });
      });

      this.BizagiBoletas = [];

      for (var i = 0; i < this.boletasTabla.length; i++) {
        let aprobado = false;
            if (this.boletasTabla[i].aprobacionobs === "Aprobado"){
              aprobado = true
            }

         this.BizagiBoletas.push(
          {
            columns:[
              {
                xpath:"IdEmpeho",
                value: this.boletasTabla[i].idEmpenho
              },
              {
                xpath: "NroBoleta",
                value: this.boletasTabla[i].nroBoleta
              },
              {
                xpath: "sucursal",
                value: this.boletasTabla[i].localComercial
              },
              {
                xpath: "Existe",
                value: this.boletasTabla[i].existe
              },
              {
                xpath: "ExoGR",
                value: this.boletasTabla[i].solicExoGR
              },
              {
                xpath: "Aprobado",
                value: aprobado
              },
              {
                xpath: "FechaPasoRemate",
                value: this.boletasTabla[i].fechaProximoRemate
              },
              {
                xpath: "DiasEspera",
                value: this.diasEspera
              }
            ]
          }
        );

      }

      //Agrega Fecha a pagar
      this.bizagiParameters.startParameters[0].dateFechaApagar = this.dateFecha;
      this.bizagiParameters.startParameters[7].rows = this.BizagiBoletas;
      // console.log("Boletastabla",this.boletasTabla)
      // console.log(JSON.stringify(this.bizagiParameters))
      // console.log(JSON.stringify(this.BizagiBoletas))
      await axios({
        method: "post",
        url:  'http://192.168.11.141/BPM_DEV/odata/data/processes(2d0855c6-0d8d-48d8-a8a8-cfe5c902001b)/start',
        data: JSON.stringify(this.bizagiParameters),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.bizagiTockent}`
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        this.$store.commit("snackbar/mostrarMensaje", {
          mensaje: error.response.data.error,
          color: "error",
        });
        // this.CancelarRetencion();
        this.SolicitudGenerada();
      });
      this.actualizarBoleta();
    },

   

      actualizarBoleta(){
      
        this.datosBoletasRetencion= []
        this.boletasTabla = []


        var fechaActual = new Date();

        if(this.dateFechaApagar < (fechaActual.toISOString().split('T')[0])){
          this.dateFechaApagar = (fechaActual.toISOString().split('T')[0]);
        }

        this.boletaPrincipal.forEach(boleta => {

          var newBoleta = boleta;

          if(boleta.filtroEstado === 1){

            let fechaRemate = newBoleta.idEstadoEmpenho == 13 ? moment(newBoleta.fechaPasoRemate).toString() : moment(newBoleta.fechaProximoRemate).toString()
            let fechaAPagar = moment(this.dateFechaApagar);
            this.diasEspera = fechaAPagar.diff(fechaRemate, 'day');

            console.log("DiasEspera: " + this.diasEspera.toString());
            console.log("Pagos: " + newBoleta.cantidadPagos.toString());
            console.log("ExoGrAprobada :" + newBoleta.exoGRAprobada.toString());

            if (boleta.solicExoGR === true) {
              console.log("solicExoGR: " + boleta.solicExoGR.toString());
            } else {
              console.log("solicExoGR:  Es distinto a true");
            }
            //condiciones para la aprobacion automatica
            // si dias de espera sea menor o igual 7 dias y la cantidad de pagos 
            // sea mayor o igual a 3 y si ultima aprobacion esta en true manda aprobado
            if (boleta.solicExoGR === true) {
              if (this.diasEspera <= 7 && newBoleta.cantidadPagos >= 3 && newBoleta.exoGRAprobada === true) {
                boleta.aprobacionobs = "Aprobado"
              } else {
                boleta.aprobacionobs = "Necesita Aprobación"
              }
            } else {
              newBoleta.aprobacionobs = this.diasEspera <= 14 ? "Aprobado" : "Necesita Aprobación";
            }
            // newBoleta.existe = false;
            this.boletasTabla.push(newBoleta)
          }
          else if(boleta.filtroEstado === 0){
            this.datosBoletasRetencion.push(boleta)
          }
        });

        let count = 0
        let countboletasRojas = 0
          this.boletaPrincipal.forEach(boleta => {
            if(boleta.idEstadoEmpenho === 13 && boleta.filtroEstado === 1){
                if(boleta.existe === true)
                {
                  count++
                }
                countboletasRojas++
            }
          })
            if(count === countboletasRojas){
              this.btnDisable = false;
            }
            else {
              this.btnDisable = true;
            }
      },

      SolicitudGenerada()
      {
  
        var necesitaAprobacion = false;
        
        this.boletasTabla.forEach(boleta => {
            if(boleta.aprobacionobs === "Necesita Aprobación"){
              necesitaAprobacion = true
              console.log(necesitaAprobacion)
            }
        })
  
        if(necesitaAprobacion === true ){
          Swal.fire({
            text: "Existen Boletas que necesitan aprobacion",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            // confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              this.addBizagiBoletas();         
              Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Solicitud generada correctamente',
                showConfirmButton: false,
                timer: 1500
              })              
            }
          })
        }
        else{
          this.addBizagiBoletas()
          Swal.fire('Solicitud generada correctamente');     
        }
        
        // this.CancelarRetencion();
        //prueba para vaciar la tabla 
      },
    /* Funcion para seleccionar todos los inputs de tipo checkbox */
    selectAllCheckbox() {
      //if si alguno no está tildado entonces todo true si no todo false
      this.boletaPrincipal.forEach( boleta => {
        if (boleta.filtroEstado === 1 ) {
          boleta.solicExoGR = !this.allCheck;
          this.btnDisable = true;
        }
      })
      this.actualizarBoleta()
    },
    //funcion para chekear el checkbox de forma independiente
    selectIndividual(idempenho) {
      //console.log("Check individual");
      this.boletaPrincipal.forEach(boleta => {
        if (boleta.idEmpenho === idempenho) {
          boleta.solicExoGR = !boleta.solicExoGR
        }
      })
      this.actualizarBoleta()
    },
    /*existe declaro con un valor null y recorro el array para saber el valor de cada input cuando
    se marque todo se habilita el boton de generar solicitud*/
    checkExiste(idEmpenho) {
      this.boletaPrincipal.forEach(boleta => {
        if (boleta.idEmpenho === idEmpenho && boleta.filtroEstado === 1) {
          boleta.existe =! boleta.existe;
        }
      })
      this.actualizarBoleta()
      // this.habilitar()
    },

    habilitar() {

    },
    //calculo de total a pagar con exoneracion GR
    totalconExoneracionGR(idempenho) {
      let total = 0
      this.boletaPrincipal.forEach(boleta => {
        if (boleta.solicExoGR === true) {
          if (boleta.idEmpenho === idempenho) {
            total = boleta.pagoMinimo * boleta.mesesApagar;
          }
        };
      });
      return total;
    },
    // calculo de total a pagar con gasto de remate
    totalApagarGR(idempenho) {
      let totalApagar = 0
      this.boletasTabla.forEach(boleta => {
        if (boleta.solicExoGR !== true) {
          if (boleta.idEmpenho == idempenho) {
            totalApagar = boleta.mesesApagar * boleta.pagoMinimo + boleta.todoGastoRemate;
          }
        }
      })
      return totalApagar;
    },

     agregarBoletaSeleccionada( nroBoleta) {
      let boletasAbajo = this.boletaPrincipal.findIndex(boletasA => boletasA.nroBoleta === nroBoleta)
      this.boletaPrincipal[boletasAbajo].filtroEstado = 1;
      // console.log("boletasArriba",boletasAbajo)
      this.actualizarBoleta();
    },
    quitarBoletaTabla(idEmpenho) {
        let index = this.boletaPrincipal.findIndex(boleta => boleta.idEmpenho === idEmpenho)
        this.boletaPrincipal[index].filtroEstado = 0;
        this.actualizarBoleta();
        this.habilitar();
    },

    CancelarRetencion(){
    this.boletaPrincipal.forEach(boleta => {
      boleta.filtroEstado = 0
    })
    this.actualizarBoleta();
      this.dialogCancelar = false;
    },

    seleccionarTodo() {
        this.boletaPrincipal.forEach(boleta => {
          boleta.filtroEstado = 1;
        })
        this.actualizarBoleta();
    },

    confirmarRetencion() {
      this.dialog2 = false;
    },

    buscarBoleta() {
      this.boletaPrincipal.forEach(boleta =>{
        if(boleta.filtroEstado != 1){
          if(boleta.nroBoleta.toString().includes(this.busquedaBoletaRetencion)) {
            boleta.filtroEstado = 0
          }
          else{
            boleta.filtroEstado = 2
          }
        }
      })
      this.actualizarBoleta();
    },
    async insertarCabecera()
    {
      let token = localStorage.getItem("user-token");
          let datos = {
              idUsuarioSolicitud: this.$store.state.LoginStore.IdUsuario,
              fechaRetencionSolicitud: this.dateFecha,
              obsSolicitud: this.motivoRetencion,
      };

      await axios({
          method: "post",
          url: "/api/Retencion",
          data: datos,
          headers: {
            Authorization: `Bearer ${token}`
          },
        })
        .then((response) => {
          this.$store.state.LlamadaEntrante.datosRetencion.idSolicitud = response.data;
          this.$store.state.LlamadaEntrante.datosRetencion.observacion = this.motivoRetencion;
          this.$store.state.LlamadaEntrante.datosRetencion.fechaSolicitud = this.dateFecha;

          this.insertarDetalle();
        })
        .catch((error) => {
          this.$store.commit("snackbar/mostrarMensaje", {
            mensaje: error.response.data.error,
            color: "error",
          });
        });
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-center',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'success',
        title: 'Solicitud generada correctamente..'
      })
    },
    cerrarModal() {
      this.dialogInicio = false;
    },
    insertarDetalle() {
      // console.log(this.boletasTabla)
      this.boletasTabla.forEach(async boleta => {
        console.log('boleta', boleta)
        let token = localStorage.getItem("user-token")
        let dato = {
          idRetencionBoletaCab: this.$store.state.LlamadaEntrante.datosRetencion.idSolicitud,
          idEmpenho: boleta.idEmpenho,
          MesesApagar: boleta.mesesApagar,
          Existe: boleta.existe,
          SolicExoGR: boleta.solicExoGR,
          Aprobacion: boleta.aprobacion, //boleta.aprobacion,
          AprobacionObs: boleta.aprobacionobs //this.boletasTabla.AprobacionObs
        };

        await axios({
          method: "post",
          url: "/api/Retencion/InsertarDetalle",
          data: dato,
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          console.log("Éxito: ", response);
        }).catch((error) => {
          console.log("ERROR!!! ", error);
          this.$store.commit("snackbar/mostrarMensaje", {
            mensaje: error.response.data.error,
            color: "error"
          });
        });
      })
    },
  },

  mounted() {

    this.getBoletas();
    if(this.idCliente === ""){
      this.$router.push('validacion');
    }

    //le asigno los datos de la fecha a dateFechaApagar para no usar this.$store.state.LlamadaEntrante.datosRetencion.fechaSolicitud
    this.IdCliente = this.$store.state.LlamadaEntrante.datosCliente.idCliente;
    console.log(this.IdCliente)
    this.dateFechaApagar = this.$store.state.LlamadaEntrante.datosRetencion.fechaSolicitud;
    //this.bizagiParameters.startParameters[0].value =  this.dateFechaApagar;
    this.NombreUsuario = this.$store.state.LoginStore.Nombres;
    this.NombreCliente = this.$store.state.LlamadaEntrante.datosCliente.nombre +" "+ this.$store.state.LlamadaEntrante.datosCliente.apellido
    //console.log("Nombre del Cliente",this.$store.state.LlamadaEntrante.datosCliente.nombre +" "+ this.$store.state.LlamadaEntrante.datosCliente.apellido);
    this.motivoRetencion = this.$store.state.LlamadaEntrante.datosRetencion.observacion;
    this.IdUsuarioSolic = this.$store.state.LoginStore.IdUsuario;

    if (this.$store.state.LlamadaEntrante.datosRetencion.idSolicitud == null) this.dialogInicio = true;
    return this.$store.state.LlamadaEntrante.datosCliente.idCliente
  },
  watch: {
    //propiedad observada para que se vaya actualizando de acuerdo a la funcion
    busquedaBoletaRetencion() {
    this.buscarBoleta()
  },
  },
  computed: {
    tableBoletas() {
      return this.tableClass;
    },
    //suma total de todas las las boleta que se van agregando
    sumaTotal() {
      this.totalGeneralBoleta = 0;
      this.totalporBoleta = 0;
      for (var i = 0; i < this.boletasTabla.length; i++) {
        this.totalporBoleta =
          this.totalconExoneracionGR(this.boletasTabla[i].idEmpenho) +
          this.totalApagarGR(this.boletasTabla[i].idEmpenho);
        this.totalGeneralBoleta += this.totalporBoleta;
      }
      return this.totalGeneralBoleta;
    },
    boletasRetencion() {
      return this.datosBoletasRetencion.sort(function (a, b) {
        if (a.idEstadoEmpenho > b.idEstadoEmpenho) return 1;
        if (a.idEstadoEmpenho < b.idEstadoEmpenho) return -1;
        if ((a.idEstadoEmpenho = b.idEstadoEmpenho)) return 0;
      }) /*.filter(x => x.aRematar == 1)*/ ;
    },
    idCliente() {
      return this.$store.state.LlamadaEntrante.datosCliente.idCliente;
    },
  }
}