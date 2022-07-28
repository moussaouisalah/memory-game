<template>
  <div class="flex flex-col gap-4 md:flex-row">
    <div
      class="flex flex-col gap-2 items-center bg-gray-800 p-4 rounded-xl w-full mx-auto"
    >
      <div v-for="(row, i) in gameGrid" :key="i" class="flex gap-2">
        <div
          v-for="(col, j) in row"
          :key="j"
          class="w-7 h-7 sm:w-10 sm:h-10 lg:w-16 lg:h-16 text-base sm:text-xl rounded-full flex items-center justify-center font-bold noselect"
          :class="[
            col.backgroundColor,
            col.isTurned ? 'cursor-default' : 'cursor-pointer',
          ]"
          @click="handleSelection({ x: i, y: j })"
        >
          {{ col.isTurned ? col.value : "X" }}
        </div>
      </div>
    </div>
    <div class="bg-gray-800 p-4 rounded-xl w-full max-w-md mx-auto">
      <div class="mb-2 font-bold text-xl"><h2>Players</h2></div>
      <div
        v-for="(player, i) in players"
        :key="i"
        class="flex flex-col items-center rounded-xl p-2"
        :class="{ 'bg-orange-500': currentTurnIndex === i }"
      >
        <p class="font-bold text-lg">{{ player.name }}</p>
        <p>{{ player.score }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, ref } from "vue";
import { setupGameGrid, setupPlayers } from "../utils";

export default {
  props: {
    setupData: {
      type: Object,
      required: true,
    },
  },

  setup(props, context) {
    const gameGrid = reactive(setupGameGrid(props.setupData.size));
    const currentTurnIndex = ref(0);
    const players = reactive(setupPlayers(props.setupData.players));
    const selectedIndex1 = ref(null);
    const selectedIndex2 = ref(null);

    const checkIsEntireGridTurned = () => {
      return gameGrid.every((row) => row.every((cell) => cell.isTurned));
    };

    const incrementTurnIndex = () => {
      currentTurnIndex.value = (currentTurnIndex.value + 1) % players.length;
    };

    const handleSelection = (position) => {
      if (selectedIndex1.value === null) {
        selectedIndex1.value = position;
        gameGrid[position.x][position.y].isTurned = true;
        gameGrid[position.x][position.y].backgroundColor = "bg-yellow-500";
      } else if (
        selectedIndex2.value === null &&
        !(
          selectedIndex1.value.x === position.x &&
          selectedIndex1.value.y === position.y
        )
      ) {
        selectedIndex2.value = position;
        gameGrid[position.x][position.y].isTurned = true;
        gameGrid[position.x][position.y].backgroundColor = "bg-yellow-500";
        setTimeout(compareSelections, 500);
      }
    };

    const compareSelections = () => {
      const item1 = gameGrid[selectedIndex1.value.x][selectedIndex1.value.y];
      const item2 = gameGrid[selectedIndex2.value.x][selectedIndex2.value.y];
      if (item1.value === item2.value) {
        item1.backgroundColor = "bg-green-700";
        item2.backgroundColor = "bg-green-700";
        setTimeout(() => handleNextTurn(true), 500);
      } else {
        item1.backgroundColor = "bg-red-600";
        item2.backgroundColor = "bg-red-600";
        setTimeout(() => handleNextTurn(false), 500);
      }
    };

    const handleNextTurn = (isCorrect) => {
      if (isCorrect) {
        players[currentTurnIndex.value].score++;
      } else {
        gameGrid[selectedIndex1.value.x][
          selectedIndex1.value.y
        ].isTurned = false;
        gameGrid[selectedIndex2.value.x][
          selectedIndex2.value.y
        ].isTurned = false;
        gameGrid[selectedIndex1.value.x][
          selectedIndex1.value.y
        ].backgroundColor = "bg-gray-700";
        gameGrid[selectedIndex2.value.x][
          selectedIndex2.value.y
        ].backgroundColor = "bg-gray-700";
      }
      selectedIndex1.value = null;
      selectedIndex2.value = null;
      if (checkIsEntireGridTurned()) {
        context.emit("game-over", { players });
      } else {
        incrementTurnIndex();
      }
    };

    console.log(gameGrid, currentTurnIndex, players);

    return {
      gameGrid,
      currentTurnIndex,
      players,
      handleSelection,
    };
  },
};
</script>
