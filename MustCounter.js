const { ref } = Vue;
import { shuffleArray } from "./Utils.js";

const MustCounter = {
  setup() {
    const opponentCounters = ref(4);
    const opponentDeckSize = ref(60);
    const myCounters = ref(4);
    const myDeckSize = ref(60);
    const trials = ref(10000);
    const result = ref("result");

    function setUp(counters, deckSize) {
      const array = Array(deckSize).fill(0);
      for (let i = 0; i < Math.min(counters, deckSize); i++) {
        array[i] = 1;
      } // 1 is counter
      shuffleArray(array);
      return array;
    }

    function execute() {
      const opDeck = setUp(opponentCounters.value, opponentDeckSize.value);
      const myDeck = setUp(myCounters.value, myDeckSize.value);

      result.value = opDeck.toString() + "/" + myDeck.toString();
    }

    return {
      opponentCounters,
      opponentDeckSize,
      myCounters,
      myDeckSize,
      trials,
      result,
      execute,
    };
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
          v-model="opponentCounters"
          reverse
          controlVariant="stacked"
          label="マストカウンター枚数"
          :max="250"
          :min="0"
          variant="solo"
        ></v-number-input>
      </v-col>
      <v-col>
        <v-number-input
          v-model="opponentDeckSize"
          reverse
          controlVariant="stacked"
          label="デッキ枚数"
          :max="250"
          :min="10"
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
          v-model="myCounters"
          reverse
          controlVariant="stacked"
          label="カウンター枚数"
          :max="250"
          :min="0"
          variant="solo"
        ></v-number-input>
      </v-col>
      <v-col>
        <v-number-input
          v-model="myDeckSize"
          reverse
          controlVariant="stacked"
          label="デッキ枚数"
          :max="250"
          :min="10"
          variant="solo"
        ></v-number-input>
      </v-col>
    </v-row>
  </v-container>
</v-sheet>

<v-sheet :elevation="4" rounded class="d-flex ma-4 pa-4">
  <v-container>
    <v-row>
      <h4>実行</h4>
    </v-row>
    <v-row>
      <v-col cols="2">
        <v-btn icon @click="execute">
          <v-icon>mdi-calculator</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-number-input
          v-model="trials"
          reverse
          controlVariant="stacked"
          label="試行回数"
          :step="1000"
          :max="100000"
          :min="1000"
          variant="solo"
        ></v-number-input>
      </v-col>
    </v-row>
  </v-container>
</v-sheet>

<v-sheet :elevation="4" rounded class="d-flex ma-4 pa-4">
  <v-container>
    <v-row>
      <h4>結果</h4>
    </v-row>
    <v-row>
      {{ result }}
    </v-row>
  </v-container>
</v-sheet>
`,
};

export { MustCounter };
