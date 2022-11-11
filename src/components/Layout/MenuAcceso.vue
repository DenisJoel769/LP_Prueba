<template>
  <v-list nav class="primary nodeList" dense width="200" height="auto">
    <template v-for="node in nodes">
      <v-list-group v-if="node.items && node.items.length" :key="node.idMenuVue">
        <v-list-item-content slot="activator">
          <v-list-item-title style="color: white">{{ node.name }}</v-list-item-title>
        </v-list-item-content>
        <menu-acceso @selected="select" class="py-0 pl-3" :nodes="node.items" />
      </v-list-group>

      <v-list-item @click="selectedItem(node)" :key="node.idMenuVue" v-else>
        <v-list-item-content>
          <v-list-item-title style="color: white">{{ node.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
export default {
  name: "menu-acceso",
  props: ["nodes"],
  data: () => ({
    menu: false,
  }),
  methods: {
    //Emit del evento selected para  cerrar el menu
    selectedItem(item) {
      if (item.path != "" || item.path != null) {
        this.$emit("selected");
        this.$router.push(item.path).catch(() => {});
      }
    },

    select() {
      this.$emit("selected");
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
.nodeList .theme--light.v-icon {
  color: white;
}
</style>
