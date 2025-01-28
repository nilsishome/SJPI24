import { expect, test } from "@jest/globals";
import request from "supertest";
import initApp from "../static/js/components/app.js";

test("Movies page shows the right movie titles", async () => {
  // Initialize 'fake' API for test only
  const app = initApp({
    retrieveMovie: async () => {
      ({
        id: 1,
        title: "Min granne Totoro",
      });
    },
    retrieveMovies: async () => [
      {
        id: 1,
        title: "Min granne Totoro",
      },
      {
        id: 2,
        title: "Fire Walk With Me",
      },
    ],
  });

  const res = await request(app)
    .get("/movies")
    .expect("Content-Type", /html/)
    .expect(200);

  expect(res.text).toMatch("Fire Walk With Me");
  expect(res.text).toMatch("Min granne Totoro");
});
