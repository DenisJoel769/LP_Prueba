<template>
  <div>
    <v-row class="mb-n1 mt-2">
      <div class="ml-12">
        <my-icon size="17" icon="Talk_icons.svg"></my-icon>
      </div>
      <div
        style="color: #ff6621; font-size: 13px;"
        class="font-weight-bold ml-1 mt-n0"
      >
        {{ titulo }}
      </div>
    </v-row>
    <div class="rounded-lg speech" :style="{ width: width }">
      <p class="ml-3">
        {{ texto }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: "100px",
    },

    texto: {
      type: String,
      default: "",
    },

    titulo: {
      type: String,
      default: "",
    },
  },
};
</script>

<style>
.speech {
  font-family: Letters;
  height: auto;
  background-color: #7494eb;
  font-size: 22px;
  text-align: start;
  color: #ffffff;
}
</style>
