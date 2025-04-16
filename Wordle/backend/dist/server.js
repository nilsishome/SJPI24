import express from "express";
const app = express();
const PORT = 5080;
app.get("/api/data", (req, res) => {
    res.status(200).json({
        data: {
            name: "Jalmar",
            animal: "dog",
            cute: "YES",
        },
    });
});
app.listen(PORT, () => {
    console.log(`Server is open on http://localhost:${PORT}`);
});
