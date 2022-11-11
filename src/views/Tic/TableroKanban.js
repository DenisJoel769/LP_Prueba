/** @format */

import draggable from "vuedraggable";

export default {
  components: {
    draggable,
  },

  data() {
    return {
      nuevaTarea: "",
      arrTareas: [
        {
          Tarea: "Tareas pendientes",
          Descripcion: "generar diseño para registro de tareas pendientes",
          Puntos: 3,
          FechaInicio: "",
          FechaFin: "",
          Usuario: "oscar",
        },
        {
          Tarea: "Avisos sistema",
          Descripcion: "generar un sistema de avisos",
          Puntos: 3,
          FechaInicio: "",
          FechaFin: "",
          Usuario: "elias",
        },
        {
          Tarea: "App login",
          Descripcion: "generar el login",
          Puntos: 3,
          FechaInicio: "",
          FechaFin: "",
          Usuario: "cesar",
        },
        {
          Tarea: "App Api",
          Descripcion: "generar la api",
          Puntos: 3,
          FechaInicio: "",
          FechaFin: "",
          Usuario: "christian",
        },
      ],
      arrProgreso: [],
      arrPrueba: [],
      arrPublicado: [],
    };
  },
  methods: {
    add() {
      if (this.nuevaTarea) {
        this.arrTareas.push({ Tarea: this.nuevaTarea });
        this.nuevaTarea = "";
      }
    },
  },

  computed: {},

  mounted() {},
};
