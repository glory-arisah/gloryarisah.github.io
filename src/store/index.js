import axios from "axios";
import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      topArtists: [],
      topTracks: [],
      currentArtist: "",
      currentAlbum: "",
    };
  },
  mutations: {
    getTopArtistsAndTracks: async (state) => {
      let urls = [
        "http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=nigeria&api_key=3491fbfc394ebf3990dfec8acd81f290&format=json",
        "http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=nigeria&api_key=3491fbfc394ebf3990dfec8acd81f290&format=json",
      ];
      const requests = urls.map((url) => axios.get(url));
      const [topArtists, topTracks] = await axios.all(requests);
      state.topArtists = topArtists.data.topartists.artist;
      state.topTracks = topTracks.data.tracks.track;
    },
  },
  actions: {
    getTopArtistsAndTracks: ({ commit }) => {
      commit("getTopArtistsAndTracks");
    },
  },
  getters: {
    firstTenTracks: (state) => {
      return state.topTracks.slice(0, 12);
    },
    firstTenArtists: (state) => {
      return state.topArtists.slice(0, 12);
    },
  },
});

export default store;
