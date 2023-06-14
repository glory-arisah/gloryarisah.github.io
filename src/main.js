import { createApp } from "vue";
import "font-awesome-animation/css/font-awesome-animation.min.css";
import "./style.css";
import router from "./router/index";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCompactDisc, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import store from "./store/index";
import App from "./App.vue";

library.add(faCompactDisc, faSpinner);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .use(store)
  .mount("#app");
