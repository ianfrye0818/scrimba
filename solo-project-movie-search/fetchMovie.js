const API_KEY = '419e0663';
const OPEN_MOVIE_BASE_URL = 'https://www.omdbapi.com/';

//Function for getting the results of all the movies that match that title and extracting their id's to pass to the getMovieDetails Array Function
async function getMovieArray(title) {
  const url = `${OPEN_MOVIE_BASE_URL}?apikey=${API_KEY}&s=${title}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching Data ${response.statusText}`);
    }
    const data = await response.json();

    //if movie doesn't exist in database - database will return data with a Response = 'False" if this happens then return null to the next function and return null to the parent funtion to display error message in HTML
    if (data.Response === 'False') {
      return null;
    } else {
      //if movies are found - loop through them and extract their IMDB Ids and put them in an array to be passed to the next funciton so that it can call to the datbase and get the details from each movie to display in the DOM
      const movieIDArray = await data.Search.map((movie) => {
        return movie.imdbID;
      });

      //Return the movie ID Array
      return movieIDArray;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getMovieDetailsArray(title) {
  //Assign the movie array from the function above into a constant to be used below
  const movieIDArray = await getMovieArray(title);

  //if the movieIDArray is null or there was a problem and it was undefined - return Null to the parent function to display error message in the DOM
  if (!movieIDArray) {
    return null;
  }
  //if the movieIDArray is valid - loop through it and make a network call for each movie getting that movie's object and storing it in an array to pass to the parent function index.js
  const movieDetailsArray = await Promise.all(
    movieIDArray.map(async (movieID) => {
      const response = await fetch(
        `${OPEN_MOVIE_BASE_URL}?apikey=${API_KEY}&i=${movieID}`
      );
      const data = await response.json();
      return data;
    })
  );

  //return this function to parent.
  return movieDetailsArray;
}
