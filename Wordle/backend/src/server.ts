import app from "./app.js";

const PORT = 5080;
app.listen(PORT, () => {
  console.log(`Server is open on http://localhost:${PORT}`);
});
