<template>
  <div>
    <v-row class="mt-8 ml-n7" justify="center">
      <v-col md="5" sm="5" xs="12">
        <v-card height="55vh" width="75vh" class="rounded-t-xl rounded-b-xl">
          <v-subheader style="font-size: 20px" dark class="cardHeader"
            >Avisos</v-subheader
          >
          <v-list
            three-line
            max-height="46vh"
            class="overflow-y-auto"
            subheader
          >
            <v-list-item v-for="item in avisos" :key="item.id">
              <v-list-item-content
                class="mb-n5"
                @click="mostrarAviso(item)"
                style="cursor: pointer"
              >
                <!-- Si no se leyo es otro color -->
                <v-list-item-title
                  v-if="!item.leido"
                  class="avisoNoLeido font-weight-bold"
                  v-text="item.titulo"
                ></v-list-item-title>
                <v-list-item-subtitle
                  v-if="!item.leido"
                  style="color: #063690; font-size: 13px"
                  class="font-weight-light"
                  v-text="item.contenido"
                ></v-list-item-subtitle>
                <v-list-item-subtitle
                  v-if="!item.leido"
                  style="color: #063690; font-size: 12px"
                  class="font-weight-thin"
                  v-text="item.urlAviso"
                ></v-list-item-subtitle>

                <!-- Si se leyo  -->
                <v-list-item-title
                  v-if="item.leido"
                  class="avisoLeido font-weight-bold"
                  v-text="item.titulo"
                ></v-list-item-title>
                <v-list-item-subtitle
                  v-if="item.leido"
                  style="font-size: 13px"
                  class="font-weight-bold"
                  v-text="item.contenido"
                ></v-list-item-subtitle>
                <v-list-item-subtitle
                  v-if="item.leido"
                  style="font-size: 12px"
                  class="font-weight-thin"
                  v-text="item.urlAviso"
                ></v-list-item-subtitle>
                <!-- Divisoria de cada aviso -->
                <v-divider class="dividerAviso"></v-divider>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <aviso
            @clicked="guardarAvisoLeido"
            ref="refAviso"
            :aviso="aviso"
          ></aviso>
        </v-card>
      </v-col>
      <v-col md="3" sm="4" xs="12">
        <v-card height="27.5vh" width="45vh" class="rounded-t-xl">
          <v-subheader style="font-size: 16px" class="cardHeader" dark
            >Tareas Pendientes</v-subheader
          >
        </v-card>
        <v-card height="27.5vh" width="45vh" class="rounded-b-xl">
          <v-subheader style="font-size: 16px" class="cardHeader" dark
            >Indicadores</v-subheader
          >
        </v-card>
      </v-col>
      <v-col md="3" sm="3" xs="12">
        <v-card height="27.5vh" width="45vh"></v-card>
        <br /><br />
        <v-img src="@/assets/logo-laplata.png"></v-img>
      </v-col>
    </v-row>
  </div>
</template>

<script src="./Home.js"></script>

<style lang="scss">
$color-aviso-no-leido: #063690;
$color-aviso-leido: #5e5e5e;

.v-card > *:last-child:not(.v-btn):not(.v-chip) {
  border-bottom-left-radius: initial;
  border-bottom-right-radius: initial;
}

.avisoNoLeido {
  color: $color-aviso-no-leido;
}

.avisoLeido {
  color: $color-aviso-leido;
}

.dividerAviso.v-divider {
  border-color: #f9c701 !important;
}
</style>
