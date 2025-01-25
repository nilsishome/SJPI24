import express from "express";
import fs from "fs/promises";
import { retrieveMovies, retrieveMovie } from "../fetchMovies.js";

const app = express();

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
  const movies = await retrieveMovies();
  res.render("movies", { movies });
});

app.get("/movies/:id", async (req, res) => {
  const movie = await retrieveMovie(req.params.id);
  res.render("movie", { movie });
});

export default app;
