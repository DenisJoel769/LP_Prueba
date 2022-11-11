<template>
  <div>
    <div class="headline white--text ml-12">
      {{ hora }}:{{ minuto }}:{{ segundo }}
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    isMarch: false,
    acumularTime: 0,
    timeInicial: null,
    control: null,
    timeActual: null,
    acumularTime2: null,
    horaCronometro: "00",
    minutoCronometro: "00",
    segundoCronometro: "00",
  }),

  computed: {
    hora() {
      return this.horaCronometro;
    },
    minuto() {
      return this.minutoCronometro;
    },
    segundo() {
      return this.segundoCronometro;
    },
  },

  mounted() {
    let fechaInicial = this.$store.state.LlamadaEntrante.fechaInicioLlamada;
    this.start(fechaInicial);
  },

  methods: {
    start(fechaInicial) {
      if (this.isMarch == false) {
        this.timeInicial = fechaInicial;
        this.control = setInterval(() => {
          this.cronometro();
        }, 10);
        this.isMarch = true;
      }
    },

    cronometro() {
      this.timeActual = new Date();
      this.acumularTime = this.timeActual - this.timeInicial;
      this.acumularTime2 = new Date();

      this.acumularTime2.setTime(this.acumularTime);

      let cc = Math.round(this.acumularTime2.getMilliseconds() / 10);
      let ss = this.acumularTime2.getSeconds();
      let mm = this.acumularTime2.getMinutes();
      let hh = this.acumularTime2.getHours() - 20;

      if (cc < 10) {
        cc = "0" + cc;
      }
      if (ss < 10) {
        ss = "0" + ss;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      if (hh < 10) {
        hh = "0" + hh;
      }
      this.horaCronometro = hh;
      this.minutoCronometro = mm;
      this.segundoCronometro = ss;
    },

    /* stop() {
      if (this.isMarch == true) {
        clearInterval(this.control);
        this.isMarch = false;
      }
    },*/

    /*resume() {
      if (isMarch == false) {
        timeActu2 = new Date();
        timeActu2 = timeActu2.getTime();
        acumularResume = timeActu2 - acumularTime;

        timeInicial.setTime(acumularResume);
        control = setInterval(cronometro, 10);
        isMarch = true;
      }
    },*/

    reset() {
      if (this.isMarch == true) {
        clearInterval(this.control);
        this.isMarch = false;
      }
      this.acumularTime = 0;
      this.horaCronometro = "00";
      this.minutoCronometro = "00";
      this.segundoCronometro = "00";
    },
  },
};
</script>

<style></style>
