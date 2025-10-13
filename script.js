const { createApp, reactive, ref } = Vue;
const { createVuetify } = Vuetify;
const { createRouter, createMemoryHistory } = VueRouter;

import { MustCounter } from "./MustCounter.js";
import { Calculator } from "./Calculator.js";

const vuetify = createVuetify();

const routes = [
  { path: "/", component: MustCounter },
  { path: "/calc", component: Calculator },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

const app = createApp({
  setup() {
    const counter = reactive({ count: 0 });
    const message = ref("Hello World!");

    return {
      counter,
      message,
    };
  },
});

app.use(vuetify);
app.use(router);
app.mount("#app");
