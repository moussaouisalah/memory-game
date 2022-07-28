<template>
  <div class="min-h-screen bg-black text-gray-100 font-mono p-4">
    <start-setup v-if="status === 'start'" @start="handleStart" />
    <game-container
      v-if="status === 'game'"
      :setupData="gameSetupData"
      @game-over="handleGameOver"
    />
    <end-result
      v-if="status === 'end'"
      :result="gameResult"
      @restart="handleRestart"
    />
  </div>
</template>
<script>
import { ref } from "vue";
import StartSetup from "./components/StartSetup.vue";
import GameContainer from "./components/GameContainer.vue";
import EndResult from "./components/EndResult.vue";

export default {
  components: {
    StartSetup,
    GameContainer,
    EndResult,
  },
  setup() {
    const status = ref("start");
    const gameSetupData = ref(null);
    const gameResult = ref(null);

    const handleStart = (data) => {
      gameSetupData.value = data;
      status.value = "game";
    };

    const handleGameOver = (data) => {
      gameResult.value = data;
      status.value = "end";
    };

    const handleRestart = () => {
      gameSetupData.value = null;
      gameResult.value = null;
      status.value = "start";
    };

    return {
      status,
      handleStart,
      gameSetupData,
      handleGameOver,
      handleRestart,
      gameResult,
    };
  },
};
</script>
