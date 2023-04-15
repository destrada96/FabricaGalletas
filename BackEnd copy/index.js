// Create a slim server

const cors = require('cors');
const express = require("express");
const app = express();
const port = 3000;
const fabricaGalleta= require("./routes/fabricaGalleta");
app.use(express.json());
app.use(
    express.urlencoded({
    extended: true,
    })
);

app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));

app.get("/", (req, res) => {
    res.json({ message: "ok" });
});
app.use("/fabricaGalleta", fabricaGalleta);
/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});
app.listen(port, () => {
    console.log(`Example app listening at http://127.0.0.1:${port}`);
});