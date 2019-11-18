const express = require('express');
const helmet = require('helmet');
const logger = require('../logger');
const cors = require('cors');

const AuthRouter = require('../auth/auth-router');
const UserRouter = require('../users/users-router');

const ProviderRouter = require("../provider/provider-router");
const immunizationRouter = require("../immunization/immunization-router");
const ChildRouter = require('../child/child-router');
const ScreeningRouter = require('../screenings/screening-router');

const restricted = require('../auth/restricted-middleware');

const server = express();

server.use(logger);
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', AuthRouter);
server.use('/api/users',restricted,  UserRouter);

server.use("/api/provider", ProviderRouter);
server.use("/api/immunization",restricted, immunizationRouter);
server.use('/api/children',restricted,  ChildRouter);
server.use('/api/screenings',restricted, ScreeningRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Hello world from build-immunization-tracking Back End!</h2>`);
});

module.exports = server;
