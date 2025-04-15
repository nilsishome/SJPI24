import express from "express";
const app = express();
const PORT = 5080;
app.get("/api/data", (req, res) => { });
app.listen(PORT, () => {
    console.log(`Server is open on port: ${PORT}`);
});
