<template>
  <div style="position: relative" v-bind:class="{ open: openSuggestion }">
    <v-text-field
      v-model="valor.nombreORazonSocial"
      @keydown.enter="enter"
      @keydown.down="down"
      @keydown.up="up"
      @input="change"
      solo
      dense
    />
    <v-list>
      <v-list-item
        v-for="(suggestion, i) in matches"
        :key="i"
        @click="suggestionClick(matches.findIndex((x) => x === suggestion))"
      >
        <v-list-item-title v-text="suggestion">
          {{ suggestion }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "AutoComplete",
  props: {
    // suggestions: {
    //   type: Array,
    //   required: true,
    // },
    selection: {
      type: Object,
      required: true,
      twoWay: true,
    },
  },
  data() {
    return {
      open: false,
      current: 0,
      valor: {
        idCliente: 0,
        nroCedula: "",
        nombreORazonSocial: "",
      },

      suggestions: [],
    };
  },
  computed: {
    //Filtering the suggestion based on the input
    matches() {
      return this.suggestions
        .filter((str) => {
          return this.valor.nombreORazonSocial.toLowerCase().trim().length > 0
            ? str
                .toLowerCase()
                .trim()
                .startsWith(this.valor.nombreORazonSocial.toLowerCase().trim())
            : "";
        })
        .slice(0, 10);
    },

    //The flag
    openSuggestion() {
      return (
        this.valor !== "" && this.matches.length != 0 && this.open === true
      );
    },
  },
  watch: {
    valor: function (newValue, oldValue) {
      //this.obtenerDetalleBoleta();
    },
  },
  methods: {
    //When enter pressed on the input
    enter() {
      let newValue = this.matches[this.current];
      this.valor = newValue;
      this.$emit("update:selection", newValue);
      this.open = false;
    },

    //When up pressed while suggestions are open
    up() {
      if (this.current > 0) this.current--;
    },

    //When up pressed while suggestions are open
    down() {
      if (this.current < this.suggestions.length - 1) this.current++;
    },

    //For highlighting element
    isActive(index) {
      return index === this.current;
    },

    //When the user changes input
    change() {
      if (this.open == false) {
        this.open = true;
        this.current = 0;
      }
    },

    //When one of the suggestion is clicked
    suggestionClick(index) {
      let newValue = this.matches[index];
      this.valor = newValue;
      this.$emit("update:selection", newValue);
      this.open = false;
    },
    getData: async function () {
      await axios
        .get("/api/cliente/ObtenerClienteBuscador", {})
        .then((response) => this.getvalue(response.data))
        .catch((err) => {
          console.warn(err.response.data.error);
        });
    },
    getvalue(json) {
      for (var i = 0; i < json.length; i++) {
        this.suggestions.push(json[i].nombreORazonSocial.toLowerCase());
      }
    },
  },
  async mounted() {
    await this.getData();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

