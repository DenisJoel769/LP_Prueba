/** @format */

import Vue from "vue";
import Vuetify from "vuetify/lib";
import es from "vuetify/es5/locale/es";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#0041f3",
        secondary: "#3f51b5",
        accent: "#03a9f4",
        error: "#f44336",
        warning: "#ffc107",
        info: "#00bcd4",
        success: "#4caf50",
        background: "#efefef",
      },
    },
    icons: {
      iconfont: "fa",
    },
  },
  lang: {
    locales: { es },
    current: "es",
  },
});
