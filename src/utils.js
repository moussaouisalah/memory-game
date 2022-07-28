function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generateMemoryGameGrid(size) {
  const maxNumber = (size * size) / 2;
  const gridNumbers = Array.from({ length: maxNumber * 2 }, (_, i) =>
    Math.floor(i / 2)
  );
  const randomNumbers = shuffleArray(gridNumbers);
  let grid = [];
  for (let i = 0; i < size; i++) {
    grid.push([]);
    for (let j = 0; j < size; j++) {
      grid[i].push(randomNumbers[i * size + j]);
    }
  }
  return grid;
}

export function setupGameGrid(size) {
  return generateMemoryGameGrid(size).map((row) => {
    return row.map((cell) => {
      return {
        value: cell,
        isTurned: false,
        backgroundColor: "bg-gray-700",
      };
    });
  });
}

export function setupPlayers(number) {
  return Array.from({ length: number }, (_, i) => {
    return {
      name: `Player ${i + 1}`,
      score: 0,
    };
  });
}
