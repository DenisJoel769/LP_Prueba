<template>
  <div class="container" style="padding-top: 50px">
    <AutoComplete :selection.sync="value"> </AutoComplete>
  </div>
</template>

<script>
import AutoComplete from "./AutoComplete.vue";

export default {
  name: "App",
  components: {
    AutoComplete,
  },
  data() {
    return {
      cities: ["Bangalore", "Chennai", "Cochin", "Delhi", "Kolkata", "Mumbai"],

      value: {},
      options: [],
    };
  },
  methods: {
    getData: async function () {
      await axios
        .get("/api/cliente/ObtenerClienteBuscador", {})
        .then((response) => (this.options = response.data))
        .catch((err) => {
          console.warn(err.response.data.error);
        });
    },
    getvalue(values) {
      this.value = values;
      console.log(this.value);
    },
  },
  async created() {
    //await this.getData();
  },
};
</script>

<style>
#app {
  margin-top: 60px;
}
.result-section {
  position: absolute;
  top: 110px;
  left: 16px;
}
</style>
