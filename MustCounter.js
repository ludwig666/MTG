const { ref } = Vue;

const MustCounter = {
  setup() {
    const count = ref(0);
    return { count };
  },
  template: `
<v-number-input
  reverse
  controlVariant="stacked"
  label="相手のマストカウンター枚数"
  :max="250"
  :min="0"
  :model-value="4"
  variant="solo"
></v-number-input>
<v-number-input
  reverse
  controlVariant="stacked"
  label="相手のデッキ枚数"
  :max="250"
  :min="0"
  :model-value="60"
  variant="solo"
></v-number-input>
<v-number-input
  reverse
  controlVariant="stacked"
  label="自分のカウンター枚数"
  :max="250"
  :min="0"
  :model-value="4"
  variant="solo"
></v-number-input>
<v-number-input
  reverse
  controlVariant="stacked"
  label="自分のデッキ枚数"
  :max="250"
  :min="0"
  :model-value="60"
  variant="solo"
></v-number-input>
<v-btn icon>
  <v-icon>mdi-heart</v-icon>
</v-btn>
`,
};

export { MustCounter };
