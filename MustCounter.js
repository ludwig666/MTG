const { ref } = Vue;
import { shuffleArray } from "./Utils.js";

const MustCounter = {
  setup() {
    const opponentCounters = ref(4);
    const opponentDeckSize = ref(60);
    const myCounters = ref(4);
    const myDeckSize = ref(60);
    const finalTurns = ref(10);
    const trials = ref(10000);
    const result = ref("");
    const deckA = ref("");
    const deckB = ref("");
    const resultA = ref("");
    const resultB = ref("");

    function setUp(counters, deckSize) {
      const array = Array(deckSize).fill(0);
      for (let i = 0; i < Math.min(counters, deckSize); i++) {
        array[i] = 1;
      } // 1 is counter
      shuffleArray(array);
      return array;
    }

    function play(opDeck, myDeck) {
      let turns = 0;
      let opHands = 0;
      let myHands = 0;
      let maxTurns = finalTurns.value;
      for (let i = 0; i < 7; i++) {
        opHands += opDeck.pop();
        myHands += myDeck.pop();
      }
      while (maxTurns >= turns && opDeck.length > 0 && myDeck.length > 0) {
        turns++;
        opHands += opDeck.pop();
        if (opHands > myHands) {
          // opponent plays finisher
          return "DEFEAT";
        }
        myHands += myDeck.pop();
        if (opHands > myHands) {
          // opponent plays finisher
          return "DEFEAT";
        }
      }
      return "WIN";
    }

    function _execute() {
      const deck1 = setUp(opponentCounters.value, opponentDeckSize.value);
      const deck2 = setUp(myCounters.value, myDeckSize.value);

      const deckAstr = deck1.toString();
      const deckBstr = deck2.toString();

      result.value = play(deck1, deck2);
      // resultA.value = deck1.toString();
      // deckA.value = deckAstr;
      // resultB.value = deck2.toString();
      // deckB.value = deckBstr;
    }

    function execute() {
      let wins = 0;
      for (let i = 0; i < trials.value; i++) {
        const deck1 = setUp(opponentCounters.value, opponentDeckSize.value);
        const deck2 = setUp(myCounters.value, myDeckSize.value);
        const result = play(deck1, deck2);
        if (result === "WIN") {
          wins++;
        } // else { do nothing }
      } // for
      const rate = (wins / trials.value) * 100;
      result.value = `勝率: ${rate.toFixed(2)}% (${wins}勝 / ${
        trials.value
      }試行)`;
    }

    return {
      opponentCounters,
      opponentDeckSize,
      myCounters,
      myDeckSize,
      finalTurns,
      trials,
      result,
      deckA,
      deckB,
      resultA,
      resultB,
      execute,
    };
  },
  template: `
<v-card
  class="ma-4 pa-4"
  title="マストカウンター計算機"
  text="対戦相手のフィニッシャーをすべてカウンターできるか、シミュレーションして確率を計算します。">
  <v-card-text>
    <ol>
      <li>マストカウンター枚数とデッキ枚数を入力してください。</li>
      <li>自分のカウンター枚数とデッキ枚数も入力してください。</li>
      <li>計算ボタンを押すと、相手のフィニッシャーをすべてカウンターできる確率が表示されます。</li>
    </ol>
  </v-card-text>
  <v-card-text>
    <h4>問題設定</h4>
    <ul>
      <li>対戦相手は7枚引き、あなたも7枚引きます。</li>
      <li>対戦相手を先手とし、先手1ターン目のドローは有りとします。</li>
      <li>対戦相手は毎ターン1枚ずつカードを引き、あなたも毎ターン1枚ずつカードを引きます。</li>
      <li>対戦相手はフィニッシャーを可能な限りプレイし、あなたは可能な限りカウンターします。</li>
      <li>フィニッシャーをカウンターできない場合、あなたの敗北です。</li>
      <li>指定した決着ターンが経過するか、どちらかのデッキが尽きるまでゲームが続いた場合、あなたの勝利です。</li>
      <li>
      <v-tooltip text="初期ライフが2点、対戦相手はショックと山、
        あなたは対抗呪文と島を任意の枚数デッキに入れることができ、
        呪文を唱えるためのマナコストは0である特殊な条件下の試合を考慮します。">
        <template v-slot:activator="{ props }">
          <v-chip v-bind="props">問題設定例(MTG)</v-chip>
        </template>
      </v-tooltip>
      </li>
    </ul>
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
          v-model="finalTurns"
          reverse
          controlVariant="stacked"
          label="決着ターン数"
          :max="250"
          :min="0"
          variant="solo"
        ></v-number-input>
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
      <div>{{ result }}</div>
    </v-row>
    <v-row>
      <div>{{ deckA }}</div>
    </v-row>
    <v-row>
      <div>{{ resultA }}</div>
    </v-row>
    <v-row>
      <div>{{ deckB }}</div>
    </v-row>
    <v-row>
      <div>{{ resultB }}</div>
    </v-row>
  </v-container>
</v-sheet>
`,
};

export { MustCounter };
