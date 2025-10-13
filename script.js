const { createApp, reactive, ref } = Vue;
const { createVuetify } = Vuetify;
const { createRouter, createMemoryHistory } = VueRouter;

// import MustCounter from "./MustCounter.js";

const vuetify = createVuetify();

const routes = [
  { path: "/" },
  // { path: "/", component: MustCounter },
  // { path: '/about', component: AboutView },
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
