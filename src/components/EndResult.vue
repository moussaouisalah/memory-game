<template>
  <div
    class="bg-gray-800 p-4 rounded-xl w-full max-w-md mx-auto flex flex-col gap-4"
  >
    <div class="font-bold text-xl"><h2>Results</h2></div>
    <div
      v-for="(player, i) in sortedPlayers"
      :key="i"
      class="flex flex-col items-center gap-2 rounded-xl p-2 bg-gray-700"
    >
      <p class="font-bold">{{ player.name }}</p>
      <p>{{ player.score }}</p>
    </div>
    <button
      @click="$emit('restart')"
      class="bg-orange-400 p-2 border-b-2 border-b-orange-100 border-r-2 border-r-orange-100 uppercase font-bold text-xl hover:bg-orange-500"
    >
      Restart?
    </button>
  </div>
</template>
<script>
export default {
  props: {
    result: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const sortedPlayers = props.result.players.sort(
      (a, b) => b.score - a.score
    );

    return { sortedPlayers };
  },
};
</script>
