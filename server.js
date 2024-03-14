require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const jobRoute = require("./routes/job");

const app = express();

app.use(express.json());

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("DB Connected!"))
    .catch((error) => console.log("DB failed to connect", error));

app.get("/api/health", (req, res) => {
    res.json({
        service: "Backend Joblisting server",
        status: "active",
        time: new Date(),
    });
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/job", jobRoute);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Backend server running at port ${PORT}`);
});
