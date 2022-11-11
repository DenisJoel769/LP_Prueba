<template>
  <div>
    <v-row justify="center">
      <v-data-table
        :items-per-page="5"
        :headers="headers"
        :items="perfiles"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                  small
                  >Nuevo</v-btn
                >
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedItem.perfil"
                          label="Perfil"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue" text @click="guardar">Guardar</v-btn>
                  <v-btn color="blue" text @click="cerrar">Cancelar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-row>
    <!-- <DxDataGrid :show-borders="true" :data-source="dataSource">
        <DxColumn width="200" data-field="perfil" caption="Perfil">
          <DxRequiredRule />
        </DxColumn>
        <DxEditing
          :allow-adding="true"
          :allow-updating="true"
          :allow-deleting="true"
          mode="popup"
        />
        <DxSearchPanel :visible="true" :highlight-case-sensitive="true" />
      </DxDataGrid> -->
  </div>
</template>

<script src="./Perfil.js"></script>

<style src="./Perfil.css"></style>
