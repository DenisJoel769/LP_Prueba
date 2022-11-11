<template>
<div class="sucursal">
  <div class="container">
    <!-- Popup de inicio -->
    <v-dialog v-model="dialogInicio" persistent width="500">
      <v-card class="rounded-xl">
        <v-card-text>
          <!-- <v-row class="justify-center">
            <speech class="mt-2" titulo="Fecha de Retención" width="450px" texto="¿Me puede indicar hasta qué fecha estaría
                necesitando el tiempo de espera?"></speech>
          </v-row> -->

          <div class="d-block tituloRetencion font-weight-bold text-center margin-top: 3px" >
            Agregar Fecha de Retención
          </div>

          <v-row class="d-flex justify-center">
            <v-menu ref="menuFecha" v-model="menuFechaInicio" :close-on-content-click="false"
              transition="scale-transition" offset-y max-width="290px" min-width="290px">
              <template v-slot:activator="{ on, attrs }">
                <v-chip class="font-weight-bold mt-1 rounded-lg" text-color="#063690" v-bind="attrs" v-on="on" label
                  outlined color="#063690">
                  {{ dateFecha.split("-").reverse().join("/") }}
                </v-chip>
              </template>
              <v-date-picker v-model="dateFecha" no-title @input="menuFechaInicio = false"></v-date-picker>
            </v-menu>
          </v-row> 
          <br>     
       <!-- <v-row class="d-flex justify-center">
            <speech titulo="Motivo de la Retención" width="450px" texto="¿Cual sería el motivo señor Alexis por eso
          necesita ese tiempo de espera?"></speech>
          </v-row>

          <div class="font-weight-bold" style="color: #063690">
            Motivo de la Retención
          </div> -->
          <v-row justify="center">
            <v-textarea v-model="motivoRetencion" class="textMotivoRetencion rounded-lg" no-resize rows="5" outlined
              placeholder="Agregar el motivo de la retencion"></v-textarea>
          </v-row>
     
        </v-card-text>

        <v-card-actions class="mt-n8">
          <v-row class="justify-center d-flex">
            <v-btn @click="cerrarModal"  fab dark elevation="2" color="#1b7700">
              <v-icon dark>fa-check</v-icon>
            </v-btn>
          </v-row>

          <v-btn @click="CancelarRetencion" fab dark x-small elevation="2" color="#dc0000">
            <v-icon>fa-times</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row>
      <v-card class="mb-n1" width="400" height="50" color="#063690">
        <v-card-text>
          <v-row>
            <div class="mt-n1" style="font-size: 12px; color: white; width: 100px">
              Fecha a Pagar
            </div>

            <v-menu ref="menuFecha" v-model="menuFecha" :close-on-content-click="false" transition="scale-transition"
              offset-y max-width="290px" min-width="290px">
              <template v-slot:activator="{ on, attrs }">
                <v-chip class="mt-n1" color="white" text-color="#0449cb" v-bind="attrs" v-on="on" label small>
                  {{
                   dateFechaApagar
                      .split("-")
                      .reverse()
                      .join("/")
                  }}
                  <v-icon right small>fa-calendar-check</v-icon>
                </v-chip>
              </template>
                <v-date-picker v-model="dateFechaApagar" no-title @input="menuFecha = false" @change="actualizarBoleta()" >
              </v-date-picker>
            </v-menu>
            <!--             <div class="mt-n1 ml-4" style="font-size: 12px; color: white; width: 100px">
              Días de Espera
            </div>

            <v-chip class="mt-n1" color="white" text-color="#0449cb" label small>
              {{ diasEspera }}
              días
            </v-chip> -->
          </v-row>
        </v-card-text>
      </v-card>
      <!-- checkbox para seleccionar todo -->
      <v-row class="justify-end mt-5">
        <!-- <v-btn class="btncheckbox " color="bg-light"   @click="selectAllCheckbox">
          <v-icon  color="primary">fa fa-check</v-icon> -->
          <input type="checkbox" class="btncheckbox" @click="selectAllCheckbox" v-model="allCheck">      
      </v-row>

    </v-row>

    <!-- Tabla de datos -->
    <v-row class="justify-center mt-3" style="height: 350px">
      <v-data-table height="340" fixed-header :headers="headers" :items="boletasTabla"  :class="tableClass"
        hide-default-footer :items-per-page="-1" style="background: transparent; width: 100% ">

        <template v-slot:item="props">
        <div class="text-center">
        </div>
          <tr class="espacioTablaRetencion"></tr>
          <!--  props.item.retencionAprobada == true -->
          <!-- insertar dentro de la tabla con el mismo color seleccionado las boletas que van a pasar a remate y 
             los que ya estan a remate-->
          <tr :class="
                props.item.aRematar
                 ? 'styleBoletasAprobadas tableBoletasRowHoverOff'                             
                 : 'styleBoletasNoAprobadas tableBoletasRowHoverOff' 
            ">
            <td class="rounded-l-lg">{{ props.item.nroBoleta }}</td>
            <td>{{ props.item.articuloCategoria }}</td>
            <td width="100">
              {{
                new Intl.NumberFormat("es-PY", {
                  maximumFractionDigits: 0,
                }).format(props.item.pagoMinimo)
              }}
              G.
            </td>
            <td>
              {{
                new Intl.NumberFormat("es-PY", {
                  maximumFractionDigits: 0,
                }).format(props.item.todoGastoRemate) 
              }}
              G.
            </td>

            <td>
              <v-text-field v-model="props.item.mesesApagar" hide-details single-line min="1" type="number"
                class="form-control"/>
            </td>
               <td>
              {{props.item.fechaUltExoneracion === null ? "No cuenta con exoneracion": new Date(props.item.fechaUltExoneracion).toLocaleString() }}
            </td>
           
              <!-- <td>
                {{props.item.exoGRAprobada === true ? "1": "0"}}
              </td> -->
              <td>{{props.item.mesesPagados}}</td>
            <td widht="15">
              {{ props.item.atraso }}
            </td>
            <td>
              <div>
                {{props.item.idEstadoEmpenho === 13 ? new Date(props.item.fechaPasoRemate).toISOString().substr(0,10): new Date(props.item.fechaProximoRemate).toISOString().substr(0,10) }}
              </div>
            </td>
            <td>
                <div class="custom-control custom-checkbox bg-success mt-1 ml-3 " v-if="props.item.idEstadoEmpenho === 13">
                <input type="checkbox"  class="checkbox" color="warning"
                  @click="checkExiste(props.item.idEmpenho)" :checked="props.item.existe"
                  :id="props.item.idEmpenho"> 
              </div>  
              <div v-if="props.item.aRematar === true">
                <v-icon dark class="checkedVerde ml-5 " style="height: 5px; width: 5px; top-1" 
                >fa-check</v-icon>
              </div>          
            </td>
            <td>
              {{
                new Intl.NumberFormat("es-PY", {
                  maximumFractionDigits: 0,
                }).format(totalApagarGR(props.item.idEmpenho))
              }}
              G.
            </td>
            <td>
              <div class="custom-control custom-checkbox bg-success mt-1 ml-3 ">
                <input type="checkbox" class="checkbox-control"
                 @click="selectIndividual(props.item.idEmpenho)" :checked="props.item.solicExoGR"
                  :id="props.item.idEmpenho">
              </div>

            </td>

            <td>
              {{
                new Intl.NumberFormat("es-PY", {
                  maximumFractionDigits: 0,
                }).format(totalconExoneracionGR(props.item.idEmpenho))
              }}
            </td>

            <td >
                 {{
                    props.item.aprobacionobs
                 }}           
            </td>  
            <td class="rounded-r-lg">
              <v-icon @click="quitarBoletaTabla(props.item.idEmpenho, props.item)">mdi-delete</v-icon>
            </td>            
          </tr>
        </template>
      </v-data-table>
<v-row  justify="end"> 
</v-row>
  <v-row justify="end"  class="mt-15" align="center">

        <v-btn small color="primary" class="text-none mr-15" @click="seleccionarTodo">
          Seleccionar todo</v-btn>

        <v-btn small color="error" class="text-none ms-2 mr-7" @click="dialogCancelar = true">Cancelar</v-btn>

           <v-btn color="success" small class="text-none ma-2 mr-5" :disabled="btnDisable === true"
         @click="SolicitudGenerada()"> 
        Generar Solicitud</v-btn>
        <v-card class="pago" elevation="0">
<!--        
             <v-chip style="width:120px" class="caption ms-0 ml-2 text-center" color="primary" label> -->
          <v-chip class="pagoTotal ms-0 ml-2 text-center" color="primary" label>
            <b> Total a pagar</b>
          </v-chip>
          <v-chip class="ml-n1 caption  font-weight-bold margin-right: 22px" color="primary" label outlined>
             <div class="pagoTotal" color="#006064">
                    {{
                          new Intl.NumberFormat("es-PY", {
                            maximumFractionDigits: 0,
                          }).format(sumaTotal)                                      
                    }} G   
            </div> </v-chip>
        </v-card>
  </v-row> 
    </v-row>
 
    <!--sistema de busqueda -->
    <v-row class="mb-n5 mt-15">
      <v-col offset-md="1" md="3">
        <v-text-field aria-autocomplete="off" v-model="busquedaBoletaRetencion" label="Buscar Boleta"
          append-outer-icon="fa-search" color="#063690" caption="aption buscadorBoletas" styles="font-size: 12px">
        </v-text-field>
      </v-col>
    </v-row>

    <!-- lista de boletas que ya estan y van a salir a remate -->
    <v-sheet color="transparent">
      <v-slide-group class="iconSlideBoleta" prev-icon="fa-caret-left" next-icon="fa-caret-right" show-arrows="always">
        <v-slide-item v-for="(boleta) in boletasRetencion" :key="boleta.idEmpenho">
          <v-card elevation="0" class="ml-10 iconCardBoleta rounded-lg" width="100" height="100"
            :color="boleta.aRematar ? '#5FA21D':'rgb(240, 37, 37)'">
            <!-- <div class=" BoletaRemate" v-if="boleta.aRematar == false">
                        A remate   
                    </div> -->
            <v-card-text styles="height: 90px">
              <v-row>
                <div class="mt-n2 ml-1">
                  <div class="nroBoleta">{{ boleta.nroBoleta }}</div>
                </div>
                <div class="mt-n4 ml-2">
                  <v-icon size="25" @click="agregarBoletaSeleccionada(  boleta.nroBoleta)">
                    mdi-checkbox-blank-outline
                  </v-icon>
                </div>
              </v-row>
              <div v-for="articulo in boleta.articuloCategoria.split(';')" :key="articulo.idArticulo">
                <v-row>
                  <div class="ml-1 textCardBoletaRetenida d-inline">
                    {{ articulo.split(";")[0].substr(0, 10) }}
                  </div>
                </v-row>
              </div>

              <div class="ml-n2 textCardBoletaRetenida">
                V:.
                {{ new Date(boleta.fechaVencimiento).toLocaleDateString("es-py") }}
              </div>
              <div class="ml-n2 textCardFechaRemate" v-if="boleta.aRematar == false">
                F.R:
                {{ new Date(boleta.fechaPasoRemate).toLocaleDateString("es-py") }}
              </div>
            </v-card-text>
          </v-card>
        </v-slide-item>
      </v-slide-group>
      <!-- spiner para que se muestre mientras se actualiza las boletas seleccionadas abajo -->
      <div class="text-center mb-5 mt-2" v-show="loaderView">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div>
    </v-sheet>
    <v-row class="ml-12">
      <div class="ml-12 font-weight-bold caption" styles="color: #063690">
        <!-- Se muestran sólo boletas que podrían pasar a la venta en el siguiente remate. -->
      </div>
    </v-row>

    <!-- prueba dialog -->
    <v-dialog v-model="dialog2" persistent widht="700"></v-dialog>

    <!-- Dialog de detalles de la retencion -->
    <v-dialog v-model="dialog2" persistent width="700">
      <v-card class="rounded-xl overflow-x-auto" elevation="0">
        <v-card-title class="font-weight-bold" styles="color: #7494eb; font-size: 14px"><b>Resumen de Retención</b>
        </v-card-title>
        <v-card-text>
          <v-row no-gutters align="center" justify="center">
            <v-col md="7">
              <v-row justify="center" class="ml-n6">
                <v-card max-height="150" elevation="0">
                  <v-card-text>
                    <v-row class="ml-n7" justify="center">
                      <v-chip styles="width: 100px" class="caption" text-color="primary" color="transparent" label small
                        outlined>
                        <b> Nº Boleta:</b>
                      </v-chip>

                      <v-chip styles="width: 100px" class="caption mx-2" color="primary" label small>
                        <b>R. Aprobada</b>
                      </v-chip>

                      <v-chip styles="width: 100px" class="caption" color="#7494eb" label small text-color="white">
                        <b>Ex. de Gastos</b>
                      </v-chip>
                    </v-row>

                    <v-card elevation="0" height="150" class="overflow-y-auto" color="transparent">
                      <v-card-text>
                        <div v-for="bolet in boletasTabla" :key="bolet.nroBoleta">
                          <v-row justify="center" class="mt-1">
                            <v-chip styles="width: 100px" class="caption" text-color="primary" color="transparent" label
                              small outlined>
                              <div>{{bolet.nroBoleta}} </div>
                            </v-chip>
                            <v-chip styles="width: 100px" class="caption mx-2" color="transparent" label small
                              text-color="white">
                              <!-- <v-chip style="width: 70px" class="caption mx-2 d-flex justify-center"
                                label small outlined>
                                <v-icon v-if="bolet % 2 != 0" color="success">mdi-check</v-icon>
                                <v-icon v-if="bolet % 2 == 0">mdi-close</v-icon>               
                              </v-chip> -->
                              <v-checkbox styles="width: 70px" name="checkbox1" color="success">
                              </v-checkbox>
                            </v-chip>
                            <v-chip styles="width: 100px" class="caption" color="transparent" label small
                              text-color="white">
                              <v-checkbox styles="width: 70px" name="checkbox2" color="red" value="red"></v-checkbox>
                            </v-chip>
                          </v-row>
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-card-text>
                </v-card>
              </v-row>
            </v-col>

            <v-col md="5">
              <v-row>
                <v-card styles="background: transparent" elevation="0">
                  <v-chip styles="width: 180px" class="caption ml-2 mt-2" color="error" label small>
                    Total a pagar sin aprobar
                  </v-chip>
                  <v-chip class="ml-n1 caption font-weight-bold mt-2" color="error" label outlined small>
                    9.999.000 G.
                  </v-chip>
                </v-card>
              </v-row>

              <v-row>
                <v-card styles="background: transparent" elevation="0">
                  <v-chip styles="width: 180px"  class="caption ml-2 mt-2" color="success" label small>
                    Total a pagar aprobado
                  </v-chip>
                  <v-chip class="ml-n1 caption font-weight-bold mt-2" color="success" label outlined small>
                    9.999.000 G.
                  </v-chip>
                </v-card>
              </v-row>
            </v-col>
          </v-row>
          <v-row justify="center" class="mt-8">
            <speech class="mt-2" titulo="Confirmación de solicitud" width="600px" texto="Le comento que todas las solicitudes para retención y exoneración
          de gastos van a ser procesadas y haremos el esfuerzo por aprobarlas.

          Esto llevaría un poco de tiempo y de ser aprobadas en su totalidad
          le estaríamos notificando. De no ser así nosotros nos volveremos
          a comunicar con usted para poder darle otras soluciones."></speech>
          </v-row>
        </v-card-text>

        <br />
        <v-card-actions class="mt-n8">
          <v-row no-gutters class="justify-center d-flex">
            <v-btn @click="confirmarRetencion" fab dark elevation="2" color="#1b7700">
              <v-icon dark>fa-check</v-icon>
            </v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog de Cancelar Solicitud de Retencion -->
    <v-dialog v-model="dialogCancelar" width="450">
      <v-card class="rounded-xl">
        <br />
        <v-card-text>
          <div class="cancelarSolic" >
            ¿Estas seguro que deseas cancelar la Solicitud de Retención?
          </div>
        </v-card-text>

        <v-card-actions>
          <v-row no-gutters justify="center">
            <v-btn fab dark elevation="2" small color="#1b7700" @click="CancelarRetencion">

              <v-icon dark @click="CancelarRetencion">fa-check</v-icon>
            </v-btn>
            <v-btn fab dark elevation="2" small color="#dc0000" class="ml-6" @click="dialogCancelar = false">
              <v-icon dark>fa-times</v-icon>
            </v-btn>
          </v-row>
        </v-card-actions>
        <br />
        <router-view></router-view>
      </v-card>
    </v-dialog>

    <!-- Dialog de Notificacion -->
    <v-dialog v-model="dialogNotificacion" width="600">
      <v-card class="rounded-xl">
        <v-card-text>
          <br />
          <v-row class="justify-center">
            <speech class="mt-2" titulo="Recepción de notificación" width="300px"
              texto="¿Cómo desea recibir la notificación?"></speech>
          </v-row>

          <v-row justify="center" class="mt-n3">
            <v-chip class="caption ml-2 mt-2" color="#7494eb" label small text-color="white">
              Vía Mensaje de Texto (SMS)
            </v-chip>

            <v-chip class="caption ml-2 mt-2" color="#7494eb" label small text-color="white">
              Vía llamada Telefónica
            </v-chip>
          </v-row>

          <v-row class="justify-center mt-5">
            <speech class="mt-2" titulo="Número de Recepción" width="450px"
              texto="¿A qué número de teléfono desea recibir la notificación?"></speech>
          </v-row>

          <div class="d-block font-weight-bold text-center" styles="color: #7494eb; font-size: 20px">
            Agregar número de teléfono
          </div>
          <v-row class="d-flex justify-center mt-4">
            <v-text-field autocomplete="off" height="12px" autofocus
              class="d-block rounded-xl numeroTelefonoNotificacion shrink" outlined></v-text-field>
          </v-row>
        </v-card-text>

        <v-card-actions class="mt-n8">
          <div class="ml-12">
            <v-btn outlined fab x-small color="#063690" @click="
                dialogNotificacion = false;
                dialog2 = true;
              ">
              <v-icon>fa-arrow-left</v-icon>
            </v-btn>
            <div class="ml-2 d-inline" styles="font-size: 14px; color: #7494eb">Atrás</div>
          </div>

          <v-row no-gutters>
            <v-btn styles="margin-left: 150px" fab dark elevation="2" small color="#1b7700"
              @click="dialogNotificacion = false">
              <v-icon dark>fa-check</v-icon>
            </v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</div>
</template>
<script src="http://momentjs.com/downloads/moment.min.js"></script>
<script src="./Retencion1.js"></script>

<style lang="scss">
  $text-color-titulo: #063690;
  $color-boletas-aprob: #5e9923;
  $color-boletas-Naprob: #ee2929;
  // $color-boletas-Naprob: #5FA21D;
  $color-text-aprob: #f7f9fc;
  $color-text-Naprob: #e2ecfa;

.sucursal{
  background: #5a82be;
  height: 100%;
}
  .pagoTotal{
    width: 115px;
    font-size: 16px;
  }
  .pagoAprobado{
    background: transparent;
    width: 180px;
  }
  .cancelarSolic{
    font-size: 20px;
    color: #7494eb
  }
  .checkedVerde{
    height: 5px;
    width: 5px;
    justify-content: center;
  }
  .tituloRetencion {
    font-size: 16px;
    color: $text-color-titulo;
  }

  .custom-control-label::before,
  .custom-control-label::after {
    top: .8rem;
    width: 1.25rem;
    height: 1.25rem;
    

  }
  .checkbox {    
    justify-content: center;
    height: 17px;
    width: 17px;

  }
  .checkbox-control{
    justify-content: center;
    height: 17px;
    width: 17px;
  }

  .btncheckbox {
    margin-right: 37%;
    border-radius: 10px;
    width: 15px;
    height: 15px;
    background-color: #f7f9fc;
  }
  // .btncheckbox:hover {
  //   background-color: #e6e339;
  // }

  .textMotivoRetencion.v-textarea.v-text-field--enclosed .v-text-field__slot textarea {
    color: #063690;
    line-height: 1;
  }

  .tableBoletasRetencion.v-data-table>.v-data-table__wrapper>table>tbody>tr>td {
    font-size: 0.8rem;
    height: 35px;
  }

  .tableBoletasRetencion.v-data-table>.v-data-table__wrapper>table>thead>tr>th {
    height: 25px;
    background: #063690;
  }

  .tableBoletasRetencion tr:not(.tableBoletasRowHoverOff) {
    background-color: transparent;
    transition: all 0.01s ease-in-out;
  }

  .styleBoletasAprobadas {
    background-color: $color-boletas-aprob !important;
    color: $color-text-aprob !important;
  }

  .styleBoletasNoAprobadas {
    background-color: $color-boletas-Naprob !important;
    color: $color-text-Naprob !important;
  }

  .textCardBoletaRetenida {
    font-family: Montserrat;
    font-size: 10px;
    font-weight: 500;
    text-align: left;
    line-height: 1.19;
    color: white;
  }

  .BoletaRemate {
    font-family: Montserrat;
    font-size: 10px;
    font-weight: 500;
    text-align: left;
    color: white;
    margin-top: 0;
    text-align: center;
    top: 7px;
  }

  .textCardFechaRemate {
    font-family: Monserrat;
    font-size: 11px;
    font-weight: 500;
    text-align: left;
    line-height: 1.19;
    color: white
  }

  .espacioTablaRetencion {
    height: 8px;
  }

  .numeroTelefonoNotificacion.theme--light.v-input input {
    color: #063690;
    font-size: 25px;
    font-weight: bold;
    line-height: 1.21;
    text-align: center;
  }
</style>