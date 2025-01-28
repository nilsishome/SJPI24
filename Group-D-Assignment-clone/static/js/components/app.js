import express from "express";
import fs from "fs/promises";
import MarkdownIt from "markdown-it";

export default function initApp(api) {
  const app = express();
  const marked = MarkdownIt();

  app.set("views", "./views");
  app.set("view engine", "pug");

  app.use("/static", express.static("./static"));

  app.get("/database/:filename", async (req, res) => {
    const { filename } = req.params;
    const filePath = "./database/" + filename;

    const dataBuf = await fs.readFile(filePath);
    const dataText = dataBuf.toString();
    // Sending JSON data to client.
    res.send(JSON.parse(dataText));
  });

  app.get("/", (req, res) => {
    res.render("index");
  });

  app.get("/about", (req, res) => {
    res.render("about");
  });

  app.get("/cafe", (req, res) => {
    res.render("cafe");
  });

  app.get("/contact", (req, res) => {
    res.render("contact");
  });

  app.get("/movies", async (req, res) => {
    const movies = await api.retrieveMovies();
    res.render("movies", { movies });
  });

  app.get("/movies/:id", async (req, res) => {
    const movie = await api.retrieveMovie(req.params.id);
    try {
      res.render("movie", { movie, intro: marked.render(movie.intro) });
    } catch (error) {
      res.status(404).send("Page not found. Error code: " + error);
    }
  });

  return app;
}
