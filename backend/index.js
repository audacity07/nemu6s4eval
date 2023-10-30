const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes");
const { postRouter } = require("./routes/post.routes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/posts", postRouter);

// app.get("/:id", (req, res) => {
//   // localhost:3000/13?hi=12
//   console.log(req.params); // { id: '13' }
//   console.log(req.query); // { hi: '12' }
//   res.status(200).send("Working");
// });

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`Connected to DB`);
  } catch (err) {
    console.log(err);
  }
  console.log(`Server is ruuning at PORT ${process.env.PORT}`);
});
