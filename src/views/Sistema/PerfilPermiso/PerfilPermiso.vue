<template>
  <div>
    <v-select
      v-model="perfil"
      :items="perfiles"
      item-text="perfil"
      label="Seleccionar"
      item-value="idPerfil"
    ></v-select>
    <DxTreeList
      v-if="perfil != null"
      :data-source="listaPerfilPermiso"
      :column-auto-width="true"
      :show-row-lines="true"
      :show-borders="true"
      key-expr="idMenuVue"
      parent-id-expr="parentMenuId"
    >
      <DxColumn data-field="name" caption="Nombre"> </DxColumn>
      <DxColumn data-field="permiso" cell-template="cellTemplate"> </DxColumn>
      <template #cellTemplate="{ data }">
        <DxCheckBox
          @value-changed="procesarPermiso(data, $event.value)"
          :value="data.value"
        />
      </template>
    </DxTreeList>
  </div>
</template>

<script src="./PerfilPermiso.js"></script>

<style></style>
