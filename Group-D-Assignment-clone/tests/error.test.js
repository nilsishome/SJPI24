import { expect, test } from "@jest/globals";
import request from "supertest";
import initApp from "../static/js/components/app.js";
import { retrieveMovies, retrieveMovie } from "../static/js/fetchMovies.js";

test("Error page and message, appear when movie doesn't exist", async () => {
  const app = initApp({
    retrieveMovie,
    retrieveMovies,
  });

  const res = await request(app)
    .get(`/movies/${null}`)
    .expect("Content-Type", /html/)
    .expect(404);

  expect(res.text).toMatch("Page not found.");
});
