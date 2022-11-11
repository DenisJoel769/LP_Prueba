<!-- @format -->

<template>
  <div>
    <v-row>
      <v-col cols="3">
        <v-text-field
          label="ingrese tarea"
          v-model="nuevaTarea"
          hide-details="auto"
          @keyup.enter="add"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-card shaped elevation="10" color="#26c6da" dark>
          <v-card-title>Tareas</v-card-title>
          <draggable :list="arrTareas" group="tasks">
            <v-expansion-panels
              focusable
              :multiple="false"
              v-for="item in arrTareas"
              :key="item.id"
            >
              <v-expansion-panel>
                <v-expansion-panel-header>
                  {{ item.Tarea }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>{{
                  item.Descripcion
                }}</v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <v-divider color="primary"></v-divider>
          </draggable>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="progreso" shaped elevation="10" color="#039be5" dark>
          <v-card-title>Progreso</v-card-title>
          <draggable class="list-group-" :list="arrProgreso" group="tasks">
            <v-expansion-panels v-for="item in arrProgreso" :key="item.id">
              <v-expansion-panel>
                <v-expansion-panel-header>
                  {{ item.Tarea }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>{{
                  item.Descripcion
                }}</v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </draggable>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="Pruebas" shaped elevation="10" color="#ffca28" dark>
          <v-card-title>Pruebas</v-card-title>
          <draggable class="list-group-" :list="arrPrueba" group="tasks">
            <v-expansion-panels v-for="item in arrPrueba" :key="item.id">
              <v-expansion-panel>
                <v-expansion-panel-header>
                  {{ item.Tarea }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>{{
                  item.Descripcion
                }}</v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </draggable>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card class="publicado" shaped elevation="10" color="#43a047" dark>
          <v-card-title>Publicado</v-card-title>
          <draggable class="list-group-" :list="arrPublicado" group="tasks">
            <v-expansion-panels v-for="item in arrPublicado" :key="item.id">
              <v-expansion-panel>
                <v-expansion-panel-header>
                  {{ item.Tarea }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>{{
                  item.Descripcion
                }}</v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </draggable>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<style>
  .progreso {
    background: #039be5;
    color: white;
  }
  .prueba {
    background: #ffca28;
  }
  .publicado {
    background: #43a047;
    color: white;
  }
</style>
<script src="./TableroKanban.js"></script>
