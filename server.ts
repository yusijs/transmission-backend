import express = require("express");
import bodyParser = require("body-parser");
import cors = require('cors');
import socketio = require('socket.io');
const http = require('http')
import { torrentSocket as TORRENTS_SOCKET } from './routes/transmission/torrents';

const app = express();
import { router as APP_ROUTER } from './router';
app.use(cors());
app.use(bodyParser.json({}));

app.use("/api", APP_ROUTER);

const server = http.Server(app);

server.listen(3000);

const io = socketio.listen(server);
TORRENTS_SOCKET(io);



// app.listen(3000);