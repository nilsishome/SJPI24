import { retrieveMovies, retrieveMovie } from "./static/js/fetchMovies.js";
import initApp from "./static/js/components/app.js";

const api = {
  retrieveMovie,
  retrieveMovies,
};

const app = initApp(api);

app.listen(5080);
