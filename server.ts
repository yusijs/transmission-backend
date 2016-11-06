import express = require("express")
import bodyParser = require("body-parser")
import cors = require('cors');

import { transmission } from './config'

import { router as APP_ROUTER } from './router'

const app = express();

app.use(cors())
app.use(bodyParser.json({}))

app.use("/api", APP_ROUTER)

app.get("/", (req,res) => {
  transmission.get(function(err,results) {
    if(err) res.send(err);
    res.send(results);
  })
})

app.listen(3000);