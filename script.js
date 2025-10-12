const { createApp, reactive, ref } = Vue;

createApp({
  setup() {
    const counter = reactive({ count: 0 })
    const message = ref('Hello World!')

    return {
      counter,
      message
    }
  }
}).mount('#app')
