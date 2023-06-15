import axios from "axios";
import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      topArtists: [],
      topTracks: [],
      currentArtist: {},
      currArtistAlbums: [],
      currentAlbum: "",
      loading: false,
    };
  },
  mutations: {
    getTopArtistsAndTracks: (state) => {
      state.topTracks = JSON.parse(localStorage.getItem("topTracks"));
    },
    getArtistInfo: (state, payload) => {
      state.currentArtist = payload.artist;
    },
    getArtistAlbums: (state, payload) => {
      state.currArtistAlbums = payload.currArtistAlbums;
    },
    getArtistPhotos: (state) => {
      state.topArtists = JSON.parse(localStorage.getItem("topArtists"));
    },
  },
  actions: {
    // get top artists and top tracks from last.fm
    getTopArtistsAndTracks: async ({ commit, state, dispatch }) => {
      const urls = [
        "http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=nigeria&api_key=3491fbfc394ebf3990dfec8acd81f290&format=json",
        "http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=nigeria&api_key=3491fbfc394ebf3990dfec8acd81f290&format=json",
      ];
      state.loading = true;
      try {
        if (
          isObjInLocalStorage("topArtists") ||
          isObjInLocalStorage("topTracks")
        ) {
        } else {
          const requests = urls.map((url) => axios.get(url));
          let [topArtists, topTracks] = await axios.all(requests);
          [topArtists, topTracks] = [
            topArtists.data.topartists.artist,
            topTracks.data.tracks.track,
          ];
          // add values to localStorage
          localStorage.setItem("topArtists", JSON.stringify(topArtists));
          localStorage.setItem("topTracks", JSON.stringify(topTracks));
        }
        commit("getTopArtistsAndTracks");
        dispatch("getArtistsPhotos");
      } catch (error) {
        console.error("Error message:", error);
      }
      state.loading = false;
    },
    getArtistsPhotos: async ({ commit, state }) => {
      state.loading = true;
      // artists' whose names don't match on last.fm and wikipedia API
      const artistException = {
        Drake: "Drake (musician)",
        Usher: "Usher (musician)",
        "2Pac": "Tupac Shakur",
        Tekno: "Tekno (musician)",
        RUNTOWN: "Runtown",
      };
      // wikipedia photo API base url
      const photoBaseUrl =
        "https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=pageimages&piprop=original&indexpageids";
      try {
        let topArtists = isObjInLocalStorage("topArtists")
          ? JSON.parse(localStorage.getItem("topArtists"))
          : state.topArtists;
        const artistsPhotosCb = topArtists.map(async (artist) => {
          // remove unneeded properties from the artist object
          let { image, listeners, mbid, streamable, ...artistObj } = artist;
          let artistName = artistObj.name;
          // update the artist name property to fetch their photo
          artistName = artistException.hasOwnProperty(artistName)
            ? artistException[artistName]
            : artistName;
          const {
            data: {
              query: { pages, pageids },
            },
          } = await axios.get(`${photoBaseUrl}&titles=${artistName}`);
          const pageId = pageids[0];
          const photoUrl = pages[pageId].original
            ? pages[pageId].original.source
            : "";
          return {
            ...artistObj,
            photoUrl,
          };
        });
        const artistsPhotos = await Promise.all(artistsPhotosCb);
        localStorage.setItem("topArtists", JSON.stringify(artistsPhotos));
        commit("getArtistPhotos", { artistsPhotos });
      } catch (error) {
        console.error(error);
      }
      state.loading = false;
      // add artist photos to the topArtists as an additional property
    },
    // get current artist being viewed's information
    getArtistInfo: async ({ commit, state }, currArtist) => {
      const url = `http://ws.audioscrobbler.com/2.0?method=artist.getInfo&artist=${currArtist}&api_key=3491fbfc394ebf3990dfec8acd81f290&format=json`;
      state.loading = true;
      try {
        const { data } = await axios.get(url);
        const { mbid, image, ontour, stats, streamable, ...artistDetails } =
          data.artist;
        const topArtists = isObjInLocalStorage("topArtists")
          ? JSON.parse(localStorage.getItem("topArtists"))
          : state.topArtists;
        // if (topArtists.length > 0) {
        const photoUrl = topArtists.find(
          (art) => art.name === currArtist
        ).photoUrl;
        const artist = { ...artistDetails, photoUrl };
        localStorage.setItem("currentArtist", JSON.stringify(artist));
        commit("getArtistInfo", { artist });
        // }
      } catch (error) {
        console.error("Error message:", error);
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
      } catch (error) {
        console.error("Error message:", error);
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
    isCurrArtist: (state) => {
      return Object.keys(state.currentArtist).length > 0;
    },
  },
});

export default store;

// helper methods
const isObjInLocalStorage = (key) => {
  return (
    JSON.parse(localStorage.getItem(key)) &&
    JSON.parse(localStorage.getItem(key)).length > 0
  );
};
