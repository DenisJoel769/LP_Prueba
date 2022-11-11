<template>
  <div>
    <DxTreeList
      :data-source="listaMenu"
      :column-auto-width="true"
      :show-row-lines="true"
      :show-borders="true"
      key-expr="idMenuVue"
      parent-id-expr="parentMenuId"
      :onRowInserting="insertar"
      :onRowUpdating="actualizar"
      :onRowRemoving="eliminar"
      @editor-preparing="onEditorPreparing"
      @init-new-row="onInitNewRow"
    >
      <DxEditing
        :allow-updating="true"
        :allow-deleting="true"
        :allow-adding="true"
        :use-icons="true"
        :popup="popupOptions"
        mode="popup"
      />
      <DxColumn data-field="name" caption="Nombre">
        <DxValidationRule type="required" />
      </DxColumn>
      <DxColumn data-field="menuDescripcion" caption="Descripcion"></DxColumn>
      <DxColumn data-field="path" caption="Path"></DxColumn>
      <DxColumn data-field="aparitionOrder" caption="Orden">
        <DxValidationRule type="required" />
      </DxColumn>
      <DxColumn data-field="icon" caption="Icono"></DxColumn>
      <DxColumn data-field="parentMenuId" :visible="false">
        <DxLookup
          :data-source="dsParentMenu"
          value-expr="idMenuVue"
          display-expr="menu"
        />
      </DxColumn>
      <DxColumn type="buttons">
        <DxButton name="edit" />
        <DxButton name="delete" />
      </DxColumn>
    </DxTreeList>
  </div>
</template>

<script src="./Menu.js"></script>

<style></style>
