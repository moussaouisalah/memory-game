<template>
  <div
    class="flex flex-col gap-4 bg-gray-800 p-4 rounded-xl w-full max-w-md mx-auto"
  >
    <div>
      <p class="text-orange-600 text-xl">Number of players</p>
      <div class="flex items-center gap-2 justify-between mt-2">
        <button
          class="flex-1 text-lg p-2 rounded-xl font-bold"
          :class="[numberOfPlayers === 1 ? 'bg-orange-600' : 'bg-gray-400']"
          @click="setNumberOfPlayers(1)"
        >
          1</button
        ><button
          class="flex-1 text-lg p-2 rounded-xl font-bold"
          :class="[numberOfPlayers === 2 ? 'bg-orange-600' : 'bg-gray-400']"
          @click="setNumberOfPlayers(2)"
        >
          2</button
        ><button
          class="flex-1 text-lg p-2 rounded-xl font-bold"
          :class="[numberOfPlayers === 3 ? 'bg-orange-600' : 'bg-gray-400']"
          @click="setNumberOfPlayers(3)"
        >
          3</button
        ><button
          class="flex-1 text-lg p-2 rounded-xl font-bold"
          :class="[numberOfPlayers === 4 ? 'bg-orange-600' : 'bg-gray-400']"
          @click="setNumberOfPlayers(4)"
        >
          4
        </button>
      </div>
    </div>
    <div>
      <p class="text-orange-600 text-xl">Grid size</p>
      <div class="flex items-center gap-2 justify-between mt-2">
        <button
          class="flex-1 text-lg p-2 rounded-xl font-bold"
          :class="[gridSize === 4 ? 'bg-orange-600' : 'bg-gray-400']"
          @click="setGridSize(4)"
        >
          4x4</button
        ><button
          class="flex-1 text-lg p-2 rounded-xl font-bold"
          :class="[gridSize === 8 ? 'bg-orange-600' : 'bg-gray-400']"
          @click="setGridSize(8)"
        >
          8x8
        </button>
      </div>
    </div>
    <button
      @click="handleStart"
      class="bg-orange-400 p-2 border-b-2 border-b-orange-100 border-r-2 border-r-orange-100 uppercase font-bold text-xl hover:bg-orange-500"
    >
      start?
    </button>
  </div>
</template>
<script>
import { ref } from "vue";

export default {
  setup(props, context) {
    const numberOfPlayers = ref(1);
    const gridSize = ref(4);

    const handleStart = () => {
      context.emit("start", { size: gridSize, players: numberOfPlayers });
    };

    const setNumberOfPlayers = (num) => {
      numberOfPlayers.value = num;
    };

    const setGridSize = (size) => {
      gridSize.value = size;
    };

    return {
      handleStart,
      numberOfPlayers,
      gridSize,
      setNumberOfPlayers,
      setGridSize,
    };
  },
};
</script>
