import { DxHtmlEditor, DxToolbar, DxItem } from "devextreme-vue/html-editor";
import "devextreme/ui/html_editor/converters/markdown";
import store from "@/store";

export default {
  components: {
    DxHtmlEditor,
    DxToolbar,
    DxItem,
  },
  data() {
    return {
      titulo: null,
      contenido: null,
      valueContent: null,
      selectedItems: [{ text: "Html" }],
      headerValues: [false, 1, 2, 3, 4, 5],
      sizeValues: ["8pt", "10pt", "12pt", "14pt", "18pt", "24pt", "36pt"],
      fontValues: [
        "Arial",
        "Courier New",
        "Georgia",
        "Impact",
        "Lucida Console",
        "Tahoma",
        "Times New Roman",
        "Verdana",
        "Montserrat",
      ],
      isMultiline: true,
      radios: null,
      UrlAviso: null,
      modalFechaInicio: null,
      modalFechaFin: null,
      dateFechaInicio: new Date().toISOString().substr(0, 10),
      dateFechaFin: new Date().toISOString().substr(0, 10),
      validFormAviso: true,
    };
  },
  methods: {
    guardar() {
      //0 es aviso por URL
      if (!this.$refs.formAviso.validate()) return;

      if (this.radios == 0) {
        var datos = {
          TextoAviso: this.valueContent,
          Titulo: this.titulo,
          Contenido: this.contenido,
          UrlExterna: this.UrlAviso,
          IdUsuario: store.state.LoginStore.IdUsuario,
          FechaInicioAviso: this.dateFechaInicio,
          FechaFinAviso: this.dateFechaFin,
        };
      } else {
        var datos = {
          TextoAviso: this.valueContent == null ? "<p></p>" : this.valueContent,
          Titulo: this.titulo,
          Contenido: this.contenido,
          UrlExterna: null,
          IdUsuario: store.state.LoginStore.IdUsuario,
          FechaInicioAviso: this.dateFechaInicio,
          FechaFinAviso: this.dateFechaFin,
        };
      }

      let token = localStorage.getItem("user-token");
      axios({
        method: "post",
        url: "/api/Avisos",
        data: datos,
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {})
        .catch(function(error) {
          console.log(error);
        });
    },
  },

  computed: {
    editorValueType: function() {
      return this.selectedItems[0].text.toLowerCase();
    },
  },
};
