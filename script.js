const { createApp, reactive, ref } = Vue;
const { createVuetify } = Vuetify

const vuetify = createVuetify()

const app = createApp({
  setup() {
    const counter = reactive({ count: 0 })
    const message = ref('Hello World!')

    return {
      counter,
      message
    }
  }
})
  
app.use(vuetify).mount('#app')
