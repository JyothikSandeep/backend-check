const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://main--aesthetic-parfait-7d40d0.netlify.app",
    methods: ["GET", "POST"],
  },
});
app.use(cors());
allUsers = {};
allRooms = [];
// app.get("/socket_connect", (req, res) => {
io.on("connection", (socket) => {
  allUsers[socket.id] = {
    socket: socket,
    online: true,
    playing: false,
  };
  socket.on("check_for_palyers", (data) => {
    currentPlayer = allUsers[socket.id];
    currentPlayer.name = data.name;
    // console.log(currentPlayer.name)
    let opponent;
    for (i in allUsers) {
      if (
        allUsers[i].playing == false &&
        allUsers[i].socket.id != currentPlayer.socket.id
      ) {
        opponent = allUsers[i];
        currentPlayer.playing = true;
        opponent.playing = true;
        allRooms.push({
          player1: currentPlayer.name,
          player2: opponent.name,
        });
        break;
      }
    }
    if (opponent?.name) {
      currentPlayer.socket.emit("opponent_found", {
        id: opponent.socket.id,
        name: opponent.name,
        startsWith: "X",
      });
      opponent.socket.emit("opponent_found", {
        id: currentPlayer.socket.id,
        name: currentPlayer.name,
        startsWith: "O",
      });
    } else {
      // socket.emit("opponent_not_found")
    }
    console.log(opponent?.name);
    console.log(allRooms);
    // console.log(data);
  });
  socket.on("change_in_move", (data) => {
    console.log(data);
    console.log(allUsers[socket.id]);
    console.log("this is opponent" + typeof data.opponentId);
    // console.log("hi" + allUsers[String(data.opponentId)]);
    let opponent = allUsers[data.opponentId];
    let currentPlayer = allUsers[socket.id];
    // console.log(opponent);
    opponent.socket.emit("data_from_client", { data });
    currentPlayer.socket.emit("data_from_client", { data });
  });
  console.log("connected with socket with id", socket.id);
  // console.log(allUsers);
});

// res.send("hi");
// });

app.get("/data", (req, res) => {
  console.log("hi");
  res.send("hello first one");
});
app.get("/", (req, res) => {
  console.log("hi");
  res.send("dhjasdhj");
});
server.listen(4000, () => {
  console.log("listening to the port");
});
