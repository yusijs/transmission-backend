import express = require("express");
import bodyParser = require("body-parser");
import cors = require('cors');
import socketio = require('socket.io');
const http = require('http')
import { torrentSocket as TORRENTS_SOCKET } from './routes/transmission/torrents';
import { torrentSocket as NEW_TORRENTS } from './routes/torrent-client/torrents.router';

const app = express();
import { router as APP_ROUTER } from './router';
app.use(cors());
app.use(bodyParser.json({}));

app.use(express.static('public/dist'));

app.use("/api", APP_ROUTER);

app.all('*', (req, res) => {
  res.status(200).sendFile(__dirname + "/public/dist/index.html");
});

const server = http.Server(app);

server.listen(3000);

const io = socketio.listen(server);
TORRENTS_SOCKET(io);
NEW_TORRENTS(io);



// app.listen(3000);