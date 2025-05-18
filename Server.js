require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");

const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(express.json()); // מאפשר שליחת JSON בבקשות

//שמנו את הקישורים האלו אבל אין לנו קבצים בשבילם בתיקיה API

// app.use("/albums", require("./API/albumsRouter"));  
// app.use("/photos", require("./API/photosRouter"));

app.use("/comments", require("./API/commentsRouter"));
app.use("/posts", require("./API/postsRouter"));
app.use("/todos", require("./API/todosRouter"));
app.use("/users", require("./API/usersRouter"));


app.get("", (req, res) => {
    return res.status(200).json("social server");
  });

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
