import "./config/env.js";
import connectDB from "./db/db.js";
import { app } from "./app.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, (req, res) => {
      console.log(`Server is listening on ${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection fialed !!! ", err);
  });

app.on("error", (error) => {
  console.log("Error", error);
  throw error;
});
