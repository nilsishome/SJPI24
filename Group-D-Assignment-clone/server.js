import express from "express";
import fs from "fs/promises";

const app = express();

async function getRender(res, path) {
  const htmlBuf = await fs.readFile(`${path}.html`);
  const htmlText = htmlBuf.toString();

  res.send(htmlText);
}

app.get("/", (req, res) => {
  getRender(res, "index");
  app.use("/static", express.static("./static"));
});

app.get("/about", (req, res) => {
  getRender(res, "about");
});

app.get("/cafe", (req, res) => {
  getRender(res, "cafe");
});

app.get("/contact", (req, res) => {
  getRender(res, "contact");
});

app.listen(3080);
