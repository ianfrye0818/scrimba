function createStore(reducer) {
  const storedFavorites = localStorage.getItem('favorites');
  const initialState = storedFavorites
    ? { favorites: JSON.parse(storedFavorites).favorites }
    : reducer(undefined, {});

  let currentState = initialState;

  const store = {
    getState: () => currentState,
    dispatch: (action) => {
      currentState = reducer(currentState, action);
    },
  };

  return store;
}

const initialState = {
  favorites: [],
};

function favoritesReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_FAVORITE': {
      const addedFavorite = action.payload.favorite;
      const favorites = [...state.favorites, addedFavorite];
      localStorage.setItem('favorites', JSON.stringify({ favorites }));
      return { favorites };
    }
    case 'REMOVE_FAVORITE': {
      const removedFavorite = action.payload.favorite;
      const favorites = state.favorites.filter(
        (favorite) => favorite.id !== removedFavorite.id
      );
      localStorage.setItem('favorites', JSON.stringify({ favorites }));
      return { favorites };
    }
    default:
      return state;
  }
}

const store = createStore(favoritesReducer);
export default store;
