const searchHandler = (arr, temp) => {
  if (temp.length === 0) {
    return arr;
  }
  return arr.filter((item) => item.name.toLowerCase().indexOf(temp) > -1);
}

const filterHandler = (arr, filter) => {
  switch (filter) {
    case 'popularMovies':
      return arr.filter(c => c.like);
    case 'mostViewedMovies':
      return arr.filter(c => c.viewers > 1000);
    default:
      return arr;
  }
}

export { searchHandler, filterHandler };