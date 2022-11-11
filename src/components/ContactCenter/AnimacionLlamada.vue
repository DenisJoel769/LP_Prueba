<template>
  <div>
    <div
      class="d-flex justify-center wow animate__heartBeat llamada mt-5 font-weight-bold"
      data-wow-iteration="infinite"
      data-wow-duration="1s"
      data-wow-delay="1s"
    >
      LLAMADA EN CURSO
    </div>
  </div>
</template>

<script>
import { WOW } from "wowjs";
import "animate.css";

export default {
  data: () => ({}),
  mounted() {
    var wow = new WOW({
      boxClass: "wow",
      animateClass: "animated",
      offset: 0,
      mobile: true,
      live: false,
    });
    wow.init();
  },

  watch: {
    cases() {
      this.$nextTick(() => {
        // After the dom is rendered, execute the animation
        var wow = new WOW({
          live: false,
        });
        wow.init();
      });
    },
  },
};
</script>

<style>
.llamada {
  font-size: 15px;
  color: #eeff00;
}
</style>
