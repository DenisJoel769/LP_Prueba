<template>
  <v-img
    :width="size"
    :src="require(`@/assets/Icons/${icon}`)"
  ></v-img>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: "15",
    },

    icon: {
      type: String,
      default: null,
    },
  },

  mounted() {},
};
</script>

<style></style>
