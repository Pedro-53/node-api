const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const routes = require('./routes');

const server = express();
server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));

server.use("./api", routes);

server.listen(process.env.HTTP_PORT || 3000, () => {
    console.log("SERVIDOR RODANDO EM ", process.env.HTTP_PORT || 3000)
})