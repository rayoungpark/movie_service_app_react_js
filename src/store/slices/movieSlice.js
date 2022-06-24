import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface CommonState {
//     count:Number,
//     page:Number,
//     limit:Number,
//     movies:Array
// }

const initialState = {
  count: 0,
  page: 0,
  limit: 20,
  rating: 8.8,
  movies: [],
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setCount(state, action) {
      state.count = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setMovies(state, action) {
      state.movies = action.payload;
    },
    addMovies(state, action) {
      state.movies.push(...action.payload);
    },
    setRating(state, action) {
      if (state.rating !== action.payload) {
        state.rating = action.payload;
        state.count = initialState.count;
        state.movies = initialState.movies;
        state.page = initialState.page;
      }
    },
  },
});

export const { setCount, setPage, addMovies, setRating } = movieSlice.actions;
export default movieSlice;
