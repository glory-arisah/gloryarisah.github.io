import axios from "axios";
import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      topArtists: [],
      topTracks: [],
      currentArtist: "",
      currArtistAlbums: [],
      currentAlbum: "",
      loading: false,
    };
  },
  mutations: {
    getTopArtistsAndTracks: (state, payload) => {
      const { topArtists, topTracks } = payload;
      state.topArtists = topArtists;
      state.topTracks = topTracks;
    },
    getArtistInfo: (state, payload) => {
      const { artist } = payload;
      state.currentArtist = artist;
    },
    getArtistAlbums: (state, payload) => {
      const { currArtistAlbums } = payload;
      state.currArtistAlbums = currArtistAlbums;
    },
    // getSimilarArtists,
  },
  actions: {
    // get top artists and top tracks from last.fm
    getTopArtistsAndTracks: async ({ commit, state }) => {
      const urls = [
        "http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=nigeria&api_key=3491fbfc394ebf3990dfec8acd81f290&format=json",
        "http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=nigeria&api_key=3491fbfc394ebf3990dfec8acd81f290&format=json",
      ];
      state.loading = true;
      try {
        const requests = urls.map((url) => axios.get(url));
        const [topArtists, topTracks] = await axios.all(requests);
        commit("getTopArtistsAndTracks", {
          topArtists: topArtists.data.topartists.artist,
          topTracks: topTracks.data.tracks.track,
        });
      } catch (error) {
        console.error(error);
      } finally {
        state.loading = false;
      }
    },
    // get current artist being viewed's information
    getArtistInfo: async ({ commit, state }, currArtist) => {
      const url = `http://ws.audioscrobbler.com/2.0?method=artist.getInfo&artist=${currArtist}&api_key=3491fbfc394ebf3990dfec8acd81f290&format=json`;
      state.loading = true;
      try {
        const { data } = await axios.get(url);
        console.log({ data });
        commit("getArtistInfo", { artist: data.artist });
      } catch (error) {
        console.error(error);
      } finally {
        state.loading = false;
      }
    },
    // get artist in view's top albums
    getArtistAlbums: async ({ commit, state }, currArtist) => {
      const url = `http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${currArtist}&api_key=3491fbfc394ebf3990dfec8acd81f290&format=json&limit=8`;
      state.loading = true;
      try {
        const { data } = await axios.get(url);
        const nullValues = ["Undefined", "(null)"];
        commit("getArtistAlbums", {
          currArtistAlbums: data.topalbums.album.filter(
            (alb) => !nullValues.includes(alb.name)
          ),
        });
        console.log("album values", state.currArtistAlbums);
      } catch (error) {
        console.error(error);
      } finally {
        state.loading = false;
      }
    },
  },
  getters: {
    // get first ten top tracks
    firstTenTracks: (state) => {
      return state.topTracks.slice(0, 12);
    },
    // get first ten top artists
    firstTenArtists: (state) => {
      return state.topArtists.slice(0, 12);
    },
    // return currentArtist value
    currArtist: (state) => {
      return state.currentArtist;
    },
  },
});

export default store;

// method=artist.getinfo&artist=Michael Jackson&api_key=3491fbfc394ebf3990dfec8acd81f290&format=json`;
