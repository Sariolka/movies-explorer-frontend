export function handleCalculateDuration(mins) {
  let hours = Math.trunc(mins / 60);
  let minutes = mins % 60;
  if (hours === 0) {
    return `${minutes}м`;
  } else {
    return `${hours}ч ${minutes}м`;
  }
}

export function filterDuration(allMovies) {
  return allMovies.filter((card) => card.duration < 40);
}

export function searchMovies(arr, input, short) {
  const filteredArray = arr.filter((card) => {
    return card.nameRU.toLowerCase().includes(input.toLowerCase());
  });
  if (short) {
    return filterDuration(filteredArray);
  } else {
    return filteredArray;
  }
}
