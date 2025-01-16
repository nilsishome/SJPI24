import express from "express";
import fs from "fs/promises";
import path from "path";

const app = express();

async function getRender(res, path) {
  const htmlBuf = await fs.readFile(`${path}.html`);
  const htmlText = htmlBuf.toString();

  res.send(htmlText);
}

app.use("/static", express.static("./static"));

app.get("/database/:filename", async (req, res) => {
  const { filename } = req.params;
  const filePath = path.join("./database", filename);

  const dataBuf = await fs.readFile(filePath);
  const dataText = dataBuf.toString();
  // Sending JSON data to client.
  res.send(JSON.parse(dataText));
});

app.get("/", (req, res) => {
  getRender(res, "index");
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

app.listen(5080);
