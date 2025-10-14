const { ref } = Vue;

const MustCounter = {
  setup() {
    const count = ref(0);
    return { count };
  },
  template: `
<v-card
  class="ma-4 pa-4"
  title="マストカウンター計算機"
  text="対戦相手のフィニッシャーをすべてカウンターできるか、その確率を計算します。">
  <v-card-text>
    <div>マストカウンター枚数とデッキ枚数を入力してください。</div>
    <div>自分のカウンター枚数とデッキ枚数も入力してください。</div>
    <div>計算ボタンを押すと、相手のフィニッシャーをすべてカウンターできる確率が表示されます。</div>
  </v-card-text>
</v-card>

<v-sheet :elevation="4" rounded class="d-flex ma-4 pa-4">
  <v-container>
    <v-row>
      <h4>相手</h4>
    </v-row>
    <v-row>
      <v-col>
        <v-number-input
          reverse
          controlVariant="stacked"
          label="マストカウンター枚数"
          :max="250"
          :min="0"
          :model-value="4"
          variant="solo"
        ></v-number-input>
      </v-col>
      <v-col>
        <v-number-input
          reverse
          controlVariant="stacked"
          label="デッキ枚数"
          :max="250"
          :min="0"
          :model-value="60"
          variant="solo"
        ></v-number-input>
      </v-col>
    </v-row>
  </v-container>
</v-sheet>

<v-sheet :elevation="4" rounded class="d-flex ma-4 pa-4">
  <v-container>
    <v-row>
      <h4>自分</h4>
    </v-row>
    <v-row>
      <v-col>
        <v-number-input
          reverse
          controlVariant="stacked"
          label="カウンター枚数"
          :max="250"
          :min="0"
          :model-value="4"
          variant="solo"
        ></v-number-input>
      </v-col>
      <v-col>
        <v-number-input
          reverse
          controlVariant="stacked"
          label="デッキ枚数"
          :max="250"
          :min="0"
          :model-value="60"
          variant="solo"
        ></v-number-input>
      </v-col>
    </v-row>
  </v-container>
</v-sheet>

<v-btn icon>
  <v-icon>mdi-calculator</v-icon>
</v-btn>
`,
};

export { MustCounter };
