import express from "express";
const app = express();
const PORT = 5080;
app.listen(PORT, () => {
    console.log(`Server is open on port: ${PORT}`);
});
