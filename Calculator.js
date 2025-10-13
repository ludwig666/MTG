const { ref } = Vue;

const Calculator = {
  setup() {
    const count = ref(0);
    return { count };
  },
  template: `
    <button @click="count++">
      Your calculator {{ count }}.
    </button>`,
};

export { Calculator };
