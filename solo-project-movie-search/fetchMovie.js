const API_KEY = '419e0663';
const OPEN_MOVIE_BASE_URL = 'http://www.omdbapi.com/';

export async function getMovieArray(title) {
  const url = `${OPEN_MOVIE_BASE_URL}?apikey=${API_KEY}&s=${title}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching Data ${response.statusText}`);
    }
    const data = await response.json();
    const movieIDArray = await data.Search.map((movie) => {
      return movie.imdbID;
    });
    return movieIDArray;
  } catch (error) {
    console.error(error);
  }
}

export async function getMovieDetailsArray(title) {
  const movieIDArray = await getMovieArray(title);

  const movieDetailsArray = await Promise.all(
    movieIDArray.map(async (movieID) => {
      const response = await fetch(
        `${OPEN_MOVIE_BASE_URL}?apikey=${API_KEY}&i=${movieID}`
      );
      const data = await response.json();
      return data;
    })
  );
  return movieDetailsArray;
}
