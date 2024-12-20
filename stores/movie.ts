import movieApi from "~/services/movie";
import { defineStore } from "pinia";

export const useMovieStore = defineStore('movieStore', {
  state: () => {
    return {
      genres: [],
    }
  },
  actions: {
    async getGenres() {
      movieApi.getGenre().then((res) => {
        this.genres = res.data;
      });
    }
  }
});