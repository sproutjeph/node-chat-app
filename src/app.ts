import express from "express";
const app = express();
import morgan from "morgan";
import path from "path";

if (process.env.NODE !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

export default app;
